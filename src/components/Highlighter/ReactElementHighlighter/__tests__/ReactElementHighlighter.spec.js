import React from 'react';
import { Highlighter } from '../../../../packages/Highlighter';
import { ReactElementHighlighter } from '../ReactElementHighlighter';

describe('ReactElementHighlighter', () => {
    const keywords = ['lorem', 'officia', 'dolore', 'dolor', 'irure dolor', 'qui officia deserunt'];
    const renderComponent = (props) => {
        return mount(
            <ReactElementHighlighter
                searchTerms={keywords}
                highlightRenderer={(keyword) => {
                    const node = document.createElement('mark');
                    node.innerText = keyword;
                    return node;
                }}
                onComplete={() => {}}
                {...props}
            >
                <>
                    <h1>Lorem ipsum dolor sit amet</h1>
                    <p>
                        Lorem ipsum dolor sit amet, eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                        officia deserunt mollit anim id est laborum.
                    </p>
                </>
            </ReactElementHighlighter>
        );
    };

    it('should highlight and return result', (done) => {
        renderComponent({
            onComplete: (highlighter, result, root) => {
                expect(root.outerHTML).toMatchSnapshot();
                expect(result[0].length).toBe(5);
                expect(result[1].length).toBe(1);
                expect(highlighter).toBeInstanceOf(Highlighter);
                done();
            },
        });
    });
});
