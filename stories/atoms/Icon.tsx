import * as React from 'react';
import {
    Heading,
    IconExtract,
    IconHarvester,
    IconJobfeed,
    IconMatch,
    IconSearch,
    IconSourcebox,
    IconTextkernel,
    LogoTextkernel,
} from '@textkernel/oneui';
import { HEADING_SIZES } from '../../src/constants';

export default {
    title: 'Atoms/Icons',
    component: IconTextkernel,
};

export const AlignWithText = (args) => (
    <Heading level={HEADING_SIZES[0]}>
        <IconSearch {...args} />
        Some heading
    </Heading>
);
AlignWithText.storyName = 'Align with text';
AlignWithText.args = {
    margin: 'right',
};

export const ExtractIcon = (args) => <IconExtract {...args} />;
ExtractIcon.storyName = 'Extract! icon';
ExtractIcon.args = {
    title: 'Extract!',
};

export const HarvesterIcon = (args) => <IconHarvester {...args} />;
HarvesterIcon.storyName = 'Harvester icon';
HarvesterIcon.args = {
    title: 'Harvester',
};

export const JobfeedIcon = (args) => <IconJobfeed {...args} />;
JobfeedIcon.storyName = 'Jobfeed icon';
JobfeedIcon.args = {
    title: 'Jobfeed',
};

export const MatchIcon = (args) => <IconMatch {...args} />;
MatchIcon.storyName = 'Match! icon';
MatchIcon.args = {
    title: 'Match!',
};

export const SearchIcon = (args) => <IconSearch {...args} />;
SearchIcon.storyName = 'Search! icon';
SearchIcon.args = {
    title: 'Search!',
};

export const SourceboxIcon = (args) => <IconSourcebox {...args} />;
SourceboxIcon.storyName = 'Sourcebox icon';
SourceboxIcon.args = {
    title: 'Sourcebox',
};

export const TextkernelIcon = (args) => <IconTextkernel {...args} />;
TextkernelIcon.storyName = 'Textkernel icon';
TextkernelIcon.args = {
    title: 'Textkernel',
};

export const TextkernelLogo = (args) => <LogoTextkernel {...args} />;
TextkernelLogo.storyName = 'Textkernel logo';
TextkernelLogo.args = {
    title: 'Textkernel logo',
};
