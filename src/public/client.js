var socket = io();

$(document).ready(function () {
    const user = addUser(prompt("Please enter your Name"))
    $('#submit-btn').on('click', e => {
        e.preventDefault();
        socket.emit("chat-message", { textSent: $('#input-box').val(), userName: user })
        $('#input-box').val("");
    })

    socket.on("chat-message", data => {
        $('#messages').append($('<p style="background-color:lightgrey;">').text(data.userName + ": "+ data.textSent));
    })

    socket.on("user-join", data => {
        addMessage('<i><strong>' + data + ' joined the chat..</strong></i>')
    })

    socket.on("user-left", data => {
        if (data) {
            addMessage('<i><strong>' + data + ' left the chat..</strong></i>')
        }
    })

    socket.emit("user-join", user)
});

function addMessage(userName) {
    const li = document.createElement("li");
    li.innerHTML = userName;
    messages.appendChild(li);
    return userName;
}

addUser = (userName) => {
    const li = document.createElement("li");
    li.innerHTML = "You joined as " + '<strong>' + userName + '</strong>';
    messages.appendChild(li);
    return userName;
}