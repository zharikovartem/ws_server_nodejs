import { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const corsMiddleware = cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
});

export default corsMiddleware;