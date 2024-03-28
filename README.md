INFOMED 
This project provides an API for managing relationships between hospitals and patients. It offers basic CRUD (Create, Read, Update, Delete) operations for hospitals and patients. Additionally, it enables the assignment and management of patients to hospitals through this API.

Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Java - Version 21
Spring - Version 3.2.4
React - 18.2.0
Apache Maven - Used for compiling and running the project
Database - PostgreSQL was used. You can connect by entering your own credentials in the application.properties file.

Clone the project to your local machine:
git clone https://github.com/seymacivan/infomed.git

DataInitializer is defined within the project. In this way, after you connect your database, several hospital and patients objects will automatically be created.
You can access the API by navigating to http://localhost:8080 in your web browser.

API Documentation
The API documentation is available using Swagger UI. You can access the API documentation to explore endpoints, test API requests, and view detailed information about each endpoint.

To access the API documentation, navigate to Swagger UI(http://localhost:8080/swagger-ui/index.html) in your web browser after running the project. Swagger UI provides an interactive interface for exploring and testing the API endpoints. You can try out different API requests and view their responses directly within Swagger UI.

For frontend, go to the frontend directory in the project and just run the "npm install" and "nmp run start" commands.
