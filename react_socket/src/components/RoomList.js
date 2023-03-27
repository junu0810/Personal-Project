import axios from "axios";
import { useEffect, useState } from "react";
import ChatRoom from "./ChatRoom";
import base from '../config/baseURL.json'

const RoomList = ({ items, nickName, ws }) => {
    const [room_id, selectRoom] = useState("");
    const [roomName, setRoomName] = useState("");
    const [roomList, setRoomList] = useState([]);

    const inputRoomName = (event) => {
        const { target: { value } } = event;
        setRoomName(value);
    }

    const sendRoomName = async (event) => {
        event.preventDefault()
        if(roomName.length !== 0){
            await axios.post(`http://${base.baseURL}/makeRoom`,
                { room_name: roomName }
            )
            .then((res) => {
                setRoomList(res.data)
            })
        }
    }


    useEffect(() => {
        axios.get(`http://${base.baseURL}/roomList`)
        .then((res) => {
            setRoomList(res.data)
        })
    },[])

    return (
        <div>
            {room_id === ""
                ?
                <div>
                    <form onSubmit={sendRoomName}>
                        <input
                            placeholder="생성하려는 방이름을 설정하세요"
                            onChange={inputRoomName}
                            value={roomName}
                        />
                        <button type="submit">방 생성</button>
                    </form>
                    {roomList.map((el) => {
                       return(
                            <div key={el.room_id}>
                                <p>{el.room_name}</p>
                                <button onClick={()=>selectRoom(el.room_id)}>입장하기</button>
                            </div>
                       ) 
                    })}
                </div>
                :
                <div>
                    <ChatRoom
                        selectRoom={selectRoom}
                        nickName={nickName}
                        ws={ws}
                        room_id={room_id}
                    />
                </div>
            }
        </div>
    )
}

export default RoomList;