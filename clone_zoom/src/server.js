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
    socket.on("join_room" , (roomName , done ) => {
        socket.join(roomName);
        done();
        socket.to(roomName).emit("welcome")
    })
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
                