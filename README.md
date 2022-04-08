# WELCOME TO E-MANAGER APP

A web-based management solution that helps small businesses to keep their orders and clients organized in a simple and fast way using a single platform.
Created using React, Node/Express, and MySQL.

## Screenshots

![home](/public/images/EM_Home.png)

[repairs](/public/images/EM_repairs.png)

[repairsorder](/public/images/EM_repairorder.png)

## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called emanager: `create database emanager`
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=YOURUSER
  DB_NAME=emanager
  DB_PASS=YOURPASSWORD
```

- Run `npm run migrate` in the project folder of this repository, in a new terminal window.

### Development

- Run `npm start` in project directory to start the Express server on port 5000
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000.

## Notes

_This is a student project that was created at [CodeOp](http://CodeOp.tech), a full stack development bootcamp in Barcelona._
