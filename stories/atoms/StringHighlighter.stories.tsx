import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StringHighlighter } from '@textkernel/oneui';

const meta: Meta<typeof StringHighlighter> = {
    title: 'Atoms/Highlighter',
    component: StringHighlighter,
    render: (args) => <StringHighlighter {...args} />,
    argTypes: {
        highlighterCoreOptions: {
            accuracy: { options: ['exact', 'partial'], control: 'inline-radio' },
        },
    },
};

export default meta;

type Story = StoryObj<typeof StringHighlighter>;

export const _StringHighlighter: Story = {
    name: 'StringHighlighter',
    args: {
        searchTerms: ['javascript developer', 'php', 'java'],
        string: 'We are looking for php, java and javascript developer',
        highlighterCoreOptions: {
            accuracy: 'partial',
            ignoreCase: true,
            ignoreDiacritics: true,
        },
        highlightRenderer: ({ substring, ...substringProps }) => (
            <b {...substringProps} style={{ backgroundColor: 'lightyellow' }}>
                {substring}
            </b>
        ),
    },
};
