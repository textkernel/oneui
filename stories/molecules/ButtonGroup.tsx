import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Button, ButtonGroup } from '@textkernel/oneui';

export default {
    title: 'Molecules/ButtonGroup',
    component: ButtonGroup,
} as ComponentMeta<typeof ButtonGroup>;

export const _ButtonGroup = (args) => (
    <ButtonGroup {...args}>
        <Button
            href="#"
            onClick={(e) => {
                e.preventDefault();
            }}
        >
            Some
        </Button>
        <Button>Button</Button>
        <Button>Group</Button>
    </ButtonGroup>
);
_ButtonGroup.storyName = 'ButtonGroup';

export const SingleChild = (args) => (
    <ButtonGroup {...args}>
        <Button
            href="#"
            onClick={(e) => {
                e.preventDefault();
            }}
        >
            Some
        </Button>
    </ButtonGroup>
);
SingleChild.storyName = 'With single child';
