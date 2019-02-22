import BemEntity, { BemEntityError } from '..';

describe('BemEntity', () => {
    describe('module export', () => {
        it('should export BemEntity as default', () => {
            expect(BemEntity).toBeTruthy();
        });
        it('should export BemEntityError as named export', () => {
            expect(BemEntityError).toBeTruthy();
        });
    });

    describe('#constructor', () => {
        it('should throw is "block" is not set', () => {
            expect(() => new BemEntity({ elem: 'foo' })).toThrowErrorMatchingInlineSnapshot(
                `"block must be a non empty string."`
            );
        });
        it('should throw is "block" is not a string', () => {
            expect(() => new BemEntity({ block: 42 })).toThrowErrorMatchingInlineSnapshot(
                `"block must be a non empty string."`
            );
        });
        it('should throw is "block" is invalid string', () => {
            expect(() => new BemEntity({ block: '42Block*' })).toThrowErrorMatchingInlineSnapshot(
                `"block value \\"42Block*\\" has invalid syntax. Should match [a-zA-Z]+[a-zA-Z0-9]* pattern."`
            );
        });
        it('should throw is "elem" is not a string', () => {
            expect(
                () => new BemEntity({ block: 'Block', elem: 42 })
            ).toThrowErrorMatchingInlineSnapshot(`"\\"elem\\" must be a string."`);
        });
        it('should throw is "elem" is invalid string', () => {
            expect(
                () => new BemEntity({ block: 'Block', elem: '((elem))' })
            ).toThrowErrorMatchingInlineSnapshot(
                `"elem value \\"((elem))\\" has invalid syntax. Should match [a-zA-Z0-9]+ pattern."`
            );
        });
        it('should throw is "mod" is not a string', () => {
            expect(
                () => new BemEntity({ block: 'Block', mod: 42 })
            ).toThrowErrorMatchingInlineSnapshot(`"\\"mod\\" must be a string."`);
        });
        it('should throw is "mod" is invalid string', () => {
            expect(
                () => new BemEntity({ block: 'Block', mod: '42mod' })
            ).toThrowErrorMatchingInlineSnapshot(
                `"mod value \\"\\" has invalid syntax. Should match [a-zA-Z]+[a-zA-Z0-9]* pattern."`
            );
        });
        it('should throw is "value" is not a string', () => {
            expect(
                () => new BemEntity({ block: 'Block', mod: 'mod', value: 42 })
            ).toThrowErrorMatchingInlineSnapshot(`"\\"value\\" must be a string."`);
        });
        it('should throw is "value" is invalid string', () => {
            expect(
                () => new BemEntity({ block: 'Block', mod: 'mod', value: '*' })
            ).toThrowErrorMatchingInlineSnapshot(
                `"value \\"*\\" has invalid syntax. Should match [a-zA-Z0-9]+ pattern."`
            );
        });
        it('should throw is value is set and mod is not set', () => {
            expect(
                () => new BemEntity({ block: 'Button', value: '42' })
            ).toThrowErrorMatchingInlineSnapshot(
                `"\\"value\\" can be set only when \\"mod\\" is also set."`
            );
        });
    });

    describe('.from', () => {
        it('should parse "block" correctly', () => {
            const bemEntity = BemEntity.from('block');
            expect(bemEntity).toBeInstanceOf(BemEntity);
            expect(bemEntity).toEqual({
                block: 'block',
                elem: '',
                mod: '',
                value: ''
            });
        });
        it('should parse "block--mod" correctly', () => {
            const bemEntity = BemEntity.from('block--mod');
            expect(bemEntity).toEqual({
                block: 'block',
                elem: '',
                mod: 'mod',
                value: ''
            });
        });
        it('should parse "block--mod_value" correctly', () => {
            const bemEntity = BemEntity.from('block--mod_value');
            expect(bemEntity).toEqual({
                block: 'block',
                elem: '',
                mod: 'mod',
                value: 'value'
            });
        });
        it('should parse "block--mod_1" correctly', () => {
            const bemEntity = BemEntity.from('block--mod_1');
            expect(bemEntity).toEqual({
                block: 'block',
                elem: '',
                mod: 'mod',
                value: '1'
            });
        });
        it('should parse "block__elem" correctly', () => {
            const bemEntity = BemEntity.from('block__elem');
            expect(bemEntity).toEqual({
                block: 'block',
                elem: 'elem',
                mod: '',
                value: ''
            });
        });
        it('should parse "block__elem--mod" correctly', () => {
            const bemEntity = BemEntity.from('block__elem--mod');
            expect(bemEntity).toEqual({
                block: 'block',
                elem: 'elem',
                mod: 'mod',
                value: ''
            });
        });
        it('should parse "block__elem--mod_value" correctly', () => {
            const bemEntity = BemEntity.from('block__elem--mod_value');
            expect(bemEntity).toEqual({
                block: 'block',
                elem: 'elem',
                mod: 'mod',
                value: 'value'
            });
        });
        it('should throw if className has no mod but has a value', () => {
            expect(() => BemEntity.from('block_value')).toThrowErrorMatchingInlineSnapshot(
                `"\\"value\\" can be set only when \\"mod\\" is also set."`
            );
            expect(() => BemEntity.from('block__elem_value')).toThrowErrorMatchingInlineSnapshot(
                `"\\"value\\" can be set only when \\"mod\\" is also set."`
            );
        });
        it('should throw if className is not set', () => {
            expect(() => BemEntity.from('__elem')).toThrowErrorMatchingInlineSnapshot(
                `"BEM classname '__elem' has invalid syntax."`
            );
            expect(() => BemEntity.from('--mod')).toThrowErrorMatchingInlineSnapshot(
                `"BEM classname '--mod' has invalid syntax."`
            );
            expect(() => BemEntity.from('--mod_value')).toThrowErrorMatchingInlineSnapshot(
                `"BEM classname '--mod_value' has invalid syntax."`
            );
            expect(() => BemEntity.from('_value')).toThrowErrorMatchingInlineSnapshot(
                `"BEM classname '_value' has invalid syntax."`
            );
            expect(() => BemEntity.from('block__--_')).toThrowErrorMatchingInlineSnapshot(
                `"BEM classname 'block__--_' has invalid syntax."`
            );
            expect(() => BemEntity.from('block__elem--mod_')).toThrowErrorMatchingInlineSnapshot(
                `"BEM classname 'block__elem--mod_' has invalid syntax."`
            );
        });
        it('should throw if className is empty or not a string', () => {
            expect(() => BemEntity.from()).toThrowErrorMatchingInlineSnapshot(
                `"BEM classname shoud not be empty"`
            );
            expect(() => BemEntity.from(42)).toThrowErrorMatchingInlineSnapshot(
                `"BEM classname shoud be a string"`
            );
            expect(() => BemEntity.from({ foo: 'bar ' })).toThrowErrorMatchingInlineSnapshot(
                `"BEM classname shoud be a string"`
            );
        });
    });
});
