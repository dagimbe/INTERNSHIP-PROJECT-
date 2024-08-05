const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');

const homeRouter = require('./routers/homeRouter');
const athuRouter = require('./routers/athuRouter');  
const userRouter = require('./routers/userRouter');  
const propertyRouter = require('./routers/propertyRouter');  
const categoryRouter = require('./routers/categoryRouter'); 
const addressRouter = require('./routers/addressRouter');  
const bookingRouter = require('./routers/bookingRouter');  
const adminRouter = require('./routers/adminRouter'); 
const chatRouter = require('./routers/chatRouter'); 
const passwordResetRouter = require('./routers/passwordResetRouter'); 
const favoritesRouter = require('./routers/favoritesRouter');  



const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(bodyParser.json());


app.use("/", homeRouter);
app.use("/athu", athuRouter) 
app.use("/api/users", userRouter); 
app.use("/api/properties", propertyRouter); 
app.use("/api/categories", categoryRouter);  
app.use("/api/addresses", addressRouter) 
app.use("/api/bookings", bookingRouter); 
app.use("/api/admin/bookings", adminRouter); 
app.use("/api/chats", chatRouter); 
app.use("/api/passwords", passwordResetRouter); 
app.use('/api/favorites', favoritesRouter); 



 
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});
 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
 
io.on('connection', (socket) => {
    console.log('New client connected');
 
    socket.on('locationUpdate', (data) => {
        console.log('Location update received:', data);
         
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

module.exports = { app, server };
