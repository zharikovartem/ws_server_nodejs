import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors'
import { setupWebSocket } from './Websocket/websocket'
import { setupAPI } from './Api/api'

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Разрешите доступ с любого источника (или укажите конкретный домен)
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
});

// Настройка CORS для Express
app.use(cors());


setupWebSocket(io)
setupAPI(app)

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
