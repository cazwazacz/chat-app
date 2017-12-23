(function() {
  var ws = new WebSocket(`wss://${location.host}`);
  var messagesDiv = document.getElementById('the-messages');
  var sendButton = document.getElementById('the-button');
  var textBox = document.getElementById('text-box');
  var nameBox = document.getElementById('name-box');

  function createMessageDiv(name, message) {
    return `<div><strong>${name}</strong>: ${message}</div>`;
  }

  ws.onmessage = function(event) {
    message = JSON.parse(event.data);
    messagesDiv.innerHTML += createMessageDiv(message.name, message.message);
  };

  ws.onopen = function() {
    sendButton.addEventListener('click', function() {
      ws.send(JSON.stringify({name: nameBox.value, message: textBox.value}));
      textBox.value = '';
    })
  };
})();
