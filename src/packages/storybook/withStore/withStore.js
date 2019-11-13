import addons from '@storybook/addons'; // eslint-disable-line import/no-extraneous-dependencies
import { STORY_CHANGED, FORCE_RE_RENDER } from '@storybook/core-events'; // eslint-disable-line import/no-extraneous-dependencies
import { Store } from '@sambego/storybook-state'; // eslint-disable-line import/no-extraneous-dependencies

/**
 * This decorator allows you to add store in Storybook
 * For inject store use Storybook API `addParameters`
 * Example: `.addParameters(injectStore({ param: 'one' }))`
 */
class StoreInjector {
    /**
     * Used to store all store from all stories in storybook
     */
    static stores = [];

    /**
     * Used for injected store in Storybook
     */
    static withStore(injectedStore) {
        const storeInstance = new StoreInjector();
        StoreInjector.stores.push(storeInstance);

        storeInstance.initialStore = injectedStore;
        storeInstance.createStore(injectedStore);
        return {
            getStore: () => storeInstance.store,
            resetStore: () => storeInstance.createStore(injectedStore),
        };
    }

    /**
     * Used for keep a store
     */
    store = {};

    /**
     * Used for keep initial store
     */
    initialStore = {};

    constructor() {
        const channel = addons.getChannel();
        // Fired when page changed
        channel.on(STORY_CHANGED, () => {
            this.createStore(this.initialStore);
        });
    }

    /**
     * Used for create store
     */
    createStore(injectedStore) {
        this.store = new Store(injectedStore);
        this.store.subscribe(state => {
            // Enforce rerender stories when store was changed
            addons.getChannel().emit(FORCE_RE_RENDER);
            return state;
        });
        addons.getChannel().emit(FORCE_RE_RENDER);
    }
}

export { StoreInjector };
export default StoreInjector.withStore;
