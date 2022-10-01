"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const ChatService = (httpServer) => {
    const io = new socket_io_1.Server(httpServer);
    io.on('connection', (socket) => {
        console.log(socket.id);
        socket.on('message', (data) => {
            console.log(data);
            socket.emit('message', data);
        });
    });
};
exports.default = ChatService;
