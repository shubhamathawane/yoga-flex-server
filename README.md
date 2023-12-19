# Yoga Studio API

The Yoga Studio API is designed to provide backend functionality for the Yoga Studio web application.

## Overview

The Yoga Studio API serves as the backend for managing users, batches, payments, and scheduling for a yoga studio. It offers various endpoints to perform CRUD operations and manage user data efficiently.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
  - [User Schema](#user-schema)
  - [Batch Schema](#batch-schema)
  - [UserBatch Schema](#userbatch-schema)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB set up locally or on a cloud service

### Installation

1. Clone the repository: `git clone [<repository-url>](https://github.com/shubhamathawane/yoga-flex-server)`
2. Navigate to the project directory
3. Install dependencies: `npm install`
4. Set up environment variables by creating a `.env` file and adding your MongoDB connection string, JWT secret, and other necessary keys.

## Usage

To start the server, run: `npm start`

## API Endpoints

# Flexmoney Backend API

This repository contains the backend API for Flexmoney, a platform that handles user authentication, batch management, and payment processing.

## Endpoints

### Auth

- **Registration**
  - Endpoint: `POST /api/auth/register`
  - Description: Registers a new user
  - Body:
    ```json
    {
      "name": "shubham athawane",
      "email": "harshad@gmail.com",
      "password": "root123",
      "age": 18
    }
    ```

- **Login**
  - Endpoint: `POST /api/auth/login/`
  - Description: Logs in an existing user
  - Body:
    ```json
    {
      "email": "root@gmail.com",
      "password": "root123"
    }
    ```

### Batch

- **Get Your Batch**
  - Endpoint: `GET /api/batch/user/658136e2b1191942f8ba59a6`
  - Description: Retrieves the user's assigned batch

- **Update Batch Timing**
  - Endpoint: `POST /api/batch/updatebatchtiming/`
  - Description: Updates batch timing
  - Body:
    ```json
    {
      "batchId": "657f1aec9a8e2bbb5cb8c2b8",
      "userId": "658136e2b1191942f8ba59a6"
    }
    ```

### Payment

- **Payment History**
  - Endpoint: `GET /api/payment/history/658136e2b1191942f8ba59a6`
  - Description: Retrieves payment history for a user

- **Pay**
  - Endpoint: `POST /api/payment/pay`
  - Description: Processes a payment
  - Body:
    ```json
    {
      "userId": "658136e2b1191942f8ba59a6",
      "userBatchId": "65813b135cf7f647f67d7554",
      "amountPaid": 500,
      "paymentMethod": "upi"
    }
    ```

---



## Database Schema
![Screenshot 2023-12-19 214348](https://github.com/shubhamathawane/yoga-flex-server/assets/67777638/b8bcc23d-0ef3-4740-a153-3f1809b68ec8)



### User Schema

- `name`: String (required)
- `email`: String (required, unique)
- `password`: String (required)
- `age`: Number (required)
- `batch`: ObjectId (refers to Batch)
- `payment_status`: Boolean (default: false)

### Batch Schema

- `start_time`: String
- `end_time`: String

### UserBatch Schema

- `userId`: ObjectId (refers to User)
- `batchTimesId`: ObjectId (refers to Batch)
- `lastUpdated`: Date (default: Date.now())

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT authentication

