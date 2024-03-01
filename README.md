# Simulated Fine Recovery Project

## Table of Contents

- [Simulated Fine Recovery Project](#simulated-fine-recovery-project)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Technologies Used](#technologies-used)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Database Setup](#database-setup)
    - [Deployment](#deployment)
  - [Sample Images](#sample-images)
  - [License](#license)

## Overview

A basic Fine Recovery System for managing court fines and payments. It simulates the process of tracking and recovering fines for different subjects (individuals or entities) within various courthouses.

The implementation is separated between client and server modules. The server is a simple REST API using Express. The client frontend is a React application, implemented with TypeScript. See [client](/client/README.md) and [server](/server/README.md) READMEs for more details.

New users can register to use the application. Once logged in, a JSON Web Token is generated and sent to the server with each request. If valid, the server returns the data. Otherwise, the server returns a 403 response and the client sends the user to the login page.

## Technologies Used

- Backend: Node.js, Express.js
- Frontend: React with TypeScript
- Authentication: JSON Web Token (JWT)

## Getting Started

### Prerequisites

- This project uses Node.js and the npm package manager. To install Node.js, visit [nodejs.org](https://nodejs.org)
- A database server will be required. A community version of MySQL server can be installed from [mysql.com](https://dev.mysql.com/downloads/mysql/).
  - If freshly installing the server, you may get a `ER_NOT_SUPPORTED_AUTH_MODE` error. Run the command `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'` (changing the values as appropriate) to resolve the error.
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) or another tool of your choice can be used to execute the database set up files.

### Database Setup

This project includes a `database` folder that contains the necessary files for setting up the database. MySQL was used for developing this project.

- `create_tables.sql`: This file contains necessary SQL to create the tables for the fine recovery system.
- `add_sample_data.sql`: Sample data to populate the database to begin testing.

**Note**: The names and details used in the `add_sample_data.sql` file were generated programmatically and are fictional. They do not represent real individuals or entities.

### Deployment

1. Clone the repository
2. Set up the database
   1. Execute the statements in `fine-recovery-webapp/database/create_tables.sql` to create the `fines` database and its tables
   2. Optionally, execute the statements in `fine-recovery-webapp/database/add_sample_data.sql` to add sample data
3. Set up the Server
   1. Create a `.env` file under the `fine-recovery-webapp/server` folder. Add the following fields, replacing the brackets with the applicable values:
      - DB_USER='[ YOUR DATABASE USERNAME ]'
      - DB_PASSWORD='[ YOUR DATABASE PASSWORD ]'
      - DB_HOST='[ YOUR DATABASE HOSTNAME ]'
      - DB_NAME='fines'
      - JWT_SECRET='[ ENTER ARBITRARY STRING FOR JWT SECRET ]'
   2. Open a terminal to `fine-recovery-webapp/server`
   3. Install the required dependencies by running the `npm install` command
   4. Start the server using `npm start`
4. Set up the client
   1. Open a new terminal to `fine-recovery-webapp/client`
   2. Install the required dependencies by running the `npm install` command
   3. Start the client using `npm start`

## Sample Images

Login with username and password generates a session JWT. Logout (available in nav bar once a user logs in) deletes the token and returns user to login page.

![Login page](/sample-images/login.png)

New users can register for an account.

![Registration page](/sample-images/register.png)

Fines page lists all fines.

![Fines page](/sample-images/fines.png)

Search function works against Court File, Courthouse, and Subject to narrow results.

![Fine search](/sample-images/fine-search.png)

Selecting a fine displays the fine details. Fines can be modified here.

![Fine details](/sample-images/fine-details.png)

Fines can be added. Similar functionality is available for Subjects and courthouses.

![Add a fine](/sample-images/fine-add.png)

Subjects displays all subjects and can be narrowed by search.

![Subjects page](/sample-images/subjects.png)

Selecting a subject displays the subject details. Edits can be made to subject. All fines related to subject are listed and can be selected to go to the fine details.

![Subject details](/sample-images/subject-details.png)

Courthouses displays all courthouses and can be narrowed by search.

![Courthouses page](/sample-images/courthouses.png)

Selecting a courthouse displays the courthouse details. Edits can be made to courthouse. All fines related to courthouse are listed and can be selected to go to the fine details.

![Courthouse details](/sample-images/courthouse-details.png)

## License

MIT License
