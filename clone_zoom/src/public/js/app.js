// front_End Page
// Socket.id
const socket = io();

const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(message) {
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.append(li);
}

function handleMessageSubmit(event) {
    event.preventDefault();
    const input = room.querySelector("input")
    const value = input.value
    socket.emit("new_message" , input.value , roomName, () => {
        addMessage(`You : ${value}`)
    })
    input.value = "";
}   

function showRoom(msg) {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`; 
    const form = room.querySelector("form");
    form.addEventListener("submit" , handleMessageSubmit);
}

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input")
    socket.emit("enter_room" , input.value , showRoom);
    roomName = input.value
    input.value = "";
}

form.addEventListener("submit" , handleRoomSubmit)

socket.on("welcome", () => { 
    addMessage("someone joined!")
});

socket.on("bye" , () => {
    addMessage("someone left");
})

socket.on("new_message",addMessage);

// front_End Page
// WebSocket 
// const socket = new WebSocket(`ws://${window.location.host}`)

// const messageList = document.querySelector("ul")
// const nicknameForm = document.querySelector("#nick")
// const messageForm = document.querySelector("#message")

// function makeMessage(type , payload) {
//     const msg = {type, payload};
//     return JSON.stringify(msg);
// }

// socket.addEventListener("open" , () => {
//     console.log("Connected to Server 🔔")
// })

// socket.addEventListener("message" , (message) => {
//     console.log(`New message: ${message.data.toString()}`)
//     const li = document.createElement("li");
//     li.innerHTML = message.data.toString();
//     messageList.append(li);
// })

// socket.addEventListener("close" , () => {
//     console.log("Close the WebSite 🔕")
// })

// function handleSubmit(event) {
//     event.preventDefault();
//     const input = messageForm.querySelector("input");
//     socket.send(makeMessage("new_message", input.value));
//     console.log(input.value);
//     input.value = ""; 
// }

// function handleNickSubmit(event) {
//     event.preventDefault();
//     const input = nicknameForm.querySelector("input");
//     socket.send(makeMessage("nickname" , input.value));
// }

// messageForm.addEventListener("submit" , handleSubmit);
// nicknameForm.addEventListener("submit" , handleNickSubmit)