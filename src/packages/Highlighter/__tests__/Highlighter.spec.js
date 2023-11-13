import { Highlighter } from '../Highlighter';

describe('Highlighter', () => {
    window.scrollTo = () => {};
    const createOnMatchCallback = (keyword) => (node, onMatch) => {
        if (node.textContent === keyword) {
            const newNode = document.createElement('mark');
            newNode.innerHTML = node.textContent;
            onMatch(newNode);
            node.replaceWith(newNode);
        }
    };
    const html = `
        <div>
            python
            <p>python test js js</p>
            <h1>
                <p>
                    <p>python</p>
                <div>python python</div>
                    <p>python</p>
                </p>
            </h1>
        </div>java
    `;
    describe('#constructor()', () => {
        it('should create an instance with default options', () => {
            const root = document.createElement('div');
            expect(() => new Highlighter({ root })).not.toThrow();
        });
    });
    describe('#comparePositionTwoNodes()', () => {
        it('should correct compare vertical position', () => {
            const firstNode = document.createElement('div');
            firstNode.getBoundingClientRect = jest.fn(() => ({
                top: 10,
                left: 40,
            }));
            const secondNode = document.createElement('div');
            secondNode.getBoundingClientRect = jest.fn(() => ({
                top: 20,
                left: 10,
            }));
            Highlighter.comparePositionTwoNodes(firstNode, secondNode);
            expect(Highlighter.comparePositionTwoNodes(firstNode, secondNode) > 0).toBeFalsy();
        });
        it('should correct compare vertical position in nodes in different order', () => {
            const firstNode = document.createElement('div');
            firstNode.getBoundingClientRect = jest.fn(() => ({
                top: 20,
                left: 40,
            }));
            const secondNode = document.createElement('div');
            secondNode.getBoundingClientRect = jest.fn(() => ({
                top: 10,
                left: 10,
            }));
            Highlighter.comparePositionTwoNodes(firstNode, secondNode);
            expect(Highlighter.comparePositionTwoNodes(firstNode, secondNode) > 0).toBeTruthy();
        });
        it('should correct compare horizontal position', () => {
            const firstNode = document.createElement('div');
            firstNode.getBoundingClientRect = jest.fn(() => ({
                top: 10,
                left: 20,
            }));
            const secondNode = document.createElement('div');
            secondNode.getBoundingClientRect = jest.fn(() => ({
                top: 10,
                left: 10,
            }));
            Highlighter.comparePositionTwoNodes(firstNode, secondNode);
            expect(Highlighter.comparePositionTwoNodes(firstNode, secondNode) > 0).toBeTruthy();
        });
    });
    describe('#sortNodesByAppearance()', () => {
        it("should correct compare position of node's list", () => {
            const firstNode = document.createElement('div');
            firstNode.getBoundingClientRect = jest.fn(() => ({
                top: 30,
                left: 40,
            }));
            const secondNode = document.createElement('span');
            secondNode.getBoundingClientRect = jest.fn(() => ({
                top: 10,
                left: 10,
            }));
            const thirdNode = document.createElement('a');
            thirdNode.getBoundingClientRect = jest.fn(() => ({
                top: 30,
                left: 20,
            }));
            expect(Highlighter.sortNodesByAppearance([firstNode, secondNode, thirdNode])).toEqual([
                secondNode,
                thirdNode,
                firstNode,
            ]);
        });
    });
    describe('#createHighlightWrapper()', () => {
        it('should correct create highlighted node', () => {
            expect(
                Highlighter.createHighlightWrapper('term', {
                    padding: '2px',
                    color: 'red',
                }).outerHTML
            ).toBe('<mark style="padding: 2px; color: red;"></mark>');
        });
    });
    describe('#generateHighlightStyles()', () => {
        it('should correct create highlighted node', () => {
            expect(Highlighter.generateHighlightStyles(1)).toBeInstanceOf(Object);
        });
    });
    describe('#find()', () => {
        it('should return correct result', () => {
            const root = document.createElement('div');
            root.innerHTML = html;
            const highlighter = new Highlighter({ root });
            const [matchedTerms, notMatchedTerms] = highlighter.find(['python', 'notExist']);
            expect(matchedTerms.length).toEqual(1);
            expect(matchedTerms[0].amount).toBe(6);
            expect(matchedTerms[0].term).toBe('python');
            expect(notMatchedTerms.length).toBe(1);
            expect(notMatchedTerms[0].amount).toBe(0);
            expect(notMatchedTerms[0].term).toBe('notExist');
        });
        it('should highlight nodes correctly', () => {
            const root = document.createElement('div');
            root.innerHTML = html;
            const highlighter = new Highlighter({ root });
            highlighter.findKeywordInNodes('python', createOnMatchCallback('python'));
            const highlightedItems = root.querySelectorAll('[data-highlight-keyword="python"]');
            expect(highlightedItems.length).toBe(2);
            expect(highlightedItems[0].textContent).toBe('python');
            expect(highlightedItems[1].textContent).toBe('python');
        });
        it('should apply custom styles for keywords', () => {
            const root = document.createElement('div');
            root.innerHTML = html;
            const highlighter = new Highlighter({ root }, undefined);
            highlighter.find(['python'], undefined, { color: 'lightyellow' });
            const highlightedItems = root.querySelectorAll('[data-highlight-keyword="python"]');
            expect(highlightedItems.length).toBe(6);
            expect(highlightedItems[0].style).toMatchObject({ color: 'lightyellow' });
            expect(highlightedItems[1].style).toMatchObject({ color: 'lightyellow' });
            expect(highlightedItems[2].style).toMatchObject({ color: 'lightyellow' });
            expect(highlightedItems[3].style).toMatchObject({ color: 'lightyellow' });
            expect(highlightedItems[4].style).toMatchObject({ color: 'lightyellow' });
            expect(highlightedItems[5].style).toMatchObject({ color: 'lightyellow' });
        });
    });
    describe('#selectKeyword()', () => {
        it('should select highlight in correct order', () => {
            const root = document.createElement('div');
            root.innerHTML = html;
            const highlighter = new Highlighter({ root, scrollFunction: () => {} });
            highlighter.findKeywordInNodes('python', createOnMatchCallback('python'));
            const highlightedItems = root.querySelectorAll('[data-highlight-keyword="python"]');
            highlightedItems[0].getBoundingClientRect = jest.fn(() => ({
                top: 30,
                left: 40,
            }));
            highlightedItems[1].getBoundingClientRect = jest.fn(() => ({
                top: 20,
                left: 10,
            }));
            highlighter.selectKeyword('python');
            expect(highlightedItems[0].getAttribute('data-highlight-selected')).toBe(null);
            expect(highlightedItems[1].getAttribute('data-highlight-selected')).toBe('selected');
            highlighter.selectKeyword('python');
            expect(highlightedItems[0].getAttribute('data-highlight-selected')).toBe('selected');
            expect(highlightedItems[1].getAttribute('data-highlight-selected')).toBe(
                'not_selected'
            );
            highlighter.selectKeyword('python');
            expect(highlightedItems[0].getAttribute('data-highlight-selected')).toBe(
                'not_selected'
            );
            expect(highlightedItems[1].getAttribute('data-highlight-selected')).toBe('selected');
        });
    });
    describe('#selectKeyword()', () => {
        it("should unselect highlight if keyword doesn't exist", () => {
            const root = document.createElement('div');
            root.innerHTML = html;
            const highlighter = new Highlighter({ root, scrollFunction: () => {} });
            highlighter.findKeywordInNodes('python', createOnMatchCallback('python'));
            const highlightedItems = root.querySelectorAll('[data-highlight-keyword="python"]');
            highlightedItems[0].getBoundingClientRect = jest.fn(() => ({
                top: 30,
                left: 40,
            }));
            highlightedItems[1].getBoundingClientRect = jest.fn(() => ({
                top: 20,
                left: 10,
            }));
            highlighter.selectKeyword('python');
            expect(highlightedItems[0].getAttribute('data-highlight-selected')).toBe(null);
            expect(highlightedItems[1].getAttribute('data-highlight-selected')).toBe('selected');
            highlighter.selectKeyword('not_exist');
            expect(highlightedItems[0].getAttribute('data-highlight-selected')).toBe(null);
            expect(highlightedItems[1].getAttribute('data-highlight-selected')).toBe(
                'not_selected'
            );
        });
    });
});
