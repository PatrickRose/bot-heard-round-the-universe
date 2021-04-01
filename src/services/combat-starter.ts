import { Message } from 'discord.js';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { CommandTester } from './command-tester';
import { BaseCommand } from './base-command';
import { Optional } from '../option';

@injectable()
export class CombatStarter implements BaseCommand {
    private commandTester: CommandTester;

    constructor(@inject(TYPES.CommandTester.CombatStarter) commandTester: CommandTester) {
        this.commandTester = commandTester;
    }

    shouldHandle(message: Message): Optional<string[]> {
        return this.commandTester.isCommand(message.content);
    }

    handle(message: Message, args: string[]): Promise<Message | Message[]> {
        return message.reply('Starting combat with ' + args.join(','));
    }
}
