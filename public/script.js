(function() {
  var ws = new WebSocket(`ws://${location.host}`);
  var messagesDiv = document.getElementById('the-messages');
  var sendButton = document.getElementById('the-button');
  var textBox = document.getElementById('text-box');

  ws.onmessage = function(event) {
    messagesDiv.innerHTML += `<li>${event.data}</li>`;
  };

  ws.onopen = function() {
    sendButton.addEventListener('click', function() {
      ws.send(textBox.value);
    })
  };
})();
