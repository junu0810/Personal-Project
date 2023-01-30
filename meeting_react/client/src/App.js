import React , { useEffect, useState , useRef } from 'react';
import Chat from "./chat";
import io from 'socket.io-client';

let socket = io.connect("http://localhost:8080");

function App() {

  const [ roomName , setRoomName] = useState("");
  const [ roomStatus , joinRoom ] = useState("");
  const [ chatList , setChatList ] = useState([]); 

  useEffect(() => { 
    socket.on("new_message" , (message)=>{
      console.log(message);
      setChatList([...chatList, `상대방 채팅 : ${message.message}`])
    });
  }, [chatList])

  function sendRoomName(event) {
    event.preventDefault();
    socket.emit("enter_room" , roomName , ()=>{joinRoom(roomName)});
    setRoomName("");
  }

  function RoomName(event) {
    const {target : {value}} = event;
    setRoomName(value);
  }
  console.log(chatList)
  return (
    <div className="App">
      <h1>Zoom Clone</h1>
        <h2>{roomStatus ? roomStatus : ""}</h2>
      <div>
      <form onSubmit={sendRoomName}>
        <input placeholder="Room Name" onChange={RoomName} value={roomName}/>
        <button type="submit">Enter</button>
      </form>
      <div>
        {chatList.map((ele,ind) =>{
          return  <li key={ind}>{ele}</li>
        })}
      </div>
      </div>
      <Chat socket={socket} setChatList={setChatList} chatList={chatList}/>
    </div>
  );
}

export default App;
