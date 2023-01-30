import express from 'express';
import { Server } from "socket.io";
import http from 'http';

const app = express();

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer ,{
        cors: {
            origin: ["http://localhost:3000"],
            credentials : true,
        }
    });

let Name;
wsServer.on("connection" , (socket) => {
    console.log(`user Connected ${socket.id}`);

    socket.onAny((event) => {
        console.log(`Socket Event : ${event}`)
    })

    socket.on("enter_room" , (roomName , done)=>{
        Name = roomName;
        socket.join(roomName)
        done();
        console.log(roomName);
    })

    socket.on("send_message" , (message) => {
        socket.to(Name).emit("new_message" , message);
    })

    socket.on("disconnect" , () => {
        console.log("Disconnected")
    })
})


const handlListen = () => { console.log('Listening on ws://127.0.0.1:8080') }
httpServer.listen(8080, handlListen);