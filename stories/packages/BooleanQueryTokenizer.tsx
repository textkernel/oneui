import * as React from 'react';
import { storiesOf } from '@storybook/react';
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

storiesOf('packages|BooleanQueryTokenizer', module).add('BooleanQueryTokenizer', () => {
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
                    context="brand"
                    defaultValue={initialValue}
                    disabled={false}
                    isBlock
                    onChange={tokenizeBooleanQuery}
                    placeholder="Enter a boolean query..."
                    size="normal"
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
});
