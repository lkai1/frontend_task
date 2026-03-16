# Users App Task Frontend

Frontend application for managing users.

---

## Requirements

- Node.js 18+ (developed with Node.js v22)
- npm (is included in the node.js installation)

# Installation

Clone the repository:

git clone https://github.com/lkai1/frontend_task.git

Navigate to the project:

cd frontend_task

Install dependencies:

npm install

---

# Running the Application

Start the development server:

npm run dev

The application will run at:

http://localhost:5173

---

# Backend Requirement

The frontend expects the backend API to be running at:

http://localhost:3001

Make sure the backend server is running before using the app.

---

# Running End-to-End Tests

Run Cypress tests with:

npm run test:e2e

This command will:

1. Start the development server
2. Wait for the application to be available
3. Run Cypress tests headlessly

---

# Cypress Tests

Tests cover:

- Loading users
- Creating a user
- Editing a user
- Deleting a user

Cypress uses **data-cy attributes** for stable selectors.

---

# Running Cypress UI (Optional)

To open the Cypress interface:

npm run cypress