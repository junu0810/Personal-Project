const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const cameraSelect = document.getElementById("cameras");

const welcome  = document.getElementById("welcome")
const call = document.getElementById("call")
call.hidden = true;

let roomName;


let myStream;
let muted = false;
let cameraOff = false;

async function getMedia(deviceId) {
    const initialConstranins ={
        audio : true, 
        video : { facingMode : "user" },
    }
    const cameraConstraints = {
        audio : true,
        video : { deviceId : { exact : deviceId } },
    }
    try{
        myStream = await navigator.mediaDevices.getUserMedia(
            deviceId ? cameraConstraints : initialConstranins
        )
        myFace.srcObject = myStream;
        await getCameras();
        if(!deviceId){
            await  getCameras();
        }
    }
    catch(e) {
        console.log(e)
    }
}

async function getCameras() {
    try{
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter((device) => device.kind === "videoinput");
        const currentCamera = myStream.getVideoTracks()[0];
 
        cameras.forEach(camera => {
            const option = document.createElement("option")
            option.value = camera.deviceId
            option.innerText = camera.label;
            if(currentCamera.label === camera.label){
                option.selected = true;
            }
            cameraSelect.appendChild(option);
        })
    }catch(e) {
        console.log(e)
    }
}


function handleMuteClick() { 
    myStream
    .getAudioTracks()
    .forEach(track => (track.enabled = !track.enabled)); 
    console.log(myStream.getAudioTracks())
    if(!muted){
        muteBtn.innerText = "Unmute"
        muted = true;
    } else{
        muteBtn.innerText = "Mute"
        muted = false;
    }
}

function handleCameraBtn() { 
    myStream
    .getVideoTracks()
    .forEach(track => (track.enabled = !track.enabled)); 

    if(cameraOff){
        cameraBtn.innerText="Turn Camera Off";
        cameraOff = false;
    } else{
        cameraBtn.innerText="Turn Camera On"; 
        cameraOff = true;
    }
}

async  function handleCameraChange(){
   await getMedia(cameraSelect.value)
}

muteBtn.addEventListener("click" , handleMuteClick )
cameraBtn.addEventListener("click" , handleCameraBtn )
cameraSelect.addEventListener("input" , handleCameraChange)

// Welcome Form(join a room)

const welcomeForm = welcome.querySelector("form");

async function startMedia() {
    welcome.hidden = true; 
    call.hidden = false;
    await getMedia();
    makeConnection();
}

function handleWelcomeSubmit(event) {
    event.preventDefault();
    const input = welcomeForm.querySelector("input");
    socket.emit("join_room" , input.value , startMedia);
    roomName = input.value;
    input.value = "";
}

welcomeForm.addEventListener("submit" , handleWelcomeSubmit);

// Socket Code

socket.on("welcome" , () => {
    console.log("someone Joined")
})

// front_End Page
// Socket.id
// const socket = io();

// const welcome = document.querySelector("#welcome");
// const form = welcome.querySelector("form");
// const room = document.getElementById("room");

// room.hidden = true;

// let roomName;

// function addMessage(message) {
//     const ul = room.querySelector("ul");
//     const li = document.createElement("li");
//     li.innerText = message;
//     ul.append(li);
// }

// function handleMessageSubmit(event) {
//     event.preventDefault();
//     const input = room.querySelector("#msg input")
//     const value = input.value
//     socket.emit("new_message" , input.value , roomName, () => {
//         addMessage(`You : ${value}`)
//     })
//     input.value = "";
// }   

// function handleNicknameSubmit(event) {
//     event.preventDefault();
//     const input = room.querySelector("#name input");
//     socket.emit("nickname" , input.value);
// }

// function showRoom() {
//     welcome.hidden = true;
//     room.hidden = false;
//     const h3 = room.querySelector("h3");
//     h3.innerText = `Room ${roomName}`; 
//     const msgform = room.querySelector("#msg");
//     const nameform = room.querySelector("#name");
//     msgform.addEventListener("submit" , handleMessageSubmit);
//     nameform.addEventListener("submit" , handleNicknameSubmit);
// }

// function handleRoomSubmit(event) {
//     event.preventDefault();
//     const input = form.querySelector("input")
//     socket.emit("enter_room" , input.value , showRoom);
//     roomName = input.value
//     input.value = "";
// }
// form.addEventListener("submit" , handleRoomSubmit)

// socket.on("welcome", (user , newCount) => { 
//     const h3 = room.querySelector("h3");
//     h3.innerText = `Room ${roomName} (${newCount})`; 
//     addMessage(`${user} arrived!`)
// });

// socket.on("bye" , (left , newCount) => {
//     const h3 = room.querySelector("h3");
//     h3.innerText = `Room ${roomName} (${newCount})`; 
//     addMessage(`${left} left`);
// })

// socket.on("new_message",addMessage);

// socket.on("room_change" , (rooms) => {
//     const roomList = welcome.querySelector("ul");
//     if(rooms.length === 0){
//         roomList.innerHTML = "";
//         return;
//     }
//     rooms.forEach((room) => {
//         const li = document.createElement("li");
//         li.innerText = room;
//         roomList.append(li);
//     });
// });


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