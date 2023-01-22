//front_End Page
const socket = new WebSocket(`ws://${window.location.host}`)

const messageList = document.querySelector("ul")
const nicknameForm = document.querySelector("#nick")
const messageForm = document.querySelector("#message")

function makeMessage(type , payload) {
    const msg = {type, payload};
    return JSON.stringify(msg);
}

socket.addEventListener("open" , () => {
    console.log("Connected to Server 🔔")
})

socket.addEventListener("message" , (message) => {
    console.log(`New message: ${message.data.toString()}`)
    const li = document.createElement("li");
    li.innerHTML = message.data.toString();
    messageList.append(li);
})

socket.addEventListener("close" , () => {
    console.log("Close the WebSite 🔕")
})

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    console.log(input.value);
    input.value = ""; 
}

function handleNickSubmit(event) {
    event.preventDefault();
    const input = nicknameForm.querySelector("input");
    socket.send(makeMessage("nickname" , input.value));
}

messageForm.addEventListener("submit" , handleSubmit);
nicknameForm.addEventListener("submit" , handleNickSubmit)