import { HighlighterCore } from '../HighlighterCore';

export type HighlighterNodeRenderer = (keyword: string) => HTMLElement;

export interface HighlighterNodeOptions {
    /** Function is called on render founded keyword */
    highlightRenderer: HighlighterNodeRenderer;
    /** Instance of HighlighterCore library */
    highlighterCore: HighlighterCore;
}

const COLORS = ['Lime', 'Lavender', 'Orange', 'Pink', 'Yellow', 'LightBlue'];

export class HighlighterNode {
    private highlightRenderer: HighlighterNodeRenderer;

    private highlighterCore: HighlighterCore;

    /**
     * Return color based on the index of the term
     */
    static generateColor(index: number) {
        return COLORS[index % COLORS.length];
    }

    static applyStylesForNode(node: HTMLElement, styles: CSSStyleDeclaration) {
        Object.keys(styles).forEach((property) => {
            node.style[property] = styles[property]; // eslint-disable-line no-param-reassign
        });
    }

    constructor({ highlightRenderer, highlighterCore }: HighlighterNodeOptions) {
        this.highlightRenderer = highlightRenderer;
        this.highlighterCore = highlighterCore;
    }

    public find(node: Node, onMatch?: (node: HTMLElement) => void) {
        if (node.textContent && this.highlighterCore) {
            const result = this.highlighterCore.find(node.textContent);
            const wrapper = document.createDocumentFragment();
            result.forEach(({ substring, highlighted }) => {
                if (highlighted) {
                    const newNode = this.highlightRenderer(substring);
                    if (newNode instanceof HTMLElement) {
                        wrapper.appendChild(newNode);
                        if (onMatch) {
                            onMatch(newNode);
                        }
                    }
                } else {
                    wrapper.appendChild(document.createTextNode(substring));
                }
            });
            (node as HTMLElement).replaceWith(wrapper);
        }
    }
}
