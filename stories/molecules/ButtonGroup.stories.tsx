import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonGroup } from '@textkernel/oneui';

const meta: Meta<typeof ButtonGroup> = {
    title: 'Molecules/ButtonGroup',
    component: ButtonGroup,
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const _ButtonGroup: Story = {
    name: 'ButtonGroup',
    render: (args) => (
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
    ),
};

export const SingleChild: Story = {
    name: 'With single child',
    render: (args) => (
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
    ),
};
