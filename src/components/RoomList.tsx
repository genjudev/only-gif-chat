import * as React from "react";
import { socketApi } from "../services/SocketAPI";
import { Room, SocketAPIEvents } from "../libs/SocketAPI";

type CustomEventDetail = {
    detail: string;
}

type Props = {
    onClick: (room: string) => void;
}
const RoomList: React.FC<Props> = ({onClick}) => {
    const [rooms, setRooms] = React.useState<string[]>([]);
    const [inputvalue, setInputValue] = React.useState<string>("");

    React.useEffect(() => {
        socketApi.addEventListener(
            SocketAPIEvents.ROOM_JOIN, 
            ({detail}: CustomEventDetail) => setRooms([...rooms, detail])
        );
        socketApi.addEventListener(
            SocketAPIEvents.ROOM_LEAVE,
            ({detail}: CustomEventDetail) => setRooms(rooms.filter(r => r !== detail)));
        return () => {
            socketApi.removeEventListener(
                SocketAPIEvents.ROOM_JOIN, 
                ({detail}: CustomEventDetail) => setRooms([...rooms, detail])
            ); 
            socketApi.removeEventListener(
                SocketAPIEvents.ROOM_LEAVE,
                ({detail}: CustomEventDetail) => setRooms(rooms.filter(r => r !== detail)));
        }
    })
 
    return (<>
                <input type="text" value={inputvalue} onChange={(e)=> setInputValue(e.currentTarget.value)} placeholder="room name..." /><button onClick={(e) => {
                    socketApi.joinRoom(inputvalue);
                    setInputValue("");
                    }}>Join</button>
                <br />
                <p>room name at least 3 character</p>
                <br/>
                <ul>
                    {rooms.map((room: string, i: number) => {
                        return <li key={"l_" + i} onClick={() => onClick(room)}>{room}</li>
                    })}
                </ul></>
            )
   
}

export default RoomList;