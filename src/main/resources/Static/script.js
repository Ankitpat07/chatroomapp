let stompClient = null;

// Connect to STOMP WebSocket server
function connect() {
  let socket = new SockJS("/server1");
  stompClient = Stomp.over(socket);

  stompClient.connect({}, function (frame) {
    console.log("Connected: " + frame);

    $(".center-container").hide();  // Hide login screen
    $(".Chat-room").show();         // Show chat room

    // Subscribe to topic
    stompClient.subscribe("/topic/return-to", function (response) {
      showMessage(JSON.parse(response.body));
    });
  });
}

 //Show message in chat window
function showMessage(message) {
  const display = document.getElementById("message-display");
  const currentUser = localStorage.getItem("name"); // current user

  const time = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message-bubble");

  // ✅ Conditionally add alignment class
  if (message.name === currentUser) {
    msgDiv.classList.add("sent"); // sender
  } else {
    msgDiv.classList.add("received"); // others
  }

  msgDiv.innerHTML = `
    <strong>${message.name || "Unknown"}:</strong><br>
    <span>${message.content || "No content"}</span><br>
    <small style="color: gray;">${time}</small>
  `;

  display.appendChild(msgDiv);
  display.scrollTop = display.scrollHeight;
}

// DOM is ready
$(document).ready(() => {

  // When user enters name and clicks "Enter"
  $("#enter-btn").click(() => {
    const name = $("#name-input").val().trim();

    if (name === "") {
      alert("Please enter your name.");
      return;
    }

    // Store name in localStorage
    localStorage.setItem("name", name);

    // Connect to WebSocket
    connect();
  });

$("#send-btn").click(() => {
  const content = $("#message-container").val().trim();
  const name = localStorage.getItem("name");

  if (content === "") {
    alert("Please enter a message.");
    return;
  }

  const message = {
    name: name,
    content: content,
    timestamp: new Date().toISOString()
  };

  // Send to server
  stompClient.send("/app/message", {}, JSON.stringify(message));

  $("#message-container").val(""); // Clear input
});

//disconnect
$("#logout-btn").click(() => {
  // Disconnect from WebSocket
  if (stompClient !== null) {
    stompClient.disconnect(() => {
      console.log("Disconnected");
    });
  }

  // Clear name from localStorage
  localStorage.removeItem("name");

  // Hide Chat Room, show login screen
  $(".Chat-room").hide();
  $(".center-container").show();
  $("#name-input").val("");
});

});
