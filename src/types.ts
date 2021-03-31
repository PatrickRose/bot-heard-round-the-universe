export const TYPES = {
    Bot: Symbol("Bot"),
    Client: Symbol("Client"),
    Token: Symbol("Token"),
    MessageResponder: Symbol("MessageResponder"),
    PingFinder: Symbol("PingFinder"),
    MessageHandlers: Symbol("MessageHandlers"),
    CombatStarter: Symbol("CombatStarter"),
    CommandTester: {
        CombatStarter: Symbol('CombatStarter')
    },
    Arguments: {
        CombatStarter: Symbol('CombatStarter')
    }
};
