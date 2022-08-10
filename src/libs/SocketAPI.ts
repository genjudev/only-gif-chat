import { io } from "socket.io-client";
import DelegatedEventTarget from "./DelegateEventTarget";
const BASE_SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:8000";

enum SocketEvents {
    ROOM_JOIN = "ROOM_JOIN",
    ROOM_LEAVE = "ROOM_LEAVE",
    MESSAGE = "MESSAGE",
    ERROR = "ERROR"

}

export enum SocketAPIEvents {
    ROOM_UPDATE = "ROOM_UPDATE",
    ROOM_JOIN = "ROOM_JOIN",
    ROOM_LEAVE = "ROOM_LEAVE"
}

export type Sender = {
    id: string;
    name: string;
}

export type Message = {
    url: string;
    sender: Sender;
    timestamp: string;
}

export type Room = {
    id: string,
    messages: Message[];
}

const createEvent = (event: string, data: any) => new CustomEvent(event, {detail: data});


export default class SocketAPI extends DelegatedEventTarget {
    socket = io(BASE_SERVER_URL);
    public rooms: Room[] = [];

    constructor() {
        super();
        this.socket.on(SocketEvents.MESSAGE, this.updateRoom);
        this.socket.on(SocketEvents.ERROR, this.serverError);
    }
    
    joinRoom = (room: string) => {
        const found = this.rooms.find(r => r.id === room);
        if(!found) {
            const newRoom = {
                id: room,
                messages: [],
            };
            this.rooms.push(newRoom);
            this.socket.emit(SocketEvents.ROOM_JOIN, room);
            this.dispatchEvent(createEvent(SocketAPIEvents.ROOM_JOIN, room ));
            return newRoom;
        }
      
        return found;
    }
    leaveRoom = (room: string) => {
        const found = this.rooms.find(r => r.id === room);
        if(found) {
            this.rooms = this.rooms.filter(r => r.id !== room);
        }
        this.socket.emit(SocketEvents.ROOM_LEAVE, room);
        this.dispatchEvent(createEvent(SocketAPIEvents.ROOM_LEAVE, room ));
        return room
    }


    sendGif = (url: string, room: string) => {
        this.socket.emit(SocketEvents.MESSAGE, JSON.stringify({url, room}));
    }

    updateRoom = (data: any) => {
        try {
            if(data?.room) {
                let found = undefined;
                this.rooms = this.rooms.map(r => {
                    if(r.id === data.room) {
                        r.messages = [...r.messages, data.url];
                        found = r;
                    }
                    return r
                });
                if(found) {
                    this.dispatchEvent(createEvent(SocketAPIEvents.ROOM_UPDATE, found));
                }
            }
        } catch(e) {
            console.error(e)
        }
    }
    serverError = (error: string) => {
        console.error(error);
    }
}