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

let myPeerConnection;

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

async function initCall() {
    welcome.hidden = true; 
    call.hidden = false;
    await getMedia();
    makeConnection();
}

async function handleWelcomeSubmit(event) {
    event.preventDefault();
    const input = welcomeForm.querySelector("input");
    await initCall();
    socket.emit("join_room" , input.value );
    roomName = input.value;
    input.value = "";
}

welcomeForm.addEventListener("submit" , handleWelcomeSubmit);

// A컴퓨터 , B컴퓨터
// Socket Code
socket.on("welcome" , async () => {
    // 5. A socket Server에게 welcome을 받아서 offer Address를 보내기전에 setLocalDescription한다. 
    const offer = await myPeerConnection.createOffer();
    myPeerConnection.setLocalDescription(offer);
    console.log("sent the offer ")
    // 6. A socket Server 에게 offer 주소와 방이름을 보낸다.
    socket.emit("offer" , offer , roomName);
})
socket.on("offer" , async(offer) => {
    console.log("offer")
    // 8. A offer를 받으면 받은 offer를 B는 setRemoteDescription한다.
    myPeerConnection.setRemoteDescription(offer);
    const answer = await myPeerConnection.createAnswer();
    myPeerConnection.setLocalDescription(answer);
    // 9. offer를 받은 사람은 answer를 생성 하여 answer로 서버에 응답한다.
    socket.emit("answer" , answer , roomName);
})

socket.on("answer" , answer => {
    console.log("answer")
    // 11. B의 answer를 받으면 A는 setRemotDescripton한다.
    myPeerConnection.setRemoteDescription(answer);
})

socket.on("ice" , ice => {
    console.log("receive candidate")
    myPeerConnection.addIceCandidate(ice);
})

// RTC Code

function makeConnection(){
    myPeerConnection = new RTCPeerConnection();
    myPeerConnection.addEventListener("icecandidate" , handleIce);
    myPeerConnection.addEventListener("addstream" , handleAddStream);
    myStream
    .getTracks()
    .forEach(track => myPeerConnection.addTrack(track, myStream));  
}

// answer 작업까지 끝날경우 실행
function handleIce(data) {
    console.log("send candidate")
    socket.emit("ice" , data.candidate , roomName);
}

function handleAddStream(data) {
    console.log("got an event from my peer");
    const peersFace = document.getElementById("peersFace")
    peersFace.srcObject = data.stream
}   

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