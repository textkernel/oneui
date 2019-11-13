import withStore, { StoreInjector } from '../withStore';

jest.mock('@storybook/addons', () => ({
    getChannel: () => ({
        on: () => {},
        emit: () => {},
    }),
}));

describe('Storybook|injectStore decorator', () => {
    beforeEach(() => {
        StoreInjector.stores = [];
    });

    it('should expos the public API', () => {
        const instance = withStore();
        expect(typeof instance.getStore).toBe('function');
        expect(typeof instance.resetStore).toBe('function');
    });

    it('should return stored values', () => {
        const instance = withStore({
            string: 'test',
            object: { a: 1 },
            array: [1, 2, 3],
        });
        expect(instance.getStore().get('string')).toBe('test');
        expect(instance.getStore().get('object')).toEqual({ a: 1 });
        expect(instance.getStore().get('array')).toEqual([1, 2, 3]);
    });

    it('should change just changed values', () => {
        const instance = withStore({
            string: 'test',
            number: 1,
        });
        instance.getStore().set({ string: 'new value' });
        expect(instance.getStore().get('string')).toBe('new value');
        expect(instance.getStore().get('number')).toBe(1);
    });

    it('should reset store to initialValues', () => {
        const instance = withStore({
            string: 'test',
            number: 1,
        });
        instance.getStore().set({ string: 'new value' });
        instance.getStore().set({ number: 2 });
        instance.resetStore();
        expect(instance.getStore().get('string')).toBe('test');
        expect(instance.getStore().get('number')).toBe(1);
    });

    it('should create a separate store instance each time it is called', () => {
        expect(StoreInjector.stores).toHaveLength(0);

        withStore({ id: 1 });
        withStore({ id: 2 });

        expect(StoreInjector.stores).toHaveLength(2);
        expect(StoreInjector.stores[0].initialStore.id).toEqual(1);
        expect(StoreInjector.stores[1].initialStore.id).toEqual(2);
    });
});
