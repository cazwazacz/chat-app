const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static('public'));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {
  const location = url.parse(req.url, true);

  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  })

  ws.on('error', function(error) {
    console.log('one client down');
  })
});

server.listen(PORT, function listening() {
  console.log('Listening on %d', server.address().port);
});
