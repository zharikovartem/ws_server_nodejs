import { CallAutomationClient } from '@azure/communication-call-automation'
import { Logger } from '../services/logger.service';
import { Request, Response } from 'express';
import { azureConfig } from '../config/azure.config';
import { CommunicationIdentityClient } from '@azure/communication-identity';

export class AzureController {
    private readonly logger: Logger;

    constructor() {
        this.logger = new Logger('api.log')
    }

    async getActiveNumbers(
        req: Request<{}, {}, any>,
        res: Response<any>
    ): Promise<void> {

    }

    async getAzureToken(
        req: Request<{}, {}, any>,
        res: Response<any>
    ): Promise<void> {
        try {
            if (azureConfig.connectionString === '') {
                throw new Error('Azure connection string not found');
            }

            const identityClient = new CommunicationIdentityClient(azureConfig.connectionString);
            const user = await identityClient.createUser();
            const token = await identityClient.getToken(user, ["voip"]);

            
            this.logger.info('Azure token generated successfully', { userId: user.communicationUserId });

            res.status(200).json({
                endpoint: 'getAzureToken',
                test: azureConfig.endpoint,
                user: user.communicationUserId,
                token: token.token,
                expiresOn: token.expiresOn
            })
        } catch (error: unknown) {
            console.log(error)
            this.logger.error('Error generating Azure token', {
                error: error instanceof Error ? error.message : 'Unknown error'
            });
            throw error;
        }
    }

}