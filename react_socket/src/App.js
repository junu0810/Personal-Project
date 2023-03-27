import { useEffect, useRef, useState } from 'react';
import './App.css';
import RoomList from './components/RoomList'
import * as StompJs from "@stomp/stompjs";
import base from "./config/baseURL.json"


function App() {

  const [connected, setConnected] = useState(false);
  const [nickName, setNickName] = useState("")
  const [checkName, setCheckName] = useState(false);

  let ws = useRef(null);
  let userName = useRef("");

  const connect = () => {
    ws.current = new StompJs.Client({
      brokerURL: `ws://${base.baseURL}/ws`,
      heartbeatIncoming: 0,
      heartbeatOutgoing: 20000,
      onConnect: () => {
        setConnected(true);
      },
      onDisconnect: () => {
        console.log("disconnect")
      }
    });
    ws.current.activate();
  };

  useEffect(() => {
    connect();
    return () => {
      ws.current.deactivate();
    }
  }, [])

  const changeNickName = (event) => {
    const { target: { value } } = event;
    setNickName(value);
  }

  const inputNickname = (event) => {
    event.preventDefault()
    if(nickName.length !== 0){
      userName.current = nickName;
      setCheckName(true)
    }
    else {
      alert("닉네임을 입력하세요")
    }
  }

  return (
    <div>
      {connected ?
        <div>
          <div>연결이 완료되었습니다.</div>
          {
            checkName === false
              ?
              <form onSubmit={inputNickname}>
                <input 
                  onChange={changeNickName} 
                  placeholder="닉네임을 설정하세요" 
                />
                <button type="submit">닉네임 설정</button>
              </form>
              :
              <div>
                <p>{`닉네임 : ${nickName}`}</p>
                <RoomList 
                  ws={ws}
                  nickName={nickName}  
                />
              </div>
          }
          {/* <Media /> */}
        </div>
        :
        <div>연결 대기중입니다.</div>}
    </div>
  );
}

export default App;
