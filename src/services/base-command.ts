import {Message} from "discord.js";
import {Optional} from '../option';

export interface BaseCommand {
    shouldHandle(message: Message): Optional<string[]>;
    
    handle(message: Message, args: string[]): Promise<Message | Message[]>;
}
