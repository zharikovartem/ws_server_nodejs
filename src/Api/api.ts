import express, { Express, Request, Response } from 'express';
import path from 'path'

export const setupAPI = (app: Express) => {
    app.get('/', (req, res) => {
        // res.sendFile(path.join(__dirname, '../index.html'));
        res.json({ message: 'Hello World123' });
    })

    interface IncomingCallBody {
        callerId: string
        calleeId: string
    }

    app.post('/incomingCall', (req: Request<{}, {}, IncomingCallBody>, res: Response) => {
        const { callerId, calleeId } = req.body
    })
}