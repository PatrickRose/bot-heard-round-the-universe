import 'mocha';
import { instance, mock, when } from 'ts-mockito';
import { expect } from 'chai';
import { Collection, Message, MessageMentions, Snowflake, User } from 'discord.js';
import { CombatStarterArgs } from '../../src/arguments/combat-starter';

describe('CombatStarterArgs', () => {
    let argMatcher: CombatStarterArgs;
    let discordMessageMock: Message;
    let discordMessageInstance: Message;

    beforeEach(() => {
        discordMessageMock = mock(Message);
        discordMessageInstance = instance(discordMessageMock);

        argMatcher = new CombatStarterArgs();
    });

    it('expects one argument', () => {
        expect(argMatcher.matches(discordMessageInstance, [])).to.be.false;
        expect(argMatcher.matches(discordMessageInstance, ['one', 'two'])).to.be.false;
        expect(argMatcher.matches(discordMessageInstance, ['one', 'two', 'three'])).to.be.false;
    });

    it('works when the argument is a mention', () => {
        const mentionsMock = mock(MessageMentions);
        const mentionsInstance = instance(mentionsMock);
        const collectionMock: Collection<Snowflake, User> = mock(Collection);
        const collectionInstance = instance(collectionMock);

        when(discordMessageMock.mentions).thenReturn(mentionsInstance);
        when(mentionsMock.users).thenReturn(collectionInstance);
        when(collectionMock.has('user')).thenReturn(true);

        expect(argMatcher.matches(discordMessageInstance, ['<@user>'])).to.be.true;
    });

    it("doesn't work when the argument is not a mention", () => {
        const mentionsMock = mock(MessageMentions);
        const mentionsInstance = instance(mentionsMock);
        const collectionMock: Collection<Snowflake, User> = mock(Collection);
        const collectionInstance = instance(collectionMock);

        when(discordMessageMock.mentions).thenReturn(mentionsInstance);
        when(mentionsMock.users).thenReturn(collectionInstance);
        when(collectionMock.has('user')).thenReturn(false);

        expect(argMatcher.matches(discordMessageInstance, ['<@user>'])).to.be.false;
    });
});
