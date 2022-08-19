import * as React from 'react';
import { FieldWithValidation, Input, TextArea, FieldWithValidationProps } from '@textkernel/oneui';

export default {
    title: 'Molecules/FieldWithValidation',
    component: FieldWithValidation,
};

export const _FieldWithValidation = ({ errorMessage2, useTootip2, ...args }) => (
    <>
        <div style={{ marginBottom: '10px' }}>
            <FieldWithValidation {...(args as FieldWithValidationProps)} />
        </div>
        <div>
            <FieldWithValidation errorMessage={errorMessage2} useTooltip={useTootip2}>
                <TextArea />
            </FieldWithValidation>
        </div>
    </>
);
_FieldWithValidation.args = {
    errorMessage: 'Error message',
    useTooltip: false,
    children: <Input />,
    errorMessage2: '',
    useTootip2: false,
};

export const Example = (args) => {
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
            <FieldWithValidation errorMessage={errMsg} useTooltip={args.useTooltip}>
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
Example.args = {
    useTooltip: false,
};
