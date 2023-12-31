# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
    puts  "Destroying the table" 
    User.destroy_all

    # Reset the primary key 

    ApplicationRecord.connection.reset_pk_sequence!(:users)

    User.create!(
        username: "Demo-lition", 
        email: "demo@user.io", 
        password: "password"
    )
    

    10.times do 
        User.create!(
            username: Faker::Internet.unique.username(specifier: 3), 
            email: Faker::Internet.unique.email,
            password: "password"
        )
             
    end 


end 