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
     * Used for keep store
     */
    globalStore = {};

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
        this.globalStore = new Store(injectedStore);
        this.globalStore.subscribe(state => {
            // Enforce rerender stories when store was changed
            addons.getChannel().emit(FORCE_RE_RENDER);
            return state;
        });
        addons.getChannel().emit(FORCE_RE_RENDER);
    }

    /**
     * Used for injected store in Storybook
     */
    withStore(injectedStore) {
        this.initialStore = injectedStore;
        this.createStore(injectedStore);
        return {
            getStore: () => this.globalStore,
            resetStore: () => this.createStore(injectedStore),
        };
    }
}

const storeInjectors = [];

const injectStore = injectedStore => {
    const injector = new StoreInjector();
    const index = storeInjectors.length;
    storeInjectors.push(injector);
    return storeInjectors[index].withStore(injectedStore);
};

export { StoreInjector, storeInjectors };
export default injectStore;
