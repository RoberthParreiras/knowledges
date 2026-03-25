This C# and .NET project consists in a simple server application (Only have a Product table for now) that follows the Clean Architecture principles.

## Architecture
This project implements the principles of the Clean Architecture, with the intention of decoupling the components for better maintenability and new features implementation.

## Core Concepts
**Domain**: This is the core of the application. It contains the business logic, entities, value objects and the repository interfaces. It does not depend on any other layer.

**Infrastructure**: This layer consists in the implementation details from databases and external services. It contains the Data directory that implements the database configuration.

**Application**: This layers consists in the Services implementation, that creates the use cases for the application. The Application depends on Domain abstractions. It contains Services directory and Models directory, being the last one the DTO for the AppHost application.

**AppHost**: This layer is the top layer that connects with the client. It contains the Controllers for data retrieving and creation. AppHost wires Infrastructure implementations via dependency injection.

## How to run
First, needs to run the Postgres Docker image:
```sh
docker compose up
```

After this, build and run the application:
```sh
dotnet run --project CleanArchitecture/backend/AppHost/
```

## How to test
Using the Nunit for unit tests, in the backend directory, run:
```sh
dotnet test
```

## How to format the code
Using the csharpier for code formatter, in the backend directory, run:
```sh
dotnet csharpier format .
```
