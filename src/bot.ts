import {Client, Message} from "discord.js";
import {inject, injectable} from "inversify";
import {TYPES} from "./types";
import {BaseCommand} from "./services/base-command";

@injectable()
export class Bot {
    private client: Client;
    private readonly token: string;
    private commands: BaseCommand[];

    constructor(
        @inject(TYPES.Client) client: Client,
        @inject(TYPES.Token) token: string,
        @inject(TYPES.MessageHandlers) commands: BaseCommand[]) {
        this.client = client;
        this.token = token;
        this.commands = commands;
    }

    public listen(): Promise<string> {
        this.client.on('message', (message: Message) => {
            if (message.author.bot) {
                console.log('Ignoring bot message!')
                return;
            }

            console.log("Message received! Contents: ", message.content);

            for (let command of this.commands) {
                const option = command.shouldHandle(message)

                if (option.valid) {
                    command.handle(message, option.unwrap()).then(() => {
                        console.log("Response sent!");
                    }).catch(() => {
                        console.log("Response not sent.")
                    })
                }
            }

        });

        return this.client.login(this.token);
    }
}
