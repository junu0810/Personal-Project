import http from "http";
import SocketIO from "socket.io";
import express from "express";
// for WebSocket & Socket.io
// import express from "express";
// import {  Server } from 'socket.io'
// import http from 'http'
// import  {instrument} from '@socket.io/admin-ui'
// import WebSocket from 'ws'

const app = express();


app.set('view engine', 'pug');
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

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

// use Socket.io ChatRoom
// const httpServer = http.createServer(app);
// const wsServer = new Server(httpServer , {
//     cors: {
//         origin: ["https://admin.socket.io"],
//         credentials : true,
//     }
// });
// instrument(wsServer, {
//     auth:false,
// })


// function publicRooms() {
//     const { sockets: { adapter: { sids, rooms } } } = wsServer;
//     const publicRooms = [];
//     rooms.forEach((_, key) => {
//         if(sids.get(key) === undefined){
//             publicRooms.push(key);
//         }
//     })
//     return publicRooms;
// }

// function countRoom(roomName) {
//     return wsServer.sockets.adapter.rooms.get(roomName)?.size;
// }

// wsServer.on("connection" , socket => {
//     socket["nickname"] = "Anon"
//     socket.onAny((event) => {
//         console.log(`Socket Event : ${event}`);
//     })
//     socket.on("enter_room" , (roomName , done) => {
//         // 소켓에 들어오는 모든 event에 대해 확인
//         socket.join (roomName)
//         done()        
//         socket.to(roomName).emit("welcome" , socket.nickname , countRoom(roomName));
//         wsServer.sockets.emit("room_change" , publicRooms());  
//     });
//     socket.on("disconnecting" , () => {
//         socket.rooms.forEach(el => { socket.to(el).emit("bye" , socket.nickname)});
//     })
//     socket.on("disconnect" , () => {
//         wsServer.sockets.emit("room_change", publicRooms())
//     })
//     socket.on("new_message" , (msg , room , done) => {
//         socket.to(room).emit("new_message" , `${socket.nickname} : ${msg}`);
//         done();
//     })
//     socket.on("nickname" , (nickname) => { 
//         socket["nickname"] = nickname})
// });



// use WebSocket
// // 연결된 사용자 목록 저장
// const sockets = [];

// // http Server
// const server = http.createServer(app);
// // webSocket Server(+ http Server)
// const wss = new WebSocket.Server({ server });

// function handleConnection(socket) {
    //     sockets.push(socket)
    //     socket["nickname"] = "Aon";
    //     console.log("Connected to Browser 🔔")
    //     // Browser에서 연결을 끊을경우 출력되는 메세지 
    //     socket.on("close", () => console.log("Close the Server 🔕"))
    //     // Browser에서 보낸 메세지를 Listen함
    //     socket.on("message", (msg) => {
        //         const message = JSON.parse(msg);
        //         console.log(message)
        //         switch (message.type) {
            //             case "new_message":
            //                 // 저장된 사용자 목록 전체에게 메세지를 보낸다
            //                 sockets.forEach((el) => {
                //                     el.send(`${socket.nickname} : ${message.payload}`);
                //                 })
                //                 break
                //             case "nickname":
                //                 socket["nickname"] = message.payload;
                //                 break
                //         }
                //     });
                // }
                
                // wss.on("connection", handleConnection)


const handlListen = () => { console.log('Listening on ws://127.0.0.1:8080') }
httpServer.listen(8080, handlListen);
                