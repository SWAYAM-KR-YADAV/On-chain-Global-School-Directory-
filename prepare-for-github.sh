#!/bin/bash

# Helper script to prepare the repository for GitHub

# Define colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=================================================${NC}"
echo -e "${BLUE}   Preparing the Global School Directory for GitHub   ${NC}"
echo -e "${BLUE}=================================================${NC}"
echo ""

# Step 1: Check if git is installed
echo -e "${YELLOW}Step 1: Checking if git is installed...${NC}"
if ! command -v git &> /dev/null; then
    echo -e "${RED}Git is not installed. Please install git first.${NC}"
    exit 1
else
    echo -e "${GREEN}Git is installed.${NC}"
fi

# Step 2: Run the cleanup script
echo ""
echo -e "${YELLOW}Step 2: Running cleanup script...${NC}"
if [ -f cleanup.sh ]; then
    bash ./cleanup.sh
else
    echo -e "${RED}cleanup.sh not found. Exiting.${NC}"
    exit 1
fi

# Step 3: Check if this is already a git repository
echo ""
echo -e "${YELLOW}Step 3: Checking repository status...${NC}"
if [ -d ".git" ]; then
    echo -e "${GREEN}This is already a git repository.${NC}"
    
    # Check if there are any remote repositories
    REMOTES=$(git remote)
    if [ -n "$REMOTES" ]; then
        echo -e "${GREEN}Remote repositories already configured:${NC}"
        git remote -v
    else
        echo -e "${YELLOW}No remote repositories configured yet.${NC}"
        echo ""
        echo -e "Would you like to add a remote repository? (y/n)"
        read answer
        if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
            echo "Enter your GitHub repository URL (e.g., https://github.com/username/repo.git):"
            read repo_url
            git remote add origin $repo_url
            echo -e "${GREEN}Remote repository added: origin -> $repo_url${NC}"
        fi
    fi
else
    # Initialize git repository
    echo -e "${YELLOW}Initializing new git repository...${NC}"
    git init
    
    # Ask for GitHub repo URL
    echo ""
    echo "Would you like to add a remote GitHub repository? (y/n)"
    read answer
    if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
        echo "Enter your GitHub repository URL (e.g., https://github.com/username/repo.git):"
        read repo_url
        git remote add origin $repo_url
        echo -e "${GREEN}Remote repository added: origin -> $repo_url${NC}"
    fi
fi

# Step 4: Stage files
echo ""
echo -e "${YELLOW}Step 4: Staging files for commit...${NC}"
git add .
git status

# Step 5: Ask for commit
echo ""
echo -e "${YELLOW}Step 5: Ready to commit changes?${NC}"
echo "Would you like to commit these changes? (y/n)"
read commit_answer
if [ "$commit_answer" = "y" ] || [ "$commit_answer" = "Y" ]; then
    echo "Enter a commit message (e.g., 'Initial commit'):"
    read commit_message
    if [ -z "$commit_message" ]; then
        commit_message="Initial commit"
    fi
    git commit -m "$commit_message"
    
    # Ask to push
    if [ -n "$(git remote)" ]; then
        echo ""
        echo -e "${YELLOW}Would you like to push to the remote repository? (y/n)${NC}"
        read push_answer
        if [ "$push_answer" = "y" ] || [ "$push_answer" = "Y" ]; then
            echo "Select branch name (default: main):"
            read branch_name
            if [ -z "$branch_name" ]; then
                branch_name="main"
            fi
            git branch -M $branch_name
            git push -u origin $branch_name
        fi
    fi
else
    echo -e "${YELLOW}Commit skipped. You can commit later with:${NC}"
    echo "  git commit -m \"Your commit message\""
fi

echo ""
echo -e "${GREEN}✅ Repository prepared for GitHub!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
if [ -z "$(git remote)" ]; then
    echo "  1. Add a remote repository: git remote add origin YOUR_GITHUB_REPOSITORY_URL"
fi
if [ "$commit_answer" != "y" ] && [ "$commit_answer" != "Y" ]; then
    echo "  2. Commit your changes: git commit -m \"Your commit message\""
fi
if [ -n "$(git remote)" ] && ([ "$commit_answer" != "y" ] || [ "$push_answer" != "y" ]); then
    echo "  3. Push to GitHub: git push -u origin main"
fi
echo "" 