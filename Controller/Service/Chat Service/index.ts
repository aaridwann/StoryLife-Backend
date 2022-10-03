import { Server, Socket } from "socket.io";


const ChatService = (httpServer:any) => {
    
    const io = new Server(httpServer)
    io.on('connection', (socket:Socket) => {
        console.log(socket.id)
    
        socket.on('message',(data) => {
            console.log(data)
            socket.emit('message',data)
        })
    
    })

}

export default ChatService