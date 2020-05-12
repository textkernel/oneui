import { NodeIterator } from '../NodeIterator';

/* eslint-disable no-undef */
describe('NodeIterator', () => {
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
            root.innerHTML = html;
            expect(
                () => new NodeIterator({ root, whatToShow: NodeFilter.SHOW_TEXT })
            ).not.toThrow();
        });
    });
    describe('#create()', () => {
        it('should iterate through nodes correctly', () => {
            const root = document.createElement('div');
            root.innerHTML = html;
            const nodeIterator = new NodeIterator({ root, whatToShow: NodeFilter.SHOW_TEXT });
            const iterator = nodeIterator.create();
            let result = [];
            iterator.iterateThroughNodes((node) => {
                result.push(node.textContent);
            });
            result = result.map((item) => item.trim()).filter((item) => item);
            expect(result).toEqual([
                'python',
                'python test js js',
                'python',
                'python python',
                'python',
                'java',
            ]);
        });
    });
});
