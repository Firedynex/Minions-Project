# Minions-Project
Final full stack web development project

Team Name: the Minions

App Name: teadawgs

Members: Turjoy Paul, Kataleena Mishra, Peter Bui, Kareem Coulibaly

Roles: 
* Team Lead: Turjoy Paul
* Communication Lead: Peter Bui
* Miro Lead: Kareem Coulibaly
* GitHub Lead: Kataleena Mishra

Description
This project is a social platform for creating, finding, and sharing unique recipes with community engagement features through posts and comments. It allows users to get accurate nutritional data while also exploring and discovering various recipes to try.

Tech Stack:
* Frontend: NextJS, React, NextJS App Routing
* Backend: NodeJS using NextJS API Routes
* Database: MongoDB

External APIs:
* API Ninjas Recipe API
* API Ninjas Nutrition API

Users are able to:
* Create and update personal accounts
* Create or generate recipes and nutritional information either by themselves or from APIs from API Ninjas
* Like, dislike, and comment on others' posts
* Edit, delete, and view all their posts

Additional Features:
* Use middleware for route protection
* Secure JWT token and cookie session creation
* Hashed passwords
* MongoDB integration

To Run:
* Clone the repository
* Switch into the project folder
* Intall dependencies: npm install
* Set up auth: npx auth secret
* Set up environment variables:
    * NEXT_PUBLIC_DOMAIN=http://localhost:3000
    * NEXT_PUBLIC_API_DOMAIN=http://localhost:3000/api
    * MONGODB_URI= (Your connection string)
    * NEXT_PUBLIC_API_NINJAS_KEY= (API key from API ninjas)
* Run: npm run dev
