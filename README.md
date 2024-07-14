# Login - Express Framework Project

This project implements a basic Express application with a login page and a contact page. The application uses MongoDB for user authentication and Nodemailer for sending emails.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Routes](#routes)
- [Middleware](#middleware)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Installation

Instructions to get the project up and running.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/)

### Clone the repository

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### Install dependencies

```bash
npm install
# or
yarn install
```

1. Install Nodemailer:
Open your terminal and run the following command to install Nodemailer:
  ```bash
  npm install nodemailer
```
2. Create an App Password (Recommended):
  - Go to your Google Account security settings: https://myaccount.google.com/intro/security
  - Under "Sign-in & security," click on "App passwords."
  - Select "Select app" and choose "Other (Custom name)."
  - Enter a descriptive name for this app (e.g., "Nodemailer Email Sender").
  - Click "Generate" to create a unique app password. You'll need this password in the next step.

3. Create a JavaScript File:
    Create a new JavaScript file (e.g., send_email.js) and paste the following code, replacing the placeholders with your actual values:

## Usage

Instructions on how to use the project.

### Running the application

```bash
npm start
# or
yarn start
```

### Development mode

```bash
npm run dev
# or
yarn dev
```

### Running with Docker

If the project can be run with Docker, provide instructions here.

```bash
docker build -t your-image-name .
docker run -p 3000:3000 your-image-name
```

## Configuration

Describe how to configure the project.

### Environment Variables

List and describe the environment variables needed for the project.

Create a `.env` file in the root directory and add the following:

```env
PORT=3000
DATABASE_URL=mongodb://localhost:27017/your-db
JWT_SECRET=your-secret-key
MAILER_SERVICE=gmail
MAILER_USER=your-email@gmail.com
MAILER_PASS=your-email-password
```

## Routes

List and describe the main routes of the application.

### Login Page (`/`)

- Method: `GET`
  - Renders the login page.
- Method: `POST`
  - Validates user input using Bootstrap/custom validation.
  - Connects to MongoDB.
  - Validates username and hashed password.
  - If validation passes, redirects to the contact page.
  - If validation fails, reloads the login page with an error message.

### Contact Page (`/contact`)

- Method: `GET`
  - Renders the contact page.
- Method: `POST`
  - Validates user input.
  - Sends an email using Nodemailer.
  - If successful, redirects to the home page.

## Middleware

Describe any middleware that the project uses.

### Example Middleware

- `body-parser` - Parse incoming request bodies.
- `cors` - Enable Cross-Origin Resource Sharing.
- `express-validator` - For input validation.

## Error Handling

Describe how the project handles errors.

### Example Error Handling

The project uses custom error handling middleware to catch and respond to errors.

```javascript
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});
```

## Testing

Instructions on how to run the tests.

### Running tests

```bash
npm test
# or
yarn test
```

### Example Test

Describe any specific tests or testing frameworks used.

```javascript
const request = require('supertest');
const app = require('../app');

describe('POST /login', () => {
  it('should validate and authenticate the user', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpass' });
    expect(res.statusCode).toEqual(302); // Assuming successful login redirects to /contact
  });
});
```

## Contributing

Guidelines for contributing to the project.

### Submitting a Pull Request

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
