import { Server, Socket } from 'socket.io'
import { SocketService } from '../services/socket.service'
import { io } from '../app'

export class WebSocketController {
    private socketService: SocketService

    constructor() {
        this.socketService = new SocketService(io)
    }

    handleConnection(socket: Socket) {
        console.log('A user connected')

        socket.on('chat message', (msg) => {
            this.socketService.broadcastMessage(socket, msg)
        })

        socket.on('disconnect', () => {
            console.log('User disconnected')
        })
    }
}