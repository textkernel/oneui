import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BooleanQueryTokenizer, TextArea } from '@textkernel/oneui';

const initialValue =
    '-php AND +c++ +--+ -\n' +
    'java* NOT *script\n' +
    'NEAR (rust OR tex*nel) OR\n' +
    '-.NET "TO BE OR NOT TO BE"';

const columnStyle = {
    width: '30%',
    padding: '1em',
};

const booleanQueryTokenizer = new BooleanQueryTokenizer();

const meta: Meta<typeof booleanQueryTokenizer> = {
    title: 'packages/BooleanQueryTokenizer',
};

export default meta;

type Story = StoryObj<typeof booleanQueryTokenizer>;

export const _BooleanQueryTokenizer: Story = {
    name: 'BooleanQueryTokenizer',
    args: {},
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [tokens, setTokens] = React.useState<unknown[]>(
            booleanQueryTokenizer.tokenize(initialValue)
        );
        const [wordsAndPhrases, setWordsAndPhrases] = React.useState(
            booleanQueryTokenizer.extractWords(initialValue)
        );
        const tokenizeBooleanQuery = (event) => {
            const { value } = event.target;
            setTokens(booleanQueryTokenizer.tokenize(value));
            setWordsAndPhrases(booleanQueryTokenizer.extractWords(value));
        };
        return (
            <div style={{ display: 'flex' }}>
                <div style={columnStyle}>
                    <h3>Boolean query</h3>
                    <TextArea
                        defaultValue={initialValue}
                        disabled={false}
                        onChange={tokenizeBooleanQuery}
                        placeholder="Enter a boolean query..."
                        label="Query"
                        style={{
                            resize: 'vertical',
                            height: '100%',
                        }}
                    />
                </div>
                <div style={columnStyle}>
                    <h3>Words and phrases</h3>
                    <pre>{JSON.stringify(wordsAndPhrases.wordsAndPhrases, null, 4)}</pre>
                </div>
                <div style={columnStyle}>
                    <h3>Tokens</h3>
                    <pre>{JSON.stringify(tokens, null, 4)}</pre>
                </div>
            </div>
        );
    },
};
