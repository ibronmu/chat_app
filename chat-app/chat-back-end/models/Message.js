const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  chatRoom: String,
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Message', messageSchema);
