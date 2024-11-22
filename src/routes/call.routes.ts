import express from 'express'
import { CallController } from '../controllers/call.controller'
import { AzureController } from '../controllers/azure.controller'

const router = express.Router()
const callController = new CallController()
const azureController = new AzureController()

router.post('/incomingCall', callController.handleIncomingCall)

/** Получаем токен azure */
router.get('/token', (req, res) => azureController.getAzureToken(req, res))
/** Получаем список доступных телефонов */
router.get('/getActiveNumbers', (req, res) => azureController.getActiveNumbers(req, res))

export default router