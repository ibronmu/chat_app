const { Server } = require('socket.io');
const Message = require('../models/Message');

function setupSocket(server) {
  const io = new Server(server, {
    cors: { origin: 'http://localhost:3000' },
  });

  io.on('connection', (socket) => {
    socket.on('join', (room) => socket.join(room));

    socket.on('chat message', async ({ room, message, userId }) => {
      const newMsg = new Message({ chatRoom: room, text: message, sender: userId });
      await newMsg.save();
      io.to(room).emit('chat message', message);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });
}

module.exports = { setupSocket };
