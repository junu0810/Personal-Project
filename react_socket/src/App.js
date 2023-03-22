import { useEffect, useRef, useState } from 'react';
import './App.css';
import Media from './Media';
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

function App() {

  const [chat, setChat] = useState("");
  const [connected, setConnected] = useState(false);
  const [items, setItems] = useState([]);
  const [nickName, setNickName] = useState("")
  const [checkName, setCheck] = useState(false);

  let ws = useRef(null);
  let userName = useRef("");


  // useEffect(() => {
  //   if (!ws.current) {
  //     ws.current = new SockJs(socketURL);
  //     ws.current.onopen = () => {
  //       console.log(WebSocket.prototype);
  //       setConnected(true);
  //       ws.current.onclose = (error) => {
  //         console.log("disconnect from " + socketURL);
  //         console.log(error);
  //       };
  //       ws.current.onerror = (error) => {
  //         console.log("connection error " + socketURL);
  //         console.log(error);
  //       };
  //       ws.current.onmessage = (event) => {
  //         const data = JSON.parse(event.data);
  //         console.log(chat);
  //         setItems((prevItems) => [...prevItems, data]);
  //       };
  //     };

  //   }
  // }, [chat, checkName]);

  const connect = () => {
    ws.current = new StompJs.Client({
      brokerURL: 'ws://localhost:8080/ws',
      onConnect: () => {
        console.log('success');
      },
    });
    ws.current.activate();
  };  

  useEffect(()=>{
    connect();
  },[])


const sendData = (event) => {
  event.preventDefault()
  if (connected) {
    let message = {}
    message[nickName] = chat
    ws.current.send(JSON.stringify(message))
    setChat("")
  }
}

const inputChange = (event) => {
  const { target: { value } } = event;
  setChat(value);
}

const changeNickName = (event) => {
  const { target: { value } } = event;
  setNickName(value);
}

const inputNickname = (event) => {
  event.preventDefault()
  userName.current = nickName;
  setCheck(true)
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
              <input onChange={changeNickName} placeholder="닉네임을 설정하세요" />
              <button type="submit">닉네임 설정</button>
            </form>
            :
            <div>
              <p>{`사용중인 닉네임 : ${nickName}`}</p>
              <form onSubmit={sendData}>
                <input onChange={inputChange} value={chat} />
                <button type="submit">전송</button>
              </form>
            </div>
        }
        <div>
          {items.map((item, ind) => {
            return <p key={ind}>{JSON.stringify(item)}</p>;
          })}
        </div>
        <Media />
      </div>
      :
      <div>연결 대기중입니다.</div>}
  </div>
);
}

export default App;
