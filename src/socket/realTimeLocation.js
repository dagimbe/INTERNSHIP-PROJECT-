const io = require('socket.io')(4001); 

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('updateLocation', (locationData) => {
        console.log('Location update received:', locationData);
        io.emit('locationUpdated', locationData);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

module.exports = io;
