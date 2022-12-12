const express = require('express')
const cors = require('cors')
const { Server } = require('socket.io')
const http = require('http')
const app = express();
app.use(cors());

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on('send_message', (data) => {
        console.log("send_message", data)
        socket.to(data.room).emit('recive_message', data)
    })

    socket.on('join_room', (data)=> {
        console.log("join_room", data)
        socket.join(data)
    })
})
server.listen(3001, () => {
    console.log("Listing on port: 3001")
})