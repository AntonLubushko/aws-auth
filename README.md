## AWS Cognito Authentication Server

## Description

This project provides a server implementation to register users in AWS Cognito,
obtain tokens, and utilize those tokens for authenticated requests to other endpoints.

## Prerequisites

1. **AWS Account**:

   - Log in to your AWS account and navigate to the [Cognito service](https://aws.amazon.com/cognito/).
   - Create a **User Pool** in Cognito to store user data.

2. **Environment Variables**:
   - Fill in the `.env` file using the provided `.env.example` template. Add the relevant AWS Cognito details such as ARNs, pool IDs, and other required configurations.
   - CLIENT_ID=
   - REGION=
   - USER_POOL=

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Usage

The server provides four routes:

### 1. User Registration

**Endpoint**: `/auth/signup`  
**Method**: POST  
**Body**:

```json
{
  "email": "user@example.com",
  "password": "StrongPassword123"
}
```

Registers a user in AWS Cognito.

### 2. User Verification

**Endpoint**: `/auth/confirm`  
**Method**: POST  
**Body**:

```json
{
  "email": "user@example.com",
  "confirmationCode": "123456"
}
```

Confirms the user's registration in AWS Cognito with the verification code sent to their email.

### 3. User Login

**Endpoint**: `/auth/signin`  
**Method**: POST  
**Body**:

```json
{
  "email": "user@example.com",
  "password": "StrongPassword123"
}
```

Authenticates the user and returns a JWT token.

### 4. Fetch User Info

**Endpoint**: `/user/info`  
**Method**: GET  
**Headers**:

```
Authorization: Bearer <JWT_TOKEN>
```

Retrieves information about the authenticated user.

## Workflow

1. **Register** a new user with `/auth/signup`.
2. **Confirm** the user's registration with `/auth/confirm` using the confirmation code.
3. **Sign in** the user with `/auth/signin` to receive an updated JWT token.
4. Use the token to access protected routes like `/user/info`.

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
