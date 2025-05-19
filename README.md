# AuthenticationApp

AuthenticationApp is a full-stack user authentication application built with a **Next.js** frontend and a **NestJS** backend. It provides features like user signup, login and profile management using GraphQL.

## Features

- User Signup with validation
- User Login with JWT-based authentication
- Profile management
- Responsive and modern UI
- GraphQL API for efficient data fetching

## Tech Stack

### Frontend
- **Next.js**: React framework for building the UI
- **Apollo Client**: For GraphQL queries and mutations
- **TailwindCSS**: For styling

### Backend
- **NestJS**: Node.js framework for building the API
- **GraphQL**: API communication
- **MongoDB**: Database for storing user data
- **Mongoose**: ODM for MongoDB
- **JWT**: For authentication

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DarshPatel4/AuthenticationApp.git
   cd AuthenticationApp
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

---

## Running the Application

### Backend
1. Start the MongoDB server.
2. Configure the `.env` file in the `backend` folder (optional).
3. Run the backend server:
   ```bash
   npm run start:dev
   ```
   The backend will be available at `http://localhost:4000`.

### Frontend
1. Navigate to the `frontend` folder.
2. Run the frontend server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`.

---

## Folder Structure

### Frontend
- **`src/app`**: Contains pages like `login`, `signup`, and `profile`.
- **`src/components`**: Reusable components like `Navigation` and `ApolloWrapper`.
- **`src/lib`**: Apollo Client configuration.

### Backend
- **`src/user`**: Contains user-related modules, services, and resolvers.
- **`src/app.module.ts`**: Root module for the backend.
- **`src/main.ts`**: Entry point for the backend application.

---

## Usage

1. Open the application in your browser at `http://localhost:3000`.
2. Create an account on the signup page.
3. Log in with your credentials to access the profile page.

---

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](./LICENSE) file for details.

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
