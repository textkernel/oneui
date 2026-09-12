import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FieldWithValidation, Input, TextArea, FieldWithValidationProps } from '@textkernel/oneui';

const meta: Meta<typeof FieldWithValidation> = {
    title: 'Molecules/FieldWithValidation',
    component: FieldWithValidation,
};

export default meta;

type SecondComponentProps = {
    errorMessage2: string;
    useTootip2: boolean;
};

type Story = StoryObj<typeof FieldWithValidation | SecondComponentProps>;

export const _FieldWithValidation: Story = {
    name: 'FieldWithValidation',
    args: {
        errorMessage: 'Error message',
        useTooltip: false,
        children: <Input />,
        errorMessage2: '',
        useTootip2: false,
    },
    render: ({ errorMessage2, useTootip2, ...args }) => (
        <>
            <div style={{ marginBottom: '10px' }}>
                <FieldWithValidation {...(args as FieldWithValidationProps)} />
            </div>
            <div>
                <FieldWithValidation errorMessage={errorMessage2} useTooltip={useTootip2}>
                    <TextArea label="FieldWithValidation" />
                </FieldWithValidation>
            </div>
        </>
    ),
};

export const Example: Story = {
    name: 'Email validation',
    args: {
        useTootip2: false,
    },
    render: ({ errorMessage2, useTootip2, ...args }) => {
        const [inputValue, setValue] = React.useState('');
        const [errMsg, setErrMsg] = React.useState<string>();

        React.useEffect(() => {
            const EMAIL_REGEX =
                // eslint-disable-next-line no-useless-escape
                /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

            if (!inputValue) {
                setErrMsg('This field is required');
            } else {
                setErrMsg(
                    inputValue.match(EMAIL_REGEX) ? undefined : 'This is not a valid email address'
                );
            }
        }, [inputValue]);

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
    },
};
