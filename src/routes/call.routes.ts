import express from 'express';
import { CallController } from '../controllers/call.controller';

const router = express.Router();
const callController = new CallController();

router.post('/incomingCall', callController.handleIncomingCall);

export default router;