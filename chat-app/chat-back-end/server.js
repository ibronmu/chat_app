require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const {setupSocket} = require('./socket');


const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

require('./routes/authRoutes')(app);
require('./routes/messageRoutes')(app);

mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB connected"));

setupSocket(server);


server.listen(5000, () => console.log('Server running on port 5000'));
