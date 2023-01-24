import express from "express";
import SocketIO from 'socket.io'
import http from 'http'
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
    socket.on("enter_room" , (roomName , done) => {
        socket.onAny((event) => {
            console.log(`Socket Event : ${event}`);
        })
        socket.join (roomName)
        done()        
        socket.to(roomName).emit("welcome");
    })
    socket.on("disconnecting" , () => {
        socket.rooms.forEach(el => { socket.to(el).emit("bye") })
    })
    socket.on("new_message" , (msg , room , done) => {
        socket.to(room).emit("new_message" , msg);
        done();
    })
});



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
                