import { Server, Socket } from 'socket.io'
import { Logger } from './logger.service'
import { IEvent } from '../models/event.model'

export class SocketService {
    private io: Server
    private logger: Logger

    constructor(io: Server) {
        this.io = io
        this.logger = new Logger('socket.log')
    }

    // broadcastMessage(socket: Socket, message: string): void {
    //     try {
    //         // Отправляем сообщение всем клиентам, включая отправителя
    //         this.io.emit('chat message', {
    //             message: message,
    //             socketId: socket.id
    //         })
            
    //         // Логируем успешную отправку
    //         this.logger.info('Message broadcasted', {
    //             socketId: socket.id,
    //             message
    //         })
    //     } catch (error) {
    //         this.logger.error('Error broadcasting message', {
    //             error: error instanceof Error ? error.message : 'Unknown error',
    //             socketId: socket.id
    //         })
    //     }
    // }

    broadcastMessage(socket: Socket, message: IEvent): void {
        try {
            this.io.emit(message.event, {
                ...message.data,
                // socketId: socket.id
            });
        } catch (error) {
            this.logger.error('Error broadcasting message', {
                error: error instanceof Error ? error.message : 'Unknown error',
                socketId: socket.id
            });
        }
    }
}