import BemPrefixSet from '..';

describe('BemPrefixSet', () => {
    describe('#constructor', () => {
        it('should create set of BEM prefixes', () => {
            const prefixes = {
                elem: '__',
                mod: '--',
                value: '_'
            };
            const bemPrefixSet = new BemPrefixSet(prefixes);
            console.log(bemPrefixSet);
            expect(bemPrefixSet).toEqual(prefixes);
        });
    });
});
