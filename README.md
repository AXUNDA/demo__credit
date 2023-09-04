# Demo credit

This is a simple Node.js and Express.js demo application that allows users to perform wallet-related actions, including signing up, signing in, creating a wallet, adding money, withdrawing money, and transferring money to other users.

[google docs ](https://docs.google.com/document/d/1uGM5Th8crmvjrv0yHxzA4DG8s5MTtrC7hn8K6GF1xVE/edit?usp=sharing "google docs ")

[Live url](https://charles-emmanuel-lendsqr-be-test.onrender.com "live url")

> N/B :This live url is on a free server,if left idle for 1 hour,it goes to sleep ,and takes about 80 seconds to spin up once a request is sent,you may have to wait for 80 seconds to receive a response from the server for your first request.

## Features

- User Signup: New users can sign up using their email and password.
- User Signin: Registered users can sign in using their credentials.
- Create Wallet: Signed-in users can create a digital wallet associated with their account.
- Add Money: Users can deposit money into their wallet.
- Withdraw Money: Users can withdraw money from their wallet.
- Transfer Money: Users can transfer money from their wallet to other users' wallets.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js and npm (Node Package Manager)
- Mysql

## Setup

- Clone the repository:

- Navigate to the project directory:

- Install the dependencies:

- Configure the Database:
- this is the database entity relationship diagram [![er -diagram]
  [![E-r diagram](https://res.cloudinary.com/dzm0ntibm/image/upload/v1692939118/Untitled_Workspace_2_df75hk.png "E-r diagram")](https://res.cloudinary.com/dzm0ntibm/image/upload/v1692939118/Untitled_Workspace_2_df75hk.png "E-r diagram")

  create a `.env` file then copy the contents of `.env.example` and replace the various variables with your own variables , please note that they are 2 `.env` files ,one in the root directory and another one in the db folder make sure you use both of them else the application will not work. run `npm run knex:migrate` to create tables from the migration file in the db folder

- Run the Application in the development with `npm run dev`,to create a production build ,run the command ' `npm run build` ,to run unit test run `npm run test` to run in production mode run `npm start`

The app will be accessible at `http://localhost:3000`.

## API Endpoints

- `POST /auth`: Register a new user. Requires `email` and `password` in the request body,this end point automatically creates a wallet for the user once the registeration is successful and returns a token that is to be passed in the headers in order to access wallet endpoints
- `POST /auth/signin`: Sign in a user. Requires `email` and `password` in the request body. and return a jwt token

- `POST /wallet/deposit`: Deposit money into the user's wallet. Requires `amount` in the request body.

- `POST /wallet/withdraw`: Withdraw money from the user's wallet. Requires `amount` in the request body.

- `POST /wallet/transfer`: Transfer money to another user's wallet. Requires `email` which is the recepients email and `amount` in the request body.

- `GET /wallet/`: Get your current wallet balance.

- `GET /wallet/history`: Get your wallet transaction history

## Usage

1. Sign up for a new account using the `/auth` endpoint.
2. Sign in using the `/auth/signin` endpoint.
3. Add money to your wallet using the `/wallet/deposit` endpoint.
4. Withdraw money from your wallet using the `/wallet/withdraw` endpoint.
5. Transfer money to another user using the `/wallet/transfer` endpoint.

## Security Considerations

- **Authentication**: JWT (JSON Web Tokens) is used to protect all wallet enpoints please pass the jwt token received from the login or signup route in the headers inthis format `Authorization : Bearer token` to protect user accounts and endpoints.

- **Input Validation**: input validation is implemented using [Zod](https://zod.dev/ "Zod").
- **Error Handling**: All errors are handled properly,with an express middleware .

## Disclaimer

This is a demo application and should not be used in production without proper security reviews and enhancements.

## License

This project is licensed under the MIT License
