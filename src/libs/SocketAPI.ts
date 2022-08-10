import { io } from "socket.io-client";
const BASE_SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:8000";

enum Events {
    ROOM_JOIN = "ROOM_JOIN",
    ROOM_LEAVE = "ROOM_LEAVE",
    MESSAGE = "MESSAGE",
    ERROR = "ERROR"

}

type Sender = {
    id: string;
    name: string;
}

type Message = {
    url: string;
    sender: Sender;
    timestamp: string;
}

type Room = {
    id: string,
    messages: Message[];
}


export default class SocketAPI {
    socket = io(BASE_SERVER_URL);
    rooms: Room[] = [];

    constructor() {
        this.socket.on(Events.MESSAGE, this.updateRoom);
        this.socket.on(Events.ERROR, this.serverError);
    }
    
    joinRoom = (room: string) => {
        this.socket.emit(Events.ROOM_JOIN, room);
        return room
    }
    leaveRoom = (room: string) => {
        this.socket.emit(Events.ROOM_LEAVE, room);
        return room
    }


    sendGif = (url: string, room: string) => {
        this.socket.emit(Events.MESSAGE, JSON.stringify({url, room}));
    }

    updateRoom = (data: string) => {
        console.log("DATA", data);
    }
    serverError = (error: string) => {
        console.error(error);
    }
}