# Event Management API

This project is a simple Event Management API built using NestJS, TypeScript, and MongoDB.

## Table of Contents

- [Requirements](#requirements)
- [Setup](#setup)
  - [Clone the Repository](#clone-the-repository)
  - [Environment Variables](#environment-variables)
  - [Running the Application Locally](#running-the-application-locally)
  - [Running the Application with Docker Compose](#running-the-application-with-docker-compose)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)

## Requirements

Before you begin, ensure you have the following installed on your system:

- Node.js
- npm
- Docker (optional)

## Setup

### Clone the Repository

```bash
git clone https://github.com/coredev2/event-management-api.git
cd event-management-api
```

### Environment Variables

Create a `.env` file in the root directory of your project and add the following environment variables:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/
```

Replace `<username>` and `<password>` with your actual MongoDB Atlas credentials.

### Running the Application Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the application:

   ```bash
   npm run start:dev
   ```

   The API will be running at `http://localhost:3000`.

### Running the Application with Docker Compose

1. Build and start the containers:

   ```bash
   docker-compose up --build
   ```

2. The API will be running at `http://localhost:3000`, and MongoDB will be running in a separate container.

## API Documentation

The API documentation is available via Swagger. After starting the application, you can access the Swagger UI at:

```
http://localhost:3000/api-docs
```

This UI allows you to interact with the API endpoints, view request/response schemas, and test the API.

## Project Structure

```bash
src/
├── events/
│   ├── dto/
│   │   ├── create-event.dto.ts
│   │   ├── update-event.dto.ts
│   └── events.controller.ts
│   └── events.module.ts
│   └── events.service.ts
│   └── schemas/
│       └── event.schema.ts
├── app.module.ts
└── main.ts
```
