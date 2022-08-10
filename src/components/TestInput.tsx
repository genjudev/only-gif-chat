import * as React from "react";
import { socketApi } from "../services/SocketAPI";
const TestInput = () => {
    return (<>
        <button onClick={() => socketApi.joinRoom("room1213")}>JoinROOM</button>
        <button onClick={() => socketApi.leaveRoom("room1213")}>Leave ROOM</button>
        <button onClick={() => socketApi.sendGif("https://tenor.com/", "room1213")}>Test</button>
    </>)
}

export default TestInput;