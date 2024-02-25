# Simulated Fine Recovery Project (Work in Progress)

## Overview

This project is a work in progress, aiming to create a Simulated Fine Recovery System for managing court fines and payments. It simulates the process of tracking and recovering fines for different subjects (individuals or entities) within various courthouses.

## Technologies Used

- Backend: Node.js, Express.js
- Frontend: React with TypeScript
- Authentication: JSON Web Tokens (JWT)

## Database Setup

This project includes a `database` folder that contains the necessary files for setting up the database:

- `create_tables.sql`: This file contains necessary SQL to create the tables for the fine recovery system.
- `add_sample_data.sql`: For testing purposes, the `add_sample_data.sql` contains insert statements to populate the database with sample records.

**Note**: The names and details used in the `add_sample_data.sql` file were generated programmatically and are fictional. They do not represent real individuals or entities.

## Sample Images

Login with username and password generates a session JWT. Logout (available in nag bar once a user logs in) deletes the token and returns user to login page.

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

Courthouses diplays all courthouses and can be narrowed by search.

![Courthouses page](/sample-images/courthouses.png)

Selecting a courthouse deplays the courthouse details. Edits can be made to courthouse. All fines related to courthouse are listed and can be selected to go to the fine details.

![Courthouse details](/sample-images/courthouse-details.png)

## License

MIT License
