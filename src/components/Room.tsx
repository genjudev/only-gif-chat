import * as React from "react";
import { Room as SRoom, SocketAPIEvents } from "../libs/SocketAPI";
import { socketApi } from "../services/SocketAPI";
import Image from "./Tenor/Image";

type CustomEventDetail = {
    detail: SRoom;
}

type Props = {
    room: SRoom;
}
const Room: React.FC<Props> = ({room}) => {
    const [messages, setMessages] = React.useState<any>([room.messages]);
    React.useEffect(() => {
        const updateMesages =  ({detail}: CustomEventDetail) => {
            if(detail.id === room.id) {
                setMessages(detail.messages);
            }
        }
        socketApi.addEventListener(SocketAPIEvents.ROOM_UPDATE, updateMesages)

        return () => {
            socketApi.removeEventListener(SocketAPIEvents.ROOM_UPDATE, updateMesages)
        }
    })
    return (<><h1>{room.id}</h1>
        <ul>
        {messages.map((msg: string, i: number) => {
            return <>{msg.length <= 2 ? <></> : <li key={i}>{<Image url={msg} height={120} width={120} />}</li>}</>
        })}
    </ul></>)
}

export default Room;