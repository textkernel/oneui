interface NodeIteratorOptions {
    /**
     * Defines root node at which to begin the NodeIterator's traversal
     */
    root: HTMLElement;
    /**
     * Defines filtering for certain types of node
     * https://developer.mozilla.org/en-US/docs/Web/API/Document/createNodeIterator
     */
    whatToShow?: number;
}

/**
 * This module allows you to iterate through dom nodes
 * Support filtering for certain types of node
 */
export class NodeIterator {
    private root: HTMLElement;

    private whatToShow?: number;

    constructor({ root, whatToShow }: NodeIteratorOptions) {
        this.root = root;
        this.whatToShow = whatToShow;
    }

    public create() {
        const iterator = document.createNodeIterator(this.root, this.whatToShow);

        return {
            iterateThroughNodes: (onEach: (node: Node) => void) => {
                const elements: Node[] = [];
                let currentNode = iterator.nextNode();

                while (currentNode) {
                    elements.push(currentNode);
                    currentNode = iterator.nextNode();
                }

                elements.forEach((node) => {
                    onEach(node);
                });
            },
        };
    }
}
