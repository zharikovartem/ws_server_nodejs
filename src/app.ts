import express from 'express'
import http from 'http'
import https from 'https'
import { Server } from 'socket.io'
import { WebSocketController } from './controllers/websocket.controller'
import callRoutes from './routes/call.routes'
import corsMiddleware from './middleware/cors.middleware'
import { envConfig } from './config/env.config'
import fs from 'fs'

const app = express()
const httpServer = envConfig.protocol === 'http'
    ? http.createServer(app)
    : https.createServer({
        key: fs.readFileSync(envConfig.privateKeyPath),
        cert: fs.readFileSync(envConfig.certificatePath)
    }, app)

export const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
    },
  })

app.use(corsMiddleware)
app.use('/api', callRoutes)

const wsController = new WebSocketController()
io.on('connection', (socket) => {
    wsController.handleConnection(socket)
})

httpServer.listen(envConfig.port, () => {
    console.log('envConfig', envConfig)
    console.log(`Server running on port ${envConfig.port}`)
})