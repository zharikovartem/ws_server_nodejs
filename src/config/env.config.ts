import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '../../.env') })

export const envConfig = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    protocol: process.env.PROTOCOL || 'http',
    privateKeyPath: process.env.PRIVATE_KEY_PATH || '',
    certificatePath: process.env.CERTIFICATE_PATH || '',

    crmUrl: process.env.CRM_URL || 'http://localhost:8000'
}