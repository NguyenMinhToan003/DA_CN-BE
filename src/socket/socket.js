export const socket = (io) => {
  // code socket
  io.on('connection', (socket) => {
    console.log('a user connected')
    socket.join('1')
    socket.on('chat_message', (msg) => {
      io.to('1').emit('chat_message', msg)
    })
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })
  return io
}