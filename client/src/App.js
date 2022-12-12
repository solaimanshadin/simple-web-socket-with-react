import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
const socket  = io.connect('http://localhost:3001')
function App() {
  const [data, setData] = useState('')
  const [room, setRoom] = useState('')
  const sendMessage = () => {
    console.log("Send...")
    socket.emit("send_message", {
      mgs: data,
      room
    })
  }
  const joinRoom = () => {
    socket.emit('join_room', room)
  }
  useEffect(()=> {
    console.log("hi")
    socket.on('recive_message', (data)=>{
      console.log(data)
      alert(data.mgs)
    })
  }, [socket])
  return (
    <div className="App">
      <div>
        <input onChange={(e)=>setRoom(e.target.value)} type="text" placeholder='join room' />
        <button onClick={joinRoom}>Join Room</button>
      </div>
      
      <input onChange={(e)=>setData(e.target.value)} type="text" placeholder="Message" />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
