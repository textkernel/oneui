import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Callout } from '@textkernel/oneui';

const meta: Meta<typeof Callout> = {
    title: 'Atoms/Callout',
    component: Callout,
};

export default meta;

type Story = StoryObj<typeof Callout>;

export const _Callout: Story = {
    args: {
        children:
            'Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
    },
    render: (args) => <Callout {...args} />,
};

export const LongText: Story = {
    name: 'Callout with more content',
    args: {
        children: (
            <>
                <h2 style={{ margin: 0 }}>Request failed</h2>
                <p>
                    Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
                    unknown printer took a galley of type and scrambled it to make a type specimen
                    specimen book.
                </p>
                <p>
                    Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
                    unknown printer took a galley of type and scrambled it to make a type specimen
                    Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
                    unknown printer took a galley of type and scrambled it to make a type specimen
                    specimen book.
                </p>
                <p>
                    Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
                    unknown printer took a galley of type and scrambled it to make a type specimen
                    Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
                    unknown printer took a galley of type and scrambled it to make a type specimen
                    Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
                    unknown printer took a galley of type and scrambled it to make a type book.
                </p>
            </>
        ),
    },
    render: (args) => <Callout {...args} />,
};
