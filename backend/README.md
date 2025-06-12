# Contest System Backend

# Installation

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
