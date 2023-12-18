import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PageWidthRestrictor, BlockWidthRestrictor } from '@textkernel/oneui';

const meta: Meta<typeof PageWidthRestrictor> = {
    title: 'Atoms/WidthRestrictor',
    component: PageWidthRestrictor,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subcomponents: { BlockWidthRestrictor } as any,
};

export default meta;

type Story = StoryObj<typeof PageWidthRestrictor>;

export const _PageWidthRestrictor: Story = {
    name: 'PageWidthRestrictor',
    args: {
        style: { backgroundColor: 'darkturquoise' },
        children: 'This is a placeholder for children',
    },
    render: (args) => (
        <div style={{ backgroundColor: 'teal' }}>
            <PageWidthRestrictor {...args} />
        </div>
    ),
};

type BlockWidthRestrictorStory = StoryObj<typeof BlockWidthRestrictor>;

export const _BlockWidthRestrictor: BlockWidthRestrictorStory = {
    name: 'BlockWidthRestrictor',
    args: {
        As: 'div',
        style: { backgroundColor: 'darkturquoise' },
        children: 'This is a placeholder for children',
    },
    render: (args) => (
        <div style={{ backgroundColor: 'teal' }}>
            <BlockWidthRestrictor {...args} />
        </div>
    ),
};
