module MyModule::SchoolDirectoryV2 {
    use std::signer;
    use std::string::{String};

    // Define struct for a school
    struct School has key, store, drop {
        name: String,
        country: String,
        address: String,
        accreditation: String,
        contact: String
    }

    // Entry function to register a new school
    public entry fun register_school(account: &signer, name: String, country: String, address: String, accreditation: String, contact: String) {
        let signer_address = signer::address_of(account);
        
        // Check if school already exists
        assert!(!exists<School>(signer_address), 0); // Error code 0: School already exists
        
        // Create a new school
        let school = School {
            name,
            country,
            address,
            accreditation,
            contact
        };
        
        // Move the school into the account's storage
        move_to(account, school);
    }

    // Get school details
    #[view]
    public fun get_school_details(school_address: address): (String, String, String, String, String) acquires School {
        assert!(exists<School>(school_address), 1); // Error code 1: School does not exist
        
        let school = borrow_global<School>(school_address);
        
        (
            school.name,
            school.country,
            school.address,
            school.accreditation,
            school.contact
        )
    }

    // Update school details
    public entry fun update_school(
        account: &signer, 
        name: String, 
        country: String, 
        address: String,
        accreditation: String,
        contact: String
    ) acquires School {
        let signer_address = signer::address_of(account);
        
        // Check if school exists
        assert!(exists<School>(signer_address), 1); // Error code 1: School does not exist
        
        // Get a mutable reference to the school
        let school = borrow_global_mut<School>(signer_address);
        
        // Update the fields
        school.name = name;
        school.country = country;
        school.address = address;
        school.accreditation = accreditation;
        school.contact = contact;
    }

    // Check if school exists
    #[view]
    public fun school_exists(school_address: address): bool {
        exists<School>(school_address)
    }
} 