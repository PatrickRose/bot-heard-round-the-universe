import { ArgumentMatcher } from '../arguments';
import { Optional, Invalid, Valid } from '../option';

export class CommandTester {
    protected commandName: string;
    protected argumentMatcher: ArgumentMatcher | null;

    constructor(commandName: string, argumentMatcher: ArgumentMatcher | null = null) {
        this.argumentMatcher = argumentMatcher;
        this.commandName = commandName;
    }

    public isCommand(message: string): Optional<string[]> {
        const split: string[] = [...message.matchAll(/([^ ]+|'.+?')/g)].map((val: RegExpMatchArray): string => val[1]);

        if (split[0] != '!' + this.commandName) {
            return new Invalid();
        }

        const args = split.slice(1);

        if (this.argumentMatcher === null) {
            return args.length == 0 ? new Valid([]) : new Invalid();
        } else {
            return this.argumentMatcher.matches(args) ? new Valid(args) : new Invalid();
        }
    }
}
