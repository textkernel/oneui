import BemTokens, { BemTokensError } from '..';

describe('BemTokens', () => {
    describe('module export', () => {
        it('should export BemTokens as default', () => {
            expect(BemTokens).toBeTruthy();
        });
        it('should export BemTokensError as named export', () => {
            expect(BemTokensError).toBeTruthy();
        });
    });

    describe('#constructor', () => {
        it('should throw is "block" is not set', () => {
            expect(() => new BemTokens({ elem: 'foo' })).toThrowErrorMatchingInlineSnapshot(
                `"block must be a non empty string."`
            );
        });
        it('should throw is "block" is not a string', () => {
            expect(() => new BemTokens({ block: 42 })).toThrowErrorMatchingInlineSnapshot(
                `"block must be a non empty string."`
            );
        });
        it('should throw is "block" is invalid string', () => {
            expect(() => new BemTokens({ block: '42Block*' })).toThrowErrorMatchingInlineSnapshot(
                `"block value \\"42Block*\\" has invalid syntax. Should match [a-zA-Z]+[a-zA-Z0-9]* pattern."`
            );
        });
        it('should throw is "elem" is not a string', () => {
            expect(
                () => new BemTokens({ block: 'Block', elem: 42 })
            ).toThrowErrorMatchingInlineSnapshot(`"\\"elem\\" must be a string."`);
        });
        it('should throw is "elem" is invalid string', () => {
            expect(
                () => new BemTokens({ block: 'Block', elem: '((elem))' })
            ).toThrowErrorMatchingInlineSnapshot(
                `"elem value \\"((elem))\\" has invalid syntax. Should match [a-zA-Z0-9]+ pattern."`
            );
        });
        it('should throw is "mod" is not a string', () => {
            expect(
                () => new BemTokens({ block: 'Block', mod: 42 })
            ).toThrowErrorMatchingInlineSnapshot(`"\\"mod\\" must be a string."`);
        });
        it('should throw is "mod" is invalid string', () => {
            expect(
                () => new BemTokens({ block: 'Block', mod: '42mod' })
            ).toThrowErrorMatchingInlineSnapshot(
                `"mod value \\"\\" has invalid syntax. Should match [a-zA-Z]+[a-zA-Z0-9]* pattern."`
            );
        });
        it('should throw is "value" is not a string', () => {
            expect(
                () => new BemTokens({ block: 'Block', mod: 'mod', value: 42 })
            ).toThrowErrorMatchingInlineSnapshot(`"\\"value\\" must be a string."`);
        });
        it('should throw is "value" is invalid string', () => {
            expect(
                () => new BemTokens({ block: 'Block', mod: 'mod', value: '*' })
            ).toThrowErrorMatchingInlineSnapshot(
                `"value \\"*\\" has invalid syntax. Should match [a-zA-Z0-9]+ pattern."`
            );
        });
        it('should throw is value is set and mod is not set', () => {
            expect(
                () => new BemTokens({ block: 'Button', value: '42' })
            ).toThrowErrorMatchingInlineSnapshot(
                `"\\"value\\" can be set only when \\"mod\\" is also set."`
            );
        });
    });

    describe('.from', () => {
        it('should parse "block" correctly', () => {
            const bemTokens = BemTokens.from('block');
            expect(bemTokens).toBeInstanceOf(BemTokens);
            expect(bemTokens).toEqual({
                block: 'block',
                elem: '',
                mod: '',
                value: ''
            });
        });
        it('should parse "block--mod" correctly', () => {
            const bemTokens = BemTokens.from('block--mod');
            expect(bemTokens).toEqual({
                block: 'block',
                elem: '',
                mod: 'mod',
                value: ''
            });
        });
        it('should parse "block--mod_value" correctly', () => {
            const bemTokens = BemTokens.from('block--mod_value');
            expect(bemTokens).toEqual({
                block: 'block',
                elem: '',
                mod: 'mod',
                value: 'value'
            });
        });
        it('should parse "block--mod_1" correctly', () => {
            const bemTokens = BemTokens.from('block--mod_1');
            expect(bemTokens).toEqual({
                block: 'block',
                elem: '',
                mod: 'mod',
                value: '1'
            });
        });
        it('should parse "block__elem" correctly', () => {
            const bemTokens = BemTokens.from('block__elem');
            expect(bemTokens).toEqual({
                block: 'block',
                elem: 'elem',
                mod: '',
                value: ''
            });
        });
        it('should parse "block__elem--mod" correctly', () => {
            const bemTokens = BemTokens.from('block__elem--mod');
            expect(bemTokens).toEqual({
                block: 'block',
                elem: 'elem',
                mod: 'mod',
                value: ''
            });
        });
        it('should parse "block__elem--mod_value" correctly', () => {
            const bemTokens = BemTokens.from('block__elem--mod_value');
            expect(bemTokens).toEqual({
                block: 'block',
                elem: 'elem',
                mod: 'mod',
                value: 'value'
            });
        });
        it('should throw if className has no mod but has a value', () => {
            expect(() => BemTokens.from('block_value')).toThrowErrorMatchingInlineSnapshot(
                `"\\"value\\" can be set only when \\"mod\\" is also set."`
            );
            expect(() => BemTokens.from('block__elem_value')).toThrowErrorMatchingInlineSnapshot(
                `"\\"value\\" can be set only when \\"mod\\" is also set."`
            );
        });
        it('should throw if className is not set', () => {
            expect(() => BemTokens.from('__elem')).toThrowErrorMatchingInlineSnapshot(
                `"BEM classname '__elem' has invalid syntax."`
            );
            expect(() => BemTokens.from('--mod')).toThrowErrorMatchingInlineSnapshot(
                `"BEM classname '--mod' has invalid syntax."`
            );
            expect(() => BemTokens.from('--mod_value')).toThrowErrorMatchingInlineSnapshot(
                `"BEM classname '--mod_value' has invalid syntax."`
            );
            expect(() => BemTokens.from('_value')).toThrowErrorMatchingInlineSnapshot(
                `"BEM classname '_value' has invalid syntax."`
            );
            expect(() => BemTokens.from('block__--_')).toThrowErrorMatchingInlineSnapshot(
                `"BEM classname 'block__--_' has invalid syntax."`
            );
            expect(() => BemTokens.from('block__elem--mod_')).toThrowErrorMatchingInlineSnapshot(
                `"BEM classname 'block__elem--mod_' has invalid syntax."`
            );
        });
        it('should throw if className is empty or not a string', () => {
            expect(() => BemTokens.from()).toThrowErrorMatchingInlineSnapshot(
                `"BEM classname shoud not be empty"`
            );
            expect(() => BemTokens.from(42)).toThrowErrorMatchingInlineSnapshot(
                `"BEM classname shoud be a string"`
            );
            expect(() => BemTokens.from({ foo: 'bar ' })).toThrowErrorMatchingInlineSnapshot(
                `"BEM classname shoud be a string"`
            );
        });
    });
});
