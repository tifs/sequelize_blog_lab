# Blog Lab

In this lab we will be making a simple blog platform. In many ways
this app will be similar to the Daily Planet app. Feel free to modify
it if you wish.

## Objective

* User should be able to go to a form, and fill out a blog post
  containing `post` and `author`.
* When storing the `post` use a `1 to many relationship` between
  author and blog post.
* Have a main route `/posts` that will contain all blog posts sorted by
  date.
* Have a route to only display the blog post by 1 author. Use a url
  like `/author/5`.

## How to get started

1. `npm init` your project folder.
2. Specify the necessary dependencies with `npm install --save LIBRARY_NAME(S)`.
3. Create the `Author` and `Post` models and migrations using
   `Sequelize`.
4. Setup relationships between `Author` and `Post`.
5. Create the views and routes with `Express` for creating and viewing
   your blog posts.

## Bonus
* Feel free to add `edit` and `delete` functionality.
