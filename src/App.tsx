import React from 'react';
import './App.css';
import GifInput from './components/GifInput';
import Room from './components/Room';
import RoomList from './components/RoomList';
import { Room as SRoom } from './libs/SocketAPI';
import { socketApi } from './services/SocketAPI';

function App() {
  const [room, setRoom] = React.useState<SRoom | undefined>(undefined);
  return (
    <div>
      <RoomList onClick={(r: string) => setRoom(socketApi.getRoom(r))} />
      {room  && <>
        <Room room={room} />
        <GifInput room={room.id} />
      </> }
      
      
    </div>
  );
}

export default App;
