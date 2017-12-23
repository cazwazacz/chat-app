(function() {
  var ws = new WebSocket(`ws://${location.host}`);
  var messagesDiv = document.getElementById('the-messages');
  var sendButton = document.getElementById('the-button');
  var textBox = document.getElementById('text-box');
  var nameBox = document.getElementById('name-box');

  ws.onmessage = function(event) {
    message = JSON.parse(event.data);
    messagesDiv.innerHTML += `<li><strong>${message.name}</strong>: ${message.message}</li>`;
  };

  ws.onopen = function() {
    sendButton.addEventListener('click', function() {
      ws.send(JSON.stringify({name: nameBox.value, message: textBox.value}));
      textBox.value = '';
    })
  };
})();
