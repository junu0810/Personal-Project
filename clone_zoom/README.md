# NOTE
## Zoom Clone using WebRTC and Websockets

- WebRCT 기반의 화상회의 서버를 개설하였습니다.
- Socket.io의 방식을 활용하여 PeerConnection을 통해 사용자의 상호작용이 구현되었습니다.

<img width="588" alt="image" src="https://user-images.githubusercontent.com/89199949/214741309-315814af-5710-4821-bbd6-f73c67472f65.png">

A컴퓨터 , B컴퓨터

### Server
```js
wsServer.on("connection" , socket => {
    // 1. A 컴퓨터가 방을 만들고 들어온다
    // 3. B 컴퓨터가 들어간다.
    socket.on("join_room" , (roomName) => {
        // 2. A가 roomName에 들어간다 동시에 roomName에 welcome이 emit 된다. (A 컴퓨터는 들어가는중에 emit되었으므로 welcome을 못받는다.)
        socket.join(roomName);
        // 4. B는 join으로 방을 들어가고 이미 방에 있는 A는 welcome을 emit 받는다.
        socket.to(roomName).emit("welcome")
    })
    // 7. A에게 받은 offer를 방전체에게 보낸다.
    socket.on("offer" , (offer , roomName ) => {
        socket.to(roomName).emit("offer" , offer);
    }) 
    // 10. B의 answer를 받으면 방 유저에게 answer르 보낸다.
    socket.on("answer" , (answer , roomName) => {
        socket.to(roomName).emit("answer" , answer)
    })
    socket.on("ice" , (ice , roomName) => {
        socket.to(roomName).emit("ice" , ice);
    });
})

```

### Client
```js
// Socket Code
socket.on("welcome" , async () => {
    myDataChannel = myPeerConnection.createDataChannel("chat");
    myDataChannel.addEventListener("message" , console.log)
    // 5. A socket Server에게 welcome을 받아서 offer Address를 보내기전에 setLocalDescription한다. 
    const offer = await myPeerConnection.createOffer();
    myPeerConnection.setLocalDescription(offer);
    console.log("sent the offer ")
    // 6. A socket Server 에게 offer 주소와 방이름을 보낸다.
    socket.emit("offer" , offer , roomName);
})
socket.on("offer" , async(offer) => {
    myPeerConnection.addEventListener("datachannel" , (event) => {
        myDataChannel = event.channel;
        myDataChannel.addEventListener("message" , console.log)
    })
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
```

## - 향후목표
1. React를 통한 코드 리팩토링
2. 화상회의 뿐 아니라 화면공유 기능 
