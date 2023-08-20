# Leasing Application

The Leasing Application is a web-based system that allows users to manage leasing contracts, customers, and vehicles. It provides an intuitive interface for adding, editing, and viewing leasing contracts, customer information, and vehicle details.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
-[Backend](#Backend-API)  
- [Frontend](#FrontEnd-Usage)

## Features
- Manage leasing contracts:
  - Add new contracts
  - Edit existing contracts
  - Delete contracts
- Manage customer information:
  - Add new customers
  - Edit existing customers
  - Delete customers
- Manage vehicle details:
  - Add new vehicles
  - Edit existing vehicles
  - Delete vehicles
- Integration with backend API for data retrieval and updates

## Getting Started

### Prerequisites

Before you begin, make sure you have the following software installed on your machine:

- Node.js (version 16.13.1)
- Angular CLI (version 13.3.7)

### Installation

1. Clone the repository:
   git clone https://github.com/yourusername/leasing-app.git
2. Navigate to the project directory:
  `cd leasing-app`   
3. Install project dependencies:
  `npm install`

## Backend-API

The backend of the Leasing Application is provided as a Docker image, which contains the complete backend implementation. You can follow these steps to set up and run the backend API.

1. Pull the Docker Image
You can pull the Docker image using the following command:
 `docker pull walterallane/leasing-api:latest`

2. Start the Docker Container
 `docker run -p 8080:8080 --name leasing-api -d walterallane/leasing-api:latest`

### FrontEnd-Usage
1. After runnung the docker container, APIs can be accessed to perform the CRUD operations.
1. Start the Angular development server: 
   `ng serve`
2. Open your web browser and navigate to http://localhost:4200 to access the application.
3. Use the application to manage leasing contracts, customers, and vehicles.   
