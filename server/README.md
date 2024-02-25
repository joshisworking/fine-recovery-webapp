# Fine Management System - Server

Server developed using Express

## Routes

### Courthouse

- `GET /courthouse`: Retrieve all courthouses.
- `GET /courthouse/:id`: Get a specific courthouse by courthouseId.
- `POST /courthouse`: Add a new courthouse.
- `DELETE /courthouse/:id`: Delete a courthouse.
- `PUT /courthouse/:id`: Update a courthouse.

### Subject

- `GET /subject`: Retrieve all subjects.
- `GET /subject/:id`: Get a specific subject by subjectId.
- `POST /subject`: Add a new subject.
- `DELETE /subject/:id`: Delete a subject.
- `PUT /subject/:id`: Update a subject.

### Fine

- `GET /fine`: Retrieve all fines.
- `GET /fine/:id`: Get a specific fine by fineId.
- `GET /fine/overdue`: Get all fines that are overdue (more than 1 year old).
- `GET /fine/courthouse/:id`: Get all fines associated with a specific courthouseId.
- `GET /fine/subject/:id`: Get all fines associated with a specific subjectId.
- `POST /fine`: Add a new fine.
- `PUT /fine/:id`: Update a fine.
- `DELETE /fine/:id`: Delete a fine.

## Getting Started

1. Clone this repository.
2. Create a `.env` file under `/server`. Add the following fields, replacing the brackets with the applicable values:
   - DB_USER='[ DATABASE USERNAME ]'
   - DB_PASSWORD='[ DATABASE PASSWORD ]'
   - DB_HOST='[ DATABASE HOSTNAME ]'
   - DB_NAME='[ NAME OF YOUR DATABASE ]'
   - JWT_SECRET='[ ENTER ARBITRARY STRING FOR JWT SECRET ]'
3. Install the required dependencies using `npm install`.
4. Start the server using `npm start` in the '/server' directory.
