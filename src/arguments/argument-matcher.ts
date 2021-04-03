import { Message } from 'discord.js';

export interface ArgumentMatcher {
    matches(message: Message, args: string[]): boolean;
}
