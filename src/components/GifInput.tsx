import * as React from "react";
import { socketApi } from "../services/SocketAPI";

type Props = {
    room: string;
}

const GifInput: React.FC<Props> = ({room}) => {
    return <>
        <input type="text" /><button onClick={() => socketApi.sendGif("https://tenor.com/asd", room)}>send</button>
    </>
}
export default GifInput;