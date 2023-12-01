import * as React from 'react';
import {
    Heading,
    IconBase,
    IconExtract,
    IconHarvester,
    IconJobfeed,
    IconMatch,
    IconSearch,
    IconSourcebox,
    IconTextkernel,
    LogoTextkernel,
} from '@textkernel/oneui';
import type { Meta, StoryObj } from '@storybook/react';
import { HEADING_SIZES } from '../../src/constants';

const meta: Meta<typeof IconBase> = {
    title: 'Atoms/Icon',
    component: IconBase,
};

export default meta;

type Story = StoryObj<typeof IconBase>;

export const AlignWithText: Story = {
    name: 'Align with text',
    args: {
        margin: 'right',
    },
    render: (args) => (
        <Heading level={HEADING_SIZES[0]}>
            <IconSearch {...args} />
            Some heading
        </Heading>
    ),
};

export const ExtractIcon: Story = {
    name: 'Extract! icon',
    args: {
        title: 'Extract',
    },
    render: (args) => <IconExtract {...args} />,
};

export const HarvesterIcon: Story = {
    name: 'Harvester icon',
    args: {
        title: 'Harvester',
    },
    render: (args) => <IconHarvester {...args} />,
};

export const JobfeedIcon: Story = {
    name: 'Jobfeed icon',
    args: {
        title: 'Jobfeed',
    },
    render: (args) => <IconJobfeed {...args} />,
};

export const MatchIcon: Story = {
    name: 'Match! icon',
    args: {
        title: 'Match!',
    },
    render: (args) => <IconMatch {...args} />,
};

export const SearchIcon: Story = {
    name: 'Search! icon',
    args: {
        title: 'Search!',
    },
    render: (args) => <IconSearch {...args} />,
};

export const SourceboxIcon: Story = {
    name: 'Sourcebox icon',
    args: {
        title: 'Sourcebox!',
    },
    render: (args) => <IconSourcebox {...args} />,
};

export const TextkernelIcon: Story = {
    name: 'Textkernel icon',
    args: {
        title: 'Textkernel',
    },
    render: (args) => <IconTextkernel {...args} />,
};

export const TextkernelLogo: Story = {
    name: 'Textkernel logo',
    args: {
        title: 'Textkernel logo',
    },
    render: (args) => <LogoTextkernel {...args} />,
};
