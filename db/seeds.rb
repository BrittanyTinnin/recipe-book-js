# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Post.create(title: "The New Dog", content: "He was not a happy dog, having been tied up for long periods of   time.")
# Post.create(title: "Our Boat", content: "It is a big red boat.")
# Post.create(title: "Dinner", content: "We arrived a little early, which caused some awkward silence.")

# Comment.create(post_id: 1, content: 'I love all dogs.')
# Comment.create(post_id: 1, content: 'We have a good dog.')
# Comment.create(post_id: 1, content: 'I am a cat person.')

# Comment.create(post_id: 2, content: 'Can we have a picnic on your boat?')
# Comment.create(post_id: 2, content: 'Did you paint it red?')
# Comment.create(post_id: 2, content: 'There was a Disney cruise ship called the big red boat.')

# Comment.create(post_id: 3, content: 'Aunt Jean had begun drinking early as well.')
# Comment.create(post_id: 3, content: 'Sara brought her famous cheese cake.')
# Comment.create(post_id: 3, content: 'Is there any more guack?')
User.create!(username: "test1", email: "test1@test.com", password: "masogioiega[wog489494+4")


# Recipe.create!(user_id: 1, name: "potato salad", description: "very good", instructions: "put them together and eat")
Recipe.create!(user_id: 1, name: "potato salad", description: "very good", instructions: "put them together and eat")
Recipe.create!(user_id: 1, name: "green salad", description: "very healthy", instructions: "put them together and eat")
Recipe.create!(user_id: 1, name: "cheddar bites", description: "very healthy", instructions: "put them together and eat")
Recipe.create!(user_id: 1, name: "beef roast", description: "great for dinner", instructions: "put them together and eat")
Recipe.create!(user_id: 1, name: "hot dogs", description: "chicago's best", instructions: "put them together and eat")
Recipe.create!(user_id: 1, name: "lemonade sprite", description: "very sweet", instructions: "put them together and eat")