import BemDelimiters, { BemDelimitersError } from '..';

describe('BemDelimiters', () => {
    describe('module export', () => {
        it('should export BemDelimiters as default', () => {
            expect(BemDelimiters).toBeTruthy();
        });
        it('should export BemDelimitersError as named export', () => {
            expect(BemDelimitersError).toBeTruthy();
        });
    });

    describe('#constructor', () => {
        it('should create set of BEM delimiters', () => {
            const delimiters = {
                elem: '__',
                mod: '--',
                value: '_'
            };
            const bemDelimiters = new BemDelimiters(delimiters);
            expect(bemDelimiters).toEqual(delimiters);
        });
        it('should create a default set of BEM delimiters if nothing is passed', () => {
            const bemDelimiters = new BemDelimiters();
            expect(bemDelimiters).toEqual({
                elem: '__',
                mod: '--',
                value: '_'
            });
        });
        it('should set "elem" to default if it is not set', () => {
            const delimiters = {
                mod: '___',
                value: '----'
            };
            const bemDelimiters = new BemDelimiters(delimiters);
            expect(bemDelimiters).toEqual({
                ...delimiters,
                elem: '__'
            });
        });
        it('should set "mod" to default if it is not set', () => {
            const delimiters = {
                elem: '___',
                value: '____'
            };
            const bemDelimiters = new BemDelimiters(delimiters);
            expect(bemDelimiters).toEqual({
                ...delimiters,
                mod: '--'
            });
        });
        it('should set "value" to default if it is not set', () => {
            const delimiters = {
                elem: '____',
                mod: '---'
            };
            const bemDelimiters = new BemDelimiters(delimiters);
            expect(bemDelimiters).toEqual({
                ...delimiters,
                value: '_'
            });
        });
        it('should throw if "elem" delimiter is invalid', () => {
            const delimiters = {
                elem: '~',
                mod: '--',
                value: '_'
            };
            expect(() => new BemDelimiters(delimiters)).toThrowErrorMatchingInlineSnapshot(
                `"BEM elem has invalid value: '~'. It contains invalid characters or it is empty."`
            );
        });
        it('should throw if "mod" delimiter is invalid', () => {
            const delimiters = {
                elem: '__',
                mod: '~',
                value: '_'
            };
            expect(() => new BemDelimiters(delimiters)).toThrowErrorMatchingInlineSnapshot(
                `"BEM mod has invalid value: '~'. It contains invalid characters or it is empty."`
            );
        });
        it('should throw if "value" delimiter is invalid', () => {
            const delimiters = {
                elem: '__',
                mod: '--',
                value: '~'
            };
            expect(() => new BemDelimiters(delimiters)).toThrowErrorMatchingInlineSnapshot(
                `"BEM value has invalid value: '~'. It contains invalid characters or it is empty."`
            );
        });
        it('should throw if "elem" delimiter is empty', () => {
            const delimiters = {
                elem: '',
                mod: '--',
                value: '_'
            };
            expect(() => new BemDelimiters(delimiters)).toThrowErrorMatchingInlineSnapshot(
                `"BEM elem has invalid value: ''. It contains invalid characters or it is empty."`
            );
        });
        it('should throw if "mod" delimiter is empty', () => {
            const delimiters = {
                elem: '__',
                mod: '',
                value: '_'
            };
            expect(() => new BemDelimiters(delimiters)).toThrowErrorMatchingInlineSnapshot(
                `"BEM mod has invalid value: ''. It contains invalid characters or it is empty."`
            );
        });
        it('should throw if "value" delimiter is empty', () => {
            const delimiters = {
                elem: '__',
                mod: '--',
                value: ''
            };
            expect(() => new BemDelimiters(delimiters)).toThrowErrorMatchingInlineSnapshot(
                `"BEM value has invalid value: ''. It contains invalid characters or it is empty."`
            );
        });
        it('should throw if delimiters has invalid property', () => {
            const delimiters = {
                element: '__',
                mod: '--',
                value: '_'
            };
            expect(() => new BemDelimiters(delimiters)).toThrowErrorMatchingInlineSnapshot(
                `"BEM delimiters declaration includes unknown property 'element'. Allowed values are \\"elem, mod, value\\"."`
            );
        });
    });
});
