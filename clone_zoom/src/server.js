import express from "express";
import http from 'http'
import WebSocket from 'ws'

const app = express();


app.set('view engine', 'pug');
app.set("views" , __dirname +  "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));
const handlListen = () => {console.log('Listening on ws://127.0.0.1:8080')}

// http Server
const server = http.createServer(app);
// webSocket Server(+ http Server)
const wss = new WebSocket.Server({ server }); 

function handleConnection(socket) {
    console.log("Connected to Browser 🔔")
    // Browser에서 연결을 끊을경우 출력되는 메세지 
    socket.on("close", () => console.log("Close the Server 🔕"))
    // Browser에서 보낸 메세지를 Listen함
    socket.on("message", (message) => {
        console.log(message.toString('utf8'))
    });
    socket.send("hello!!!")
}

wss.on("connection" , handleConnection )

server.listen(8080, handlListen);
