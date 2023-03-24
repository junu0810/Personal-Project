import { useEffect, useState } from "react";
import axios from "axios";
import base from '../config/baseURL.json'

const ChatRoom = ({ room_id , ws ,nickName , selectRoom }) => {
    
    const [chat, setChat] = useState(""); // 채팅 입력
    const [items, setItems] = useState([]); // 서버로 받아온 채팅목록

    const inputChat  = (event) => {
        const { target : {value}} = event;
        setChat(value)
    }

    const receiveData = () => {
        console.log(room_id)
        ws.current.subscribe('/receive/data/' + room_id, (res) => {
            const response = JSON.parse(res.body);
    
            setItems([...response.messages])
        })
    }
    

    const sendMessage = (event,type) => {
        event.preventDefault()
        console.log(chat)

        if(ws.current){
            ws.current.publish({
                destination: '/send/message',
                body: JSON.stringify({
                    type: "CHAT",
                    room_id: room_id,
                    writer: nickName,
                    message: chat,
                    created_at: new Date()
                }),
            })
            receiveData();
            setChat("")
        }
    }
    
    useEffect(() => {
        axios.get(`http://${base.baseURL}/chatList?room_id=${room_id}`)
        .then((res) => {
            setItems(res.data.messages)
        })
    },[room_id,items])
    

    return (
        <div>
        <button onClick={()=>selectRoom("")}>방 나가기</button>
        <form onSubmit={sendMessage}>
            <input onChange={inputChat} 
                   placeholder="채팅내용을 입력하세요" 
                   value={chat} 
            />
            <button type="submit">전송</button>
        </form>
        <div>
            {items.map((item, ind) => {
                return (
                    <p key={ind}>
                         {`${JSON.stringify(item.writer) !== '' 
                            ?
                             JSON.stringify(item.writer) 
                            : 
                             "알수없음"
                         } 
                         : ${JSON.stringify(item.content)}`}
                        </p>
                )
            })}
        </div>
    </div>
    )
}   

export default ChatRoom;