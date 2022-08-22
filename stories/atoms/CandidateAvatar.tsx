import * as React from 'react';
import { CandidateAvatar } from '@textkernel/oneui';

export default {
    title: 'Atoms/CandidateAvatar',
    component: CandidateAvatar,
};

export const _CandidateAvatar = (args) => <CandidateAvatar {...args} />;
_CandidateAvatar.storyName = 'CandidateAvatar';
_CandidateAvatar.args = {
    imageUrl: 'avatar.png',
    matchPercentage: 75,
    showPercentageOnHover: true,
};
