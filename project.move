module MyModule::SchoolDirectory {

    /// Struct to store school details.
    struct School has store, key {
        name: vector<u8>,
        country: vector<u8>,
    }

    /// Function to register a new school.
    public fun register_school(owner: &signer, name: vector<u8>, country: vector<u8>) {
        let school = School { name, country };
        move_to(owner, school);
    }

    /// Function to retrieve school details by owner.
    public fun get_school_details(owner: address): School acquires School {
        let school_ref = borrow_global<School>(owner);
        School { name: school_ref.name, country: school_ref.country }
    }
}
