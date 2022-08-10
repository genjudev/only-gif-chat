import * as React from "react";
import { socketApi } from "../services/SocketAPI";
import { Room, SocketAPIEvents } from "../libs/SocketAPI";

type CustomEventDetail = {
    detail: string;
}
const RoomList: React.FC = () => {
    const [rooms, setRooms] = React.useState<string[]>([]);

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
 
    return (<ul>
        {rooms.map((room: string, i: number) => {
            return <li key={"l_" + i}>{room}</li>
        })}
    </ul>)
   
}

export default RoomList;