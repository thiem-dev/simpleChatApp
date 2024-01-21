const express = require('express');
const expressWs = require('express-ws');
require('dotenv').config;

const PORT = process.env.PORT || 8000;
const app = express();

expressWs(app);

const connections = new Set();

//when new message, send to all connections
const wsHandler = (ws) => {
  connections.add(ws);
  ws.on('message', (message) => {
    connections.forEach((conn) => {
      conn.send(message);
    });
  });

  //disconnect client
  ws.on('close', () => {
    connections.delete(ws);
  });
};

//add websocket handler to the /chat route
app.ws('/chat', wsHandler);

app.use(express.static('build'));

app.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});
