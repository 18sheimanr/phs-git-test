'use strict';

import Wreck from '@hapi/wreck';

interface BotSession {
    sessionId: string;
    botId: string;
    memberId: number;
    patientId: string;
    encounterId: string;

    age: number;
    sex: string;
    language: string;
    thirdPerson: boolean;
    turn: number;

    createdAt: string;
    updatedAt: string;
    pausedAt: string;
    endedAt: string;

    supportsUnattended: boolean;
    unattendedHandoffEncounterReason: string;
}
interface GetBotSessionsPayload {
    encounterId: string;
    sessions: BotSession[];
}

export class ApiBots {
    wreck: typeof Wreck;
    constructor(options: ApiBotsOptions) {
        this.wreck = Wreck.defaults({
            baseUrl: options.baseUrl,
            headers: {
                'content-type': 'application/json'
            },
            json: true
        });
    }
    /**
     * grab all bot sessions associated with an encounterId
     * @return {encounterId: string, sessions: Array<BotSession>}
     */
    getBotSessions = async (encounterId: string): Promise<GetBotSessionsPayload> => {
        const res = await this.wreck.get(`/encounters/${encounterId}/bot-sessions`);
        return res.payload as GetBotSessionsPayload;
    };
}

export interface ApiBotsOptions { baseUrl: string }
function ApiBotsFactory(options: ApiBotsOptions) {
    return new ApiBots(options);
}

export default ApiBotsFactory;
module.exports = ApiBotsFactory;
