(function() {
  var ws = new WebSocket(`wss://${location.host}`);
  var messagesDiv = document.getElementById('the-messages');
  var sendButton = document.getElementById('the-button');
  var textBox = document.getElementById('text-box');
  var nameBox = document.getElementById('name-box');

  var xhttp = new XMLHttpRequest();

  function createMessageDiv(name, message) {
    return `<div><strong>${name}</strong>: ${message}</div>`;
  }

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      JSON.parse(this.response).forEach(function(message) {
        messagesDiv.innerHTML += createMessageDiv(message.name, message.body);
      })
    }
  }

  xhttp.open("GET", "/api/messages", true);
  xhttp.send();


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
