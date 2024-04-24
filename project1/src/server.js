const express = require('express');
const app = express();
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');
  
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    // 주어진 코드에서 웹소켓 메시지 수신 및 처리를 구현합니다.
  });

  ws.send('Welcome to the WebSocket server');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
