import React, { useState } from 'react';

function Chat({ socket , setChatList , chatList }) {

    const [message , setMessage] = useState("")   
    
    function sendMessage(event){
        event.preventDefault();
        console.log(message);
        setMessage("");
        setChatList([...chatList , `나 : ${message}`])
        socket.emit("send_message", { message: message });
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