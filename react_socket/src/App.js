import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {

  const [ chat , setChat ] = useState("");
  const [ connected , setConnected ] = useState(false);
  const [items, setItems] = useState([]);
  const [sendMsg, setSendMsg] = useState(false);

  const socketURL = "ws://localhost:8080/socket";
  let ws = useRef(null);
  
  useEffect(() => {
    if(!ws.current){
      ws.current = new WebSocket(socketURL);
      ws.current.onopen = () => {
        console.log(WebSocket.prototype);
        setConnected(true);
      ws.current.onclose = (error) => {
        console.log("disconnect from " + socketURL);
        console.log(error);
      };
      ws.current.onerror = (error) => {
        console.log("connection error " + socketURL);
        console.log(error);
      };
      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(chat);
        setItems((prevItems) => [...prevItems, data]);
      };
    };

    }

  },[]);

  // 소켓이 연결되었을 시에 send 메소드
  useEffect(() => {
    if (connected) {
      ws.current.send(
        JSON.stringify({
          message: "연결 완료",
        })
      );

      setSendMsg(true);
    }
  }, [connected]);

  const sendData = (event) => {
    console.log(chat)
    event.preventDefault()
    if(connected){
      ws.current.send(
        JSON.stringify({
        message: chat
      }))

      setChat("")
    }
  } 

  const inputChange = (event) => {
    const {target : { value }} = event;
    setChat(value)
    // console.log(chat)
  }

  return (
    <div>
      {connected ? 
        <div>연결이 완료되었습니다.</div> :
        <div>연결 대기중입니다.</div>}
    <form> 
      <input onChange={inputChange} value={chat}/>
      <button onClick={sendData}>전송</button>
    </form>
    <div>
        {items.map((item , ind) => {
          return <div key={ind}>{JSON.stringify(item)}</div>;
        })}
    </div>
    </div>
  );
}

export default App;
