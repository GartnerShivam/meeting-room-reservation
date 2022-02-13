# meeting-room-reservation

## Install dependencies

You don't need to install any dependencies manually except Docker. So, please make sure you have docker installed.

## Run the application
```sh
docker-compose up
```
Open http://127.0.0.1:5000/explorer to view API contract.

## Rebuild the project

To incrementally build the project and run it:

```sh
docker-compose up --build
```

## UML
![Class Diagram](/class_diagram.png "Class Diagram")

## Usage
The app will be pre-populated with users, rooms and time-slots fixtures when it start; and all existing data will be deleted. Application has built-in authentication and authorization module and used within app using typescript decorators.

## Components

### Controller
Controllers expose API endpoints for interacting with the models and more.

### Services
Services are modular components that can be plugged into a application in various locations to contribute additional capabilities and features to the application.

### Fixtures
Dummy data used for migration when application starts.

### Authentication
All controller methods with @authenticate decorate will require incoming request to have Bearer Token with or without roles.

### Authorization
All controller methods without the @authorize decorator will be accessible to everyone.

The authorization implementation is done via voter functions. In this app, there is just a single voter function - 'basicAuthorization'. It implements the following rules:
- No access if the user was created without a roles property.
- No access if the user's role in not in the allowedRoles authorization metadata.
- User can access only model's belonging to themselves.

### JWT
By default, the JWTs will be signed using HS256 with a 64 character long string of random hex digits as secret.