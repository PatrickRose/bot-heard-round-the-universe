import 'mocha';
import { expect } from 'chai';
import { CommandTester } from '../../src/services/command-tester';
import { ArgumentMatcher } from '../../src/arguments/argument-matcher';
import { deepEqual, instance, mock, when } from 'ts-mockito';
import { Message } from 'discord.js';

describe('CommandTester', () => {
    let noArgs: CommandTester;
    let hasArgs: CommandTester;
    let mockedArgumentMatcher: ArgumentMatcher;
    let mockedArgumentMatcherInstance: ArgumentMatcher;
    let mockedMessage: Message;
    let mockedMessageInstance: Message;

    beforeEach(() => {
        noArgs = new CommandTester('test-command');

        mockedArgumentMatcher = mock<ArgumentMatcher>();
        mockedArgumentMatcherInstance = instance(mockedArgumentMatcher);

        mockedMessage = mock(Message);
        mockedMessageInstance = instance(mockedMessage);

        hasArgs = new CommandTester('test-command', mockedArgumentMatcherInstance);
    });

    it('should accept test-command', () => {
        when(mockedMessage.content).thenReturn('!test-command');

        const value = noArgs.isCommand(mockedMessageInstance);

        expect(value.valid).to.be.true;
        expect(value.unwrap()).to.be.eql([]);
    });

    it('should not accept bad-command', () => {
        when(mockedMessage.content).thenReturn('!bad-command');

        const value = noArgs.isCommand(mockedMessageInstance);

        expect(value.valid).to.be.false;
    });

    it('should not accept the right command unless it has the prefix !', () => {
        when(mockedMessage.content).thenReturn('test-command');
        const value = noArgs.isCommand(mockedMessageInstance);

        expect(value.valid).to.be.false;
    });

    it('should not accept the right command unless it starts with !test-command', () => {
        when(mockedMessage.content).thenReturn('Message contains !test-command');
        const value = noArgs.isCommand(mockedMessageInstance);

        expect(value.valid).to.be.false;
    });

    it('should not accept a command if there are arguments', () => {
        when(mockedMessage.content).thenReturn('!test-command some arguments');

        const value = noArgs.isCommand(mockedMessageInstance);

        expect(value.valid).to.be.false;
    });

    it('should not accept a command that requires arguments if there are none', () => {
        when(mockedMessage.content).thenReturn('!test-command some arguments');
        when(
            mockedArgumentMatcher.matches(deepEqual(mockedMessageInstance), deepEqual(['some', 'arguments'])),
        ).thenReturn(false);

        const value = hasArgs.isCommand(mockedMessageInstance);

        expect(value.valid).to.be.false;
    });

    it('should accept a command that requires arguments if there are some', () => {
        when(mockedMessage.content).thenReturn('!test-command some arguments');
        when(
            mockedArgumentMatcher.matches(deepEqual(mockedMessageInstance), deepEqual(['some', 'arguments'])),
        ).thenReturn(true);

        const value = hasArgs.isCommand(mockedMessageInstance);

        expect(value.valid).to.be.true;
        expect(value.unwrap()).to.be.eql(['some', 'arguments']);
    });
});
