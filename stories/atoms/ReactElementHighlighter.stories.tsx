import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ReactElementHighlighter } from '@textkernel/oneui';

const HIGHLIGHT_STYLES = {
    backgroundColor: 'lightyellow',
} as CSSStyleDeclaration;

const meta: Meta<typeof ReactElementHighlighter> = {
    title: 'Atoms/Highlighter',
    component: ReactElementHighlighter,
    render: (args) => <ReactElementHighlighter {...args} />,
    argTypes: {
        highlighterCoreOptions: {
            accuracy: { options: ['exact', 'partial'], control: 'inline-radio' },
        },
    },
};

export default meta;

type Story = StoryObj<typeof ReactElementHighlighter>;

export const _ReactElementHighlighter: Story = {
    name: 'ReactElementHighlighter',
    args: {
        searchTerms: [
            'lorem',
            'official',
            'dolore',
            'dolor',
            'irure dolor',
            'qui officia deserunt',
        ],
        highlightStyles: HIGHLIGHT_STYLES,
        highlighterCoreOptions: {
            accuracy: 'exact',
            ignoreCase: true,
            ignoreDiacritics: true,
        },
        onComplete: (highlighter, result) => {
            console.log('highlighter', highlighter);
            console.log('result', result);
        },
        children: (
            <>
                <h1>Lorem ipsum dolor sit amet</h1>
                <p>
                    Lorem ipsum dolor sit amet, eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                    id est laborum.
                </p>
            </>
        ),
    },
};
