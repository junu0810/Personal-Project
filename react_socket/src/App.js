import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {

  const [ chat , setChat ] = useState("");
  const [ connected , setConnected ] = useState(false);
  const [items, setItems] = useState([]);
  const [sendMsg, setSendMsg] = useState(false);

  const socketURL = "ws://localhost:8080/ws/chat";
  let ws = useRef(null);
  
  useEffect(() => {
    if(!ws.current){
      ws.current = new WebSocket(socketURL);
      ws.current.onopen = () => {
        console.log(`connected to ${WebSocket}`);
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
          message: "sendMessage",
        })
      );

      setSendMsg(true);
    }
  }, [connected]);

  const inputData = (event) => {
    console.log(chat)
    event.preventDefault()
  } 

  const inputChange = (event) => {
    const {target : { value }} = event;
    setChat(value)
    // console.log(chat)
  }

  return (
    <div>
    <form> 
      <input onChange={inputChange}/>
      <button onClick={inputData}>전송</button>
    </form>
    </div>
  );
}

export default App;
