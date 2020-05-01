import randomcolor from 'randomcolor';
import { HighlighterCore } from '../core';

export type HighlighterNodeRenderer = (keyword: string) => string;

export interface HighlighterNodeOptions {
    /** Function is called on render founded keyword */
    highlightRenderer: HighlighterNodeRenderer;
    /** Instance of HighlighterCore library */
    highlighterCore: HighlighterCore;
}

/**
 * This number allows retrieve more different color
 *
 * Need for internal implementation 'randomcolor' library
 * when we use 'seed' option for sequence numbers make its more different
 */
const COLOR_MULTIPLIER = 10;

export class HighlighterNode {
    private highlightRenderer: HighlighterNodeRenderer;

    private highlighterCore: HighlighterCore;

    /**
     * Generate random colors
     */
    static generateColor(index: number) {
        return randomcolor({
            luminosity: 'light',
            seed: index !== null ? index * COLOR_MULTIPLIER : null,
        });
    }

    static applyStylesForNode(node: HTMLElement, styles: CSSStyleDeclaration) {
        Object.keys(styles).forEach((property) => {
            node.style[property] = styles[property]; // eslint-disable-line no-param-reassign
        });
    }

    static unwrapDomElement(wrapper: HTMLElement) {
        return wrapper && wrapper.firstChild ? wrapper.firstChild.cloneNode(true) : null;
    }

    constructor({ highlightRenderer, highlighterCore }: HighlighterNodeOptions) {
        this.highlightRenderer = highlightRenderer;
        this.highlighterCore = highlighterCore;
    }

    private createWrappedNode(string: string) {
        const wrapper = document.createElement('span');
        const compiled = this.highlightRenderer(string);

        wrapper.innerHTML = compiled;

        return HighlighterNode.unwrapDomElement(wrapper);
    }

    public find(node: Node, styles: CSSStyleDeclaration, onMatch: (node: HTMLElement) => void) {
        if (!node.textContent || !this.highlighterCore) return;

        const result = this.highlighterCore.find(node.textContent);
        const wrapper = document.createDocumentFragment();
        result.forEach(({ substring, highlighted }) => {
            if (highlighted) {
                const newNode = this.createWrappedNode(substring);
                if (newNode instanceof HTMLElement) {
                    HighlighterNode.applyStylesForNode(newNode, styles);
                    wrapper.appendChild(newNode);
                    onMatch(newNode);
                }
            } else {
                wrapper.appendChild(document.createTextNode(substring));
            }
        });
        (node as HTMLElement).replaceWith(wrapper);
    }
}
