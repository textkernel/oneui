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

    describe('.from', () => {
        it.only('should parse "block" correctly', () => {
            const bemTokens = BemTokens.from('block');
            expect(bemTokens).toBeInstanceOf(BemTokens);
            expect(bemTokens).toEqual({
                block: 'block',
                elem: '',
                mod: '',
                value: ''
            });
        });
        it.only('should parse "block--mod" correctly', () => {
            const bemTokens = BemTokens.from('block--mod');
            expect(bemTokens).toEqual({
                block: 'block',
                elem: '',
                mod: 'mod',
                value: ''
            });
        });
        it.only('should parse "block--mod_value" correctly', () => {
            const bemTokens = BemTokens.from('block--mod_value');
            expect(bemTokens).toEqual({
                block: 'block',
                elem: '',
                mod: 'mod',
                value: 'value'
            });
        });
        it.only('should parse "block__elem" correctly', () => {
            const bemTokens = BemTokens.from('block__elem');
            expect(bemTokens).toEqual({
                block: 'block',
                elem: 'elem',
                mod: '',
                value: ''
            });
        });
        it.only('should parse "block__elem--mod" correctly', () => {
            const bemTokens = BemTokens.from('block__elem--mod');
            expect(bemTokens).toEqual({
                block: 'block',
                elem: 'elem',
                mod: 'mod',
                value: ''
            });
        });
        it.only('should parse "block__elem--mod_value" correctly', () => {
            const bemTokens = BemTokens.from('block__elem--mod_value');
            expect(bemTokens).toEqual({
                block: 'block',
                elem: 'elem',
                mod: 'mod',
                value: 'value'
            });
        });
    });
});
