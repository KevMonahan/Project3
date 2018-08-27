import http from 'http'
import express from 'express'
import io from 'socket.io'
import path from 'path'
import config from '../config/config.json'

// setup server
const app = express()
const server = http.createServer(app)
const socketIo = io(server)

// Render a API index page
app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})

// Start listening
server.listen(process.env.PORT || config.port)
console.log(`Started on port ${config.port}`)

// Setup socket.io
socketIo.on('connection', socket => {
  const username = socket.handshake.query.username
  console.log(`${username} connected`)

  socket.on('client:message', data => {
    console.log(`${data.username}: ${data.message}`)

    // message received from client, now broadcast it to everyone else
    socket.broadcast.emit('server:message', data)
  })

  socket.on('disconnect', () => {
    console.log(`${username} disconnected`)
  })
})

export default app
