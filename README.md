# Fullstack Blog Application using MERN Stack

This is a fullstack blog application built using the MERN stack, which includes MongoDB, Express.js, React, and Node.js. The main features of this application include user authentication, allowing logged-in users to create and edit their own posts.

## Installation
* Clone the repository
* Navigate to the 'api' directory of the project
* Run npm install to install server-side dependencies
* Navigate to the 'client' directory using cd client
* Run npm install to install client-side dependencies

## Usage
The application includes user authentication using JSON Web Tokens (JWT). Users can sign up and log in to the application. When a user logs in, a JWT is generated and stored in local storage, which is used to authenticate the user for subsequent requests.

## Creating Posts
Logged-in users can create new posts by clicking on the "Create new nost" button on the navigation bar. They will be redirected to a form where they can enter the title, summary and content of the post. Upon submission, the post will be saved to the database and displayed on the home page.

## Editing Posts
Logged-in users can edit their own posts by clicking on the "Edit" button next to their post on the home page. They will be redirected to a form where they can update the title and content of the post. Upon submission, the post will be updated in the database and the changes will be reflected on the home page.

## Technologies Used
* MongoDB: a NoSQL document-oriented database
* Express.js: a web application framework for Node.js
* React: a JavaScript library for building user interfaces
* Node.js: a JavaScript runtime for server-side development
* JSON Web Tokens: a standard for securely transmitting information between parties as a JSON object