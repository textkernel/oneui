import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, withKnobs } from '@storybook/addon-knobs';
import { FieldWithValidation, Input, TextArea } from '@textkernel/oneui';

const Example = () => {
    const [inputValue, setValue] = React.useState('');
    const [errMsg, setErrMsg] = React.useState<string>();
    // eslint-disable-next-line no-useless-escape
    const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    React.useEffect(() => {
        if (!inputValue) {
            setErrMsg(undefined);
            // setErrMsg('This field is required');
        } else {
            setErrMsg(
                inputValue.match(EMAIL_REGEX) ? undefined : 'This is not a valid email address'
            );
        }
    }, [inputValue, EMAIL_REGEX]);

    return (
        <div style={{ marginBottom: '10px' }}>
            <FieldWithValidation errorMessage={errMsg} useTooltip>
                <Input
                    value={inputValue}
                    onChange={e => {
                        const { value } = e.target;
                        setValue(value);
                    }}
                />
            </FieldWithValidation>
        </div>
    );
};

storiesOf('Molecules|FieldWithValidation', module)
    .addDecorator(withKnobs)
    .add('FieldWithValidation', () => (
        <>
            <div style={{ marginBottom: '10px' }}>
                <FieldWithValidation
                    errorMessage={text('Error message for input field', 'Something wrong')}
                    useTooltip={boolean('Use tooltip for input field', false)}
                >
                    <Input />
                </FieldWithValidation>
            </div>
            <div>
                <FieldWithValidation
                    errorMessage={text('Error message for text field', '')}
                    useTooltip={boolean('Use tooltip for text field', false)}
                >
                    <TextArea />
                </FieldWithValidation>
            </div>
        </>
    ))
    .add('Example implementation', () => <Example />)
    .add('test', () => {
        const FlexExample = () => {
            const [fields, setFields] = React.useState([1]);

            return (
                <div>
                    {fields.map(() => (
                        <Example />
                    ))}
                    <button onClick={() => setFields([...fields, fields.length])}>Add more</button>
                </div>
            );
        };

        return <FlexExample />;
    });
