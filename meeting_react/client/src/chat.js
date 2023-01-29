import React, { useState } from 'react';
import io from 'socket.io-client';



function Chat() {
    
    //config Socket.IO
    const socket = io.connect("http://localhost:8080");

    const [message , setMessage] = useState("")

    
    
    function sendMessage(event){
        event.preventDefault();
        console.log(message);
        setMessage("");
        socket.emit("send_message", { message: 'Hello' });
          
    }

    function inputChange(e) {
        setMessage(e.target.value);
    }

    return (
        <div>
            <form onSubmit={sendMessage}> 
                <input placeholder="보낼 내용을 입력해주세요" type="text" onChange={inputChange} value={message} ></input>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default Chat