# NodeJS Boilerplate

A NodeJS boilerplate that is using **NodeJS Express**, **ES6** and **MongoDB**. It can help you quickly go up with a NodeJS APIs project with simple and create structure.

## Structure

Inside the server folder, the whole source code of the project is stored in addition to app.js file which bootstraps the project (Connect to the database then start the server), I am using a **layered system** which contains three layers **(Controllers layer, Services layer, Repositories layer)**. The source code of the project organized like next:

#### Config

Where I am defining any **constants**, **enums**, and **project configurations**. For now, I am just defining the status codes that can be returned from the APIs so I have a unified place to update these status codes when needed.

#### Routes

I am defining here the **API endpoints**, and also I have helpers.js which contain a function that works as a base controller for catching exceptions, formatting them and sending them to the client.

#### Controllers

**Express controllers** go here, the controller layer is responsible for validating the requests, creating the response model, and send the data back to the client.
Inside the controllers folder, there is a folder called **"requestValidators"** where I put all validators classes, in addition I have baseRequestValidator which has the main validation functions that can be used to validate the request fields.

#### Services

I am defining here the **services layer**, where services contain the business logic and will use the repositories layer to deal with database.

#### Repositories

I am defining here the **repositories layer**, where repositories contain the main functions to deal with data in the database, also I have baseRepo.js which contains the most used functions that every repository should have, then other repositories will go inside that folder and should inherit from that baseRepo.

#### Models

I am defining here the **Mongoose database entities**

#### Helpers

I am defining here the bootstrap scripts like:

- **server.js:** Bootstrapping Express server and inject middlewares
- **ioc.js:** Initializing the IoC container for dependency injection
- **db.js:** Connecting to the MongoDB database
- **logger.js:** Initializing the logger

#### Middlewares

I am defining the Express middlewares here, for now, I have 3 middlewares:

- **Default Middleware:** Default Express initialization
- **Logger Middleware:** Adding the logger to the request object, and adding trace id and span id if exists, and begin computing the execution time
- **Post Logger Middleware:** Finishing the API call and logging the path and needed time.

#### Exceptions

I am defining all exceptions that can be used inside the project in this folder, I am separating that into types as next:

- **Business Exceptions:** Where I define the exceptions related to business logic, usually service and repositories layers throw these types of exceptions.
- **Parameter Validation Exceptions:** Where I define exceptions related to validating the requests, usually controllers throw these types of exceptions.
- **Server Errors Exceptions:** Where I define exceptions related to server errors, like error connecting to a database, to a cache .... etc.

## Running the project

The project supports two modes, running and watching the changes through the next command:

```
npm run dev
```

So after any changes in code the execution will automatically restarts. And just running mode through the next command:

```
npm start
```

**EsLint** is installed on this project to help you detect errors in code, just to check any errors you can use the next command:

```
npm run eslint
```

However Eslint checks will automatically being called when running the project in dev mode. If you want to also check just updated code before a commit you can run:

```
npm run pre-commit
```

## Tests

Under test folder I implemented some unit tests for the controller and the defined service. The controller unit tests try to simulate a request to the endpoints after mocking the service, and asserts the results. The service unit tests try to execute the service function after mocking the repository and assert the results.

In order to run unit tests, just you need to call the next command:

```
npm run test-unit
```
