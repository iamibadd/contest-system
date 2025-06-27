# Contest System Backend

## Features

- **User Authentication** (Signup/Login with JWT)
- **Role-based Access Control** (`guest`, `user`, `vip`, `admin`)
- **Rate Limiter**
- **Contest Management** (Create, View, List)
- **Contest Participation & Auto Scoring**
- **Leaderboard by Contest**
- **Daily Prize Distribution Worker**
- **Input Validation with** `Joi`
- **Middleware-based error handling**

## Project Structure

```bash
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── utils/
├── validations/
├── workers/  ← prize distribution cron job
├── app.js
├── index.js
```

## API Docs

Included in `contest-system.json` file.

## Installation

**Clone the repository**

```bash
git clone https://github.com/iamibadd/contest-system.git
cd contest-system/backend
```

**Configure Environment Variables**

Create a `.env` file in the project root and update the configuration:

```bash
PORT = 5001
MONGODB_URI = {YOUR_MONGODB_DATABSE_URL}
JWT_SECRET = "very-secret-key"
JWT_ACCESS_EXPIRATION_MINUTES = 30
NODE_ENV="production"
```

**Run the Application in development mode**

```bash
npm i
npm run dev
```

**Run the Application in production mode**

```bash
npm i
npm start
```

Happy Hacking!
