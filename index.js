const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const homeRouter = require('./routers/homeRouter');
const athuRouter = require('./routers/athuRouter'); // Import the authentication router
const userRouter = require('./routers/userRouter'); // Import the user router
const propertyRouter = require('./routers/propertyRouter'); // Import the property router
const categoryRouter = require('./routers/categoryRouter'); // Import the category router
const addressRouter = require('./routers/addressRouter'); // Import the address router

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Routing
app.use("/", homeRouter);
app.use("/athu", athuRouter); // Integrate the authentication router
app.use("/api/users", userRouter); // Integrate the user router
app.use("/api/properties", propertyRouter); // Integrate the property router
app.use("/api/categories", categoryRouter); // Integrate the category router
app.use("/api/addresses", addressRouter); // Integrate the address router

// 404 Not Found handler
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

module.exports = { app };
