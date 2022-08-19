import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, withKnobs } from '@storybook/addon-knobs';
import { FieldWithValidation, Input, TextArea } from '@textkernel/oneui';

const Example = () => {
    const [inputValue, setValue] = React.useState('');
    const [errMsg, setErrMsg] = React.useState<string>();
    const EMAIL_REGEX =
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    React.useEffect(() => {
        if (!inputValue) {
            setErrMsg('This field is required');
        } else {
            setErrMsg(
                inputValue.match(EMAIL_REGEX) ? undefined : 'This is not a valid email address'
            );
        }
    }, [inputValue, EMAIL_REGEX]);

    return (
        <div style={{ marginBottom: '10px' }}>
            <FieldWithValidation
                errorMessage={errMsg}
                useTooltip={boolean('Use tooltip for input field', false)}
            >
                <Input
                    value={inputValue}
                    onChange={(e) => {
                        const { value } = e.target;
                        setValue(value);
                    }}
                />
            </FieldWithValidation>
        </div>
    );
};

storiesOf('Molecules/FieldWithValidation', module)
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
    .add('Example implementation', () => <Example />);
