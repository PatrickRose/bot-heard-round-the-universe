import { ArgumentMatcher } from './argument-matcher';
import { Message } from 'discord.js';

export class CombatStarterArgs implements ArgumentMatcher {
    matches(message: Message, args: string[]): boolean {
        if (args.length != 1) {
            return false;
        }

        const regex = args[0].match(/^<@!?(.+)>$/);

        if (!regex) {
            return false;
        }

        return message.mentions.users.has(regex[1]);
    }
}
