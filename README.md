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