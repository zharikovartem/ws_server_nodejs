import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '../../.env') })

export const azureConfig = {
    endpoint: process.env.AZURE_ENDPOINT || '',
    accessKey: process.env.AZURE_ACCESS_KEY || '',
    connectionString: process.env.AZURE_COMMUNICATION_CONNECTION_STRING || ''
}