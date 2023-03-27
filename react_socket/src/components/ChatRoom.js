import { useEffect, useState } from "react";
import axios from "axios";
import Modal from 'react-modal';
import VoteModal from "./VoteModal";
import base from '../config/baseURL.json'

const ChatRoom = ({ room_id, ws, nickName, selectRoom }) => {

    const [chat, setChat] = useState(""); // 채팅 입력
    const [items, setItems] = useState([]); // 서버로 받아온 채팅목록
    const [viewVote, setViewVote] = useState(false); // 투표용 채팅창 활성화
    const [viewVoteResult , setviewVoteResult] = useState(false); // 투표결과창 조회
    const [voteResult , setVoteResult] = useState({}); // 투표 결과 집계

    const inputChat = (event) => {
        const { target: { value } } = event;
        setChat(value)
    }

    const receiveData = () => {
        ws.current.subscribe('/receive/data/' + room_id, (res) => {
            console.log("!!!")
            const response = JSON.parse(res.body);
            console.log(response)
            if(response.chatType === "START_VOTE"){
                setViewVote(!viewVote);
            }
            else if(response.chatType === "CHAT"){
                setItems([...response.messages])
            }
        })
    }

    const sendMessage = (event, type) => {
        if (ws.current) {
            if (type === "CHAT") {
                ws.current.publish({
                    destination: '/send/message',
                    body: JSON.stringify({
                        chatType: "CHAT",
                        room_id: room_id,
                        writer: nickName,
                        message: chat,
                        created_at: new Date()
                    }),
                })
                setChat("");
            }
            else if (type === "VOTE") {
                ws.current.publish({
                    destination: '/send/message',
                    body: JSON.stringify({
                        chatType: "VOTE",
                        room_id: room_id,
                        writer: nickName,
                        message: chat,
                    }),
                })
                setChat("");
                setViewVote(!viewVote)
            }
            else if (type === "START_VOTE") {
                ws.current.publish({
                    destination: '/send/message',
                    body: JSON.stringify({
                        chatType: "START_VOTE",
                        room_id: room_id,
                        writer: nickName
                    }),
                })
            }
        }
        receiveData();
    }

    const voteList = () => {
        axios.get(`http://${base.baseURL}/voteList?room_id=${room_id}`)
        .then((res) => {
            setVoteResult(res.data)
            setviewVoteResult(!viewVoteResult)
        })
    }

    useEffect(() => {
        axios.get(`http://${base.baseURL}/chatList?room_id=${room_id}`)
            .then((res) => {
                setItems(res.data.messages)
            })
    }, [items])


    return (
        <div>
            <button onClick={() => selectRoom("")}>방 나가기</button>
            {viewVote
                ?
                <div>
                    <input onChange={inputChat}
                        placeholder="투표내용을 입력하세요"
                        value={chat}
                    />
                    <button onClick={(e) => sendMessage(e, "VOTE")}>전송</button>
                </div>
                :
                <div>
                    <input onChange={inputChat}
                        placeholder="채팅내용을 입력하세요"
                        value={chat}
                    />
                    <button onClick={(e) => sendMessage(e, "CHAT")}>전송</button>
                    <button onClick={voteList}>투표결과 조회하기</button>
                    <button onClick={(e) => sendMessage(e, "START_VOTE")}>투표 만들기</button>
                </div>
            }
            <Modal 
                isOpen={viewVoteResult}
                onRequestClose={() => setviewVoteResult(!viewVoteResult)}
            > 
                <VoteModal
                  voteResult={voteResult}  
                />
            </Modal>
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