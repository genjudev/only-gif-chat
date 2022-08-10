import * as React from "react";
import { Message, Room as SRoom } from "../libs/SocketAPI";
type Props = {
    room: SRoom;
}
const Room: React.FC<Props> = ({room}) => {
    return <ul>
        {room.messages.map((msg: Message, i: number) => {
            return <li key={i}>{msg.url}</li>
        })}
    </ul>
}

export default Room;