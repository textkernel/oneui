import BemPrefixSet, { BemPrefixSetError } from '..';

describe('BemPrefixSet', () => {

    describe('module export', () => {
        it('should export BemPrefixSet as default', () => {
            expect(BemPrefixSet).toBeTruthy();
        })
        it('should export BemPrefixSetError as named export', () => {
            expect(BemPrefixSetError).toBeTruthy();
        })
    });

    describe('#constructor', () => {
        it('should create set of BEM prefixes', () => {
            const prefixes = {
                elem: '__',
                mod: '--',
                value: '_'
            };
            const bemPrefixSet = new BemPrefixSet(prefixes);
            expect(bemPrefixSet).toEqual(prefixes);
        });
        it('should create a default set of BEM prefixes if nothing is passed', () => {
            const bemPrefixSet = new BemPrefixSet();
            expect(bemPrefixSet).toEqual({
                elem: '__',
                mod: '--',
                value: '_'
            });
        });
        it('should set "elem" to default if it is not set', () => {
            const prefixes = {
                mod: '___',
                value: '----'
            };
            const bemPrefixSet = new BemPrefixSet(prefixes);
            expect(bemPrefixSet).toEqual({
                ...prefixes,
                elem: '__',
            });
        });
        it('should set "mod" to default if it is not set', () => {
            const prefixes = {
                elem: '___',
                value: '____'
            };
            const bemPrefixSet = new BemPrefixSet(prefixes);
            expect(bemPrefixSet).toEqual({
                ...prefixes,
                mod: '--',
            });
        });
        it('should set "value" to default if it is not set', () => {
            const prefixes = {
                elem: '____',
                mod: '---'
            };
            const bemPrefixSet = new BemPrefixSet(prefixes);
            expect(bemPrefixSet).toEqual({
                ...prefixes,
                value: '_',
            });
        });
        it('should throw if "elem" prefix is invalid', () => {
            const prefixes = {
                elem: '~',
                mod: '--',
                value: '_'
            };
            expect(() => new BemPrefixSet(prefixes)).toThrowErrorMatchingSnapshot();
        });
        it('should throw if "mod" prefix is invalid', () => {
            const prefixes = {
                elem: '__',
                mod: '~',
                value: '_'
            };
            expect(() => new BemPrefixSet(prefixes)).toThrowErrorMatchingSnapshot();
        });
        it('should throw if "value" prefix is invalid', () => {
            const prefixes = {
                elem: '__',
                mod: '--',
                value: '~'
            };
            expect(() => new BemPrefixSet(prefixes)).toThrowErrorMatchingSnapshot();
        });
        it('should throw if "elem" prefix is empty', () => {
            const prefixes = {
                elem: '',
                mod: '--',
                value: '_'
            };
            expect(() => new BemPrefixSet(prefixes)).toThrowErrorMatchingSnapshot();
        });
        it('should throw if "mod" prefix is empty', () => {
            const prefixes = {
                elem: '__',
                mod: '',
                value: '_'
            };
            expect(() => new BemPrefixSet(prefixes)).toThrowErrorMatchingSnapshot();
        });
        it('should throw if "value" prefix is empty', () => {
            const prefixes = {
                elem: '__',
                mod: '--',
                value: ''
            };
            expect(() => new BemPrefixSet(prefixes)).toThrowErrorMatchingSnapshot();
        });
    });
});
