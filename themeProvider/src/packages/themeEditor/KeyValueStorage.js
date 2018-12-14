const nanoid = require('nanoid');

class KeyValueStorage {
    /**
     * @param {Map} storage
     */
    constructor() {
        this.storage = new Map();
    }

    /**
     * @param {Object} theme - Empty theme
     * @returns {{ id: string, payload: * }}
     */
    create(payload) {
        const id = nanoid();
        this.storage.set(id, payload);
        return { id, payload };
    }

    /**
     * @param {string} id - Theme id
     * @returns {Object|undefined}
     */
    read(id) {
        return this.storage.get(id);
    }

    toJSON() {
        return JSON.stringify([...this.storage]);
    }
}

module.exports = KeyValueStorage;
