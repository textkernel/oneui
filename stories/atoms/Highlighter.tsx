import * as React from 'react';
import { StringHighlighter, ReactElementHighlighter } from '@textkernel/oneui';

const HIGHLIGHT_STYLES = {
    backgroundColor: 'lightyellow',
} as CSSStyleDeclaration;

export default {
    title: 'Atoms/Highlighter',
    component: StringHighlighter,
    subcomponents: { ReactElementHighlighter },
    argTypes: {
        accuracy: { options: ['exact', 'partial'], control: 'inline-radio' },
    },
};

export const _StringHighlighter = (args) => (
    <StringHighlighter
        {...args}
        searchTerms={args.keywords.split('|').filter((i) => i !== '')}
        highlighterCoreOptions={{
            accuracy: args.accuracy,
            ignoreCase: args.ignoreCase,
            ignoreDiacritics: args.ignoreDiacritics,
        }}
    />
);
_StringHighlighter.args = {
    keywords: 'javascript developer|php|java',
    string: 'We are looking for php, java and javascript developer',
    accuracy: 'partial',
    ignoreCase: true,
    ignoreDiacritics: true,
    highlightRenderer: ({ substring, ...substringProps }) => (
        <b {...substringProps} style={{ backgroundColor: 'lightyellow' }}>
            {substring}
        </b>
    ),
};

export const _ReactElementHighlighter = (args) => {
    const words = args.keywords.split('|').filter((i) => i !== '');

    return (
        <ReactElementHighlighter
            {...args}
            key={`${words}${args.isCustomStylesUsed}`}
            searchTerms={words}
            highlightStyles={args.isCustomStylesUsed ? HIGHLIGHT_STYLES : undefined}
            highlighterCoreOptions={{
                accuracy: args.accuracy,
                ignoreCase: args.ignoreCase,
                ignoreDiacritics: args.ignoreDiacritics,
            }}
        />
    );
};
_ReactElementHighlighter.args = {
    keywords: 'lorem|officia|dolore|dolor|irure dolor|qui officia deserunt',
    isCustomStylesUsed: false,
    accuracy: 'exact',
    ignoreCase: true,
    ignoreDiacritics: true,
    onComplete: (highlighter, result) => {
        console.log('highlighter', highlighter);
        console.log('result', result);
    },
    children: (
        <>
            <h1>Lorem ipsum dolor sit amet</h1>
            <p>
                Lorem ipsum dolor sit amet, eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </>
    ),
};
