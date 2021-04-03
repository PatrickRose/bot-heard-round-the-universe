export const TYPES = {
    Bot: Symbol('Bot'),
    Client: Symbol('Client'),
    Token: Symbol('Token'),
    MessageResponder: Symbol('MessageResponder'),
    PingFinder: Symbol('PingFinder'),
    MessageHandlers: Symbol('MessageHandlers'),
    CombatStarter: Symbol('CombatStarter'),
    CommandTester: {
        CombatStarter: Symbol('CommandTester.CombatStarter'),
    },
    Arguments: {
        CombatStarter: Symbol('Arguments.CombatStarter'),
    },
};
