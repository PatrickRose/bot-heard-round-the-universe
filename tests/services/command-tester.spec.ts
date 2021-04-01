import 'mocha';
import { expect } from 'chai';
import { CommandTester } from '../../src/services/command-tester';
import { ArgumentMatcher } from '../../src/arguments';
import { deepEqual, instance, mock, when } from 'ts-mockito';

describe('CommandTester', () => {
    let noArgs: CommandTester;
    let hasArgs: CommandTester;
    let mockedArgumentMatcher: ArgumentMatcher;
    let mockedArgumentMatcherInstance: ArgumentMatcher;

    beforeEach(() => {
        noArgs = new CommandTester('test-command');

        mockedArgumentMatcher = mock<ArgumentMatcher>();
        mockedArgumentMatcherInstance = instance(mockedArgumentMatcher);

        hasArgs = new CommandTester('test-command', mockedArgumentMatcherInstance);
    });

    it('should accept test-command', () => {
        const value = noArgs.isCommand('!test-command');

        expect(value.valid).to.be.true;
        expect(value.unwrap()).to.be.eql([]);
    });

    it('should not accept bad-command', () => {
        const value = noArgs.isCommand('!bad-command');

        expect(value.valid).to.be.false;
    });

    it('should not accept the right command unless it has the prefix !', () => {
        const value = noArgs.isCommand('test-command');

        expect(value.valid).to.be.false;
    });

    it('should not accept the right command unless it starts with !test-command', () => {
        const value = noArgs.isCommand('Message contains !test-command');

        expect(value.valid).to.be.false;
    });

    it('should not accept a command if there are arguments', () => {
        const value = noArgs.isCommand('!test-command some arguments');

        expect(value.valid).to.be.false;
    });

    it('should not accept a command that requires arguments if there are none', () => {
        when(mockedArgumentMatcher.matches(deepEqual(['some', 'arguments']))).thenReturn(false);

        const value = hasArgs.isCommand('!test-command some arguments');
        expect(value.valid).to.be.false;
    });

    it('should accept a command that requires arguments if there are some', () => {
        when(mockedArgumentMatcher.matches(deepEqual(['some', 'arguments']))).thenReturn(true);
        const value = hasArgs.isCommand('!test-command some arguments');
        expect(value.valid).to.be.true;
        expect(value.unwrap()).to.be.eql(['some', 'arguments']);
    });
});
