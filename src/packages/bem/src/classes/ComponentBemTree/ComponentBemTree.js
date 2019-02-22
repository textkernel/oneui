import BemEntity from '../BemEntity';

export class ComponentBemTreeError extends Error {}

export default class ComponentBemTree {
    /**
     * @type {string}
     * @readonly
     */
    block = '';

    /**
     * @type {Object.<string, Set>}
     * @readonly
     */
    mods = Object.create(null);

    /**
     * @type {Object.<string, Object>}
     * @readonly
     */
    elems = Object.create(null);

    /**
     * Adds new className to the AST
     * @param {string} className
     * @public
     */
    addClassName(className) {
        const tokens = BemEntity.from(className);
        this.validateAndSetBlockName(tokens);
        if (tokens.elem) {
            this.addTokenAsElement(tokens);
        } else {
            this.addTokenAsBlock(tokens);
        }
    }

    /**
     * Set the block name and check if it is consistent
     * @param {BemEntity} tokens
     * @returns {void}
     * @private
     */
    validateAndSetBlockName(tokens) {
        if (this.block === '') {
            this.block = tokens.block;
        } else if (this.block !== tokens.block) {
            throw new ComponentBemTreeError(
                'classNamesMap is inconsistent – it contains different block names: ' +
                    `"${this.block}" != "${tokens.block}"`
            );
        }
    }

    /**
     * @param {BemEntity} tokens
     * @returns {void}
     * @private
     */
    addTokenAsElement(tokens) {
        this.elems[tokens.elem] = this.elems[tokens.elem] || Object.create(null);
        if (tokens.mod) {
            this.elems[tokens.elem][tokens.mod] = this.elems[tokens.elem][tokens.mod] || new Set();
            if (tokens.value) {
                this.elems[tokens.elem][tokens.mod].add(tokens.value);
            }
        }
    }

    /**
     * @param {BemEntity} tokens
     * @returns {void}
     * @private
     */
    addTokenAsBlock(tokens) {
        // Block level context
        if (tokens.mod) {
            this.mods[tokens.mod] = this.mods[tokens.mod] || new Set();
            if (tokens.value) {
                this.mods[tokens.mod].add(tokens.value);
            }
        }
    }

    /**
     * Adds new className to the AST
     * @param {Object.<string, string>} classNameMap
     * @public
     */
    static from(classNamesMap) {
        if (classNamesMap === null || typeof classNamesMap !== 'object') {
            throw new ComponentBemTreeError('classNamesMap suppose to be an Object');
        }
        const componentBemTree = new ComponentBemTree();
        Object.keys(classNamesMap).forEach(className => componentBemTree.addClassName(className));
        return componentBemTree;
    }
}
