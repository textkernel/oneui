import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CandidateAvatar } from '@textkernel/oneui';

const meta: Meta<typeof CandidateAvatar> = {
    title: 'Atoms/CandidateAvatar',
    component: CandidateAvatar,
};

export default meta;

type Story = StoryObj<typeof CandidateAvatar>;

export const _CandidateAvatar: Story = {
    name: 'CandidateAvatar',
    args: {
        imageUrl: 'avatar.png',
        matchPercentage: 75,
        showPercentageOnHover: true,
    },
    render: (args) => <CandidateAvatar {...args} />,
};
