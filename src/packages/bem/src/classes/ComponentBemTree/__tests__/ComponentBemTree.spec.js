import ComponentBemTree, { ComponentBemTreeError } from '..';

const classNameMap = {
    Button: 'Button',
    'Button--clicked': 'Button--clicked',
    'Button--active': 'Button--active',
    'Button--context_info': 'Button--context_info',
    'Button--context_error': 'Button--context_error',
    'Button--size': 'Button--size',
    'Button--size_1': 'Button--size_1',
    'Button--size_2': 'Button--size_2',
    Button__icon: 'Button__icon',
    'Button__icon--clicked': 'Button__icon--clicked',
    'Button__icon--context_error': 'Button__icon--context_error',
    'Button__icon--size_2': 'Button__icon--size_2',
    Button__label: 'Button__label',
    'Button__label--active': 'Button__label--active',
    'Button__label--context_info': 'Button__label--context_info',
    'Button__label--size_1': 'Button__label--size_1'
};

describe('ComponentBemTree', () => {
    describe('module export', () => {
        it('should export BemEntity as default', () => {
            expect(ComponentBemTree).toBeTruthy();
        });
        it('should export BemEntityError as named export', () => {
            expect(ComponentBemTreeError).toBeTruthy();
        });
    });

    describe('.from', () => {
        it('should create a ComponentBemTree instance from a classNameMap', () => {
            const componentBemTree = ComponentBemTree.from(classNameMap);
            expect(componentBemTree).toEqual({
                block: 'Button',
                mods: {
                    clicked: new Set(),
                    active: new Set(),
                    context: new Set(['info', 'error']),
                    size: new Set(['1', '2'])
                },
                elems: {
                    icon: {
                        clicked: new Set(),
                        context: new Set(['error']),
                        size: new Set(['2'])
                    },
                    label: {
                        active: new Set(),
                        context: new Set(['info']),
                        size: new Set(['1'])
                    }
                }
            });
        });
        it('should create an empty AST from empty object', () => {
            const componentBemTree = ComponentBemTree.from({});
            expect(componentBemTree).toEqual({
                block: '',
                elems: {},
                mods: {}
            });
        });
        it('should throw if classNameMap is not an object', () => {
            expect(() => ComponentBemTree.from('some_string')).toThrowErrorMatchingInlineSnapshot(
                `"classNamesMap suppose to be an Object"`
            );
            expect(() => ComponentBemTree.from(42)).toThrowErrorMatchingInlineSnapshot(
                `"classNamesMap suppose to be an Object"`
            );
            expect(() => ComponentBemTree.from(null)).toThrowErrorMatchingInlineSnapshot(
                `"classNamesMap suppose to be an Object"`
            );
            expect(() => ComponentBemTree.from(undefined)).toThrowErrorMatchingInlineSnapshot(
                `"classNamesMap suppose to be an Object"`
            );
        });
        it('should throw if classNameMap has inconsistent block names', () => {
            const inconsistentClassNameMap = {
                Button: 'Button',
                'Buggon--clicked': 'Buggon--clicked',
                Buddon__icon: 'Buddon__icon'
            };
            expect(() => {
                ComponentBemTree.from(inconsistentClassNameMap);
            }).toThrowErrorMatchingInlineSnapshot(
                `"classNamesMap is inconsistent – it contains different block names: \\"Button\\" != \\"Buggon\\""`
            );
        });
    });
});
