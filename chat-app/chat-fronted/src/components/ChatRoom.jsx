import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import API from '../api';
const socket = io('http://localhost:5000');

export default function ChatRoom({ room, userId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.emit('join', room);
    API.get(`/messages/${room}`).then(res => setMessages(res.data));

    socket.on('chat message', (msg) => {
      setMessages((prev) => [...prev, { text: msg }]);
    });

    return () => {
      socket.off('chat message');
    };
  }, [room]);

  const sendMessage = () => {
    socket.emit('chat message', { room, message: input, userId });
    setInput('');
  };

  return (
    <div className="p-4">
      <div className="h-80 overflow-y-scroll">
        {messages.map((m, i) => <div key={i}>{m.text}</div>)}
      </div>
      <input className="border p-1" value={input} onChange={(e) => setInput(e.target.value)} />
      <button className="ml-2 bg-blue-500 text-white px-2" onClick={sendMessage}>Send</button>
    </div>
  );
}
