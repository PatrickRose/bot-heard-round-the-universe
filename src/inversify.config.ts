import "reflect-metadata";
import {Container} from "inversify";
import {TYPES} from "./types";
import {Bot} from "./bot";
import {Client} from "discord.js";
import {CombatStarter} from './services/combat-starter';
import {CommandTester} from './services/command-tester';
import {BaseCommand} from './services/base-command';

let container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind<CombatStarter>(TYPES.CombatStarter).to(CombatStarter).inSingletonScope();
container.bind<CommandTester>(TYPES.CommandTester.CombatStarter).toConstantValue(new CommandTester('start-combat', container.get(TYPES.Arguments.CombatStarter)));
container.bind<BaseCommand[]>(TYPES.MessageHandlers).toConstantValue([
    container.get(TYPES.CombatStarter)
])

export default container;
