import { NodeIterator } from './NodeIterator';
import { HighlighterCore, HighlighterCoreOptions } from './HighlighterCore';
import { HighlighterNode } from './HighlighterNode';

export type HighlighterResultItem = {
    term: string;
    styles: CSSStyleDeclaration;
    amount: number;
};

enum SelectionStatus {
    selected = 'selected',
    notSelected = 'not_selected',
}

type FindInNodeFunction = (node: Node, onMatch: (node: HTMLElement) => void) => void;

export interface HighlighterScrollArgs {
    nodeTopPosition: number;
    heightViewport: number;
    scrollTop: number;
}

const SCROLLABLE_NODE_STYLES = {
    scrollBehavior: 'smooth',
} as CSSStyleDeclaration;

const HIGHLIGHTED_NODE_STYLES = {
    borderRadius: '1px',
    display: 'inline-block',
    textIndent: 'initial',
} as CSSStyleDeclaration;

const SELECTED_NODE_STYLES = {
    // var(--color-primary) = #0097d1'
    boxShadow: '0 0 0 2px #0097d1',
    transform: 'scale(1.2)',
    transition: 'transform .2s',
    position: 'relative',
    zIndex: '1',
} as CSSStyleDeclaration;

const RESET_SELECTED_NODE_STYLES = {
    boxShadow: '',
    transform: 'scale(1)',
    transition: 'none',
    position: 'initial',
    zIndex: '0',
} as CSSStyleDeclaration;

export interface HighlighterOptions {
    /** Defines scope where you want find and scroll highlight keywords */
    root: HTMLElement;
    /** Function responsible for scrolling */
    scrollFunction?: (values: HighlighterScrollArgs) => void;
    /** Defines DOM element that has scrolling */
    scrollableElement?: HTMLElement;
}

const KEYWORD_ATTRIBUTE = 'data-highlight-keyword';
const SELECTED_ATTRIBUTE = 'data-highlight-selected';

export class Highlighter {
    private root: HTMLElement;

    private scrollFunction?: (values: HighlighterScrollArgs) => void;

    private scrollableElement?: HTMLElement;

    private nodeIterator: NodeIterator;

    /**
     * Method used for comparing position two nodes by the appearance
     * Compare vertical and horizontal position
     */
    static comparePositionTwoNodes(node: HTMLElement, nextNode: HTMLElement) {
        const nodeBoundaries = node.getBoundingClientRect();
        const nextNodeBoundaries = nextNode.getBoundingClientRect();
        const verticalCompares = nodeBoundaries.top - nextNodeBoundaries.top;
        const horizontalCompares = nodeBoundaries.left - nextNodeBoundaries.left;

        if (verticalCompares === 0) {
            return horizontalCompares;
        }

        return verticalCompares;
    }

    /**
     * Method used for sort nodes by appearance
     * Order from top to bottom and left to right
     */
    static sortNodesByAppearance(nodes: HTMLElement[]) {
        return nodes.sort(Highlighter.comparePositionTwoNodes);
    }

    static createHighlightWrapper(term: string, styles: CSSStyleDeclaration) {
        const node = document.createElement('mark');
        HighlighterNode.applyStylesForNode(node, styles);
        node.innerText = term;
        return node;
    }

    static generateHighlightStyles(index: number) {
        return {
            ...HIGHLIGHTED_NODE_STYLES,
            backgroundColor: HighlighterNode.generateColor(index),
        } as CSSStyleDeclaration;
    }

    constructor({
        root,
        scrollFunction,
        scrollableElement = window.document.documentElement,
    }: HighlighterOptions) {
        this.root = root;
        this.scrollFunction = scrollFunction;
        this.scrollableElement = scrollableElement;
        this.nodeIterator = new NodeIterator({
            root,
            whatToShow: NodeFilter.SHOW_TEXT,
        });

        HighlighterNode.applyStylesForNode(scrollableElement, SCROLLABLE_NODE_STYLES);
    }

    private keywordNodes(keyword: string) {
        return this.root.querySelectorAll<HTMLElement>(`[${KEYWORD_ATTRIBUTE}="${keyword}"]`);
    }

    private get selectedNode() {
        return this.root.querySelector<HTMLElement>(
            `[${SELECTED_ATTRIBUTE}="${SelectionStatus.selected}"]`
        );
    }

    private triggerSelection(keyword: string) {
        let nextIndex = 0;
        const keywordNodes = Array.from(this.keywordNodes(keyword));
        const prevNode = this.selectedNode;

        if (prevNode) {
            HighlighterNode.applyStylesForNode(prevNode, RESET_SELECTED_NODE_STYLES);
        }

        const sortedKeywordNodes = Highlighter.sortNodesByAppearance(keywordNodes);

        if (prevNode) {
            const indexPrevNode = sortedKeywordNodes.indexOf(prevNode);
            prevNode.setAttribute(SELECTED_ATTRIBUTE, SelectionStatus.notSelected);

            nextIndex = indexPrevNode + 1;

            if (nextIndex >= sortedKeywordNodes.length) {
                nextIndex = 0;
            }
        }

        const nextNode = sortedKeywordNodes[nextIndex];

        if (nextNode) {
            HighlighterNode.applyStylesForNode(nextNode, SELECTED_NODE_STYLES);
            nextNode.setAttribute(SELECTED_ATTRIBUTE, SelectionStatus.selected);
        }
    }

    private scrollToSelectedKeyword() {
        const { selectedNode } = this;
        if (selectedNode && this.scrollableElement) {
            const nodeTopPosition = selectedNode.getBoundingClientRect().top;
            const heightViewport = this.scrollableElement.clientHeight || 0;
            const scrollTop = this.scrollableElement.scrollTop || 0;

            if (this.scrollFunction) {
                this.scrollFunction({
                    nodeTopPosition,
                    heightViewport,
                    scrollTop,
                });
            } else {
                this.scrollableElement.scrollTo(
                    0,
                    nodeTopPosition + scrollTop - heightViewport / 2
                );
            }
        }
    }

    private findKeywordInNodes(keyword: string, findInNode: FindInNodeFunction) {
        const iterator = this.nodeIterator.create();

        iterator.iterateThroughNodes((node) => {
            findInNode(node, (highlightedNode) => {
                highlightedNode.setAttribute(KEYWORD_ATTRIBUTE, keyword);
            });
        });
    }

    public find(
        terms: string[],
        highlighterCoreOptions?: HighlighterCoreOptions,
        highlightStyles?: CSSStyleDeclaration
    ) {
        const matchedTerms: HighlighterResultItem[] = [];
        const notMatchedTerms: HighlighterResultItem[] = [];
        const sortedTerms = HighlighterCore.sortTerms(terms);

        sortedTerms.forEach((term, index) => {
            let amount = 0;
            const styles = highlightStyles || Highlighter.generateHighlightStyles(index);
            const highlighterNode = new HighlighterNode({
                highlighterCore: new HighlighterCore([term], {
                    ...highlighterCoreOptions,
                }),
                highlightRenderer: (highlightTerm) => {
                    return Highlighter.createHighlightWrapper(highlightTerm, styles);
                },
            });
            this.findKeywordInNodes(term, (node, onMatch) => {
                highlighterNode.find(node, (highlightedNode) => {
                    amount += 1;
                    onMatch(highlightedNode);
                });
            });

            const termResultItem: HighlighterResultItem = {
                term,
                styles,
                amount,
            };

            if (amount > 0) {
                matchedTerms.push(termResultItem);
            } else {
                notMatchedTerms.push(termResultItem);
            }
        });

        const sortedMatchTerms = matchedTerms.sort((a, b) => b.amount - a.amount);

        return [sortedMatchTerms, notMatchedTerms];
    }

    public selectKeyword(keyword: string) {
        this.triggerSelection(keyword);
        this.scrollToSelectedKeyword();
    }
}
