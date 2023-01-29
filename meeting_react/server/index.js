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

wsServer.on("connection" , (socket) => {
    console.log(`user Connected ${socket.id}`);
})


const handlListen = () => { console.log('Listening on ws://127.0.0.1:8080') }
httpServer.listen(8080, handlListen);