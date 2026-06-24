import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ActionIsland, Button } from '@textkernel/oneui';

const meta: Meta<typeof ActionIsland> = {
    title: 'Organisms/ActionIsland',
    component: ActionIsland,
};

export default meta;

type Story = StoryObj<typeof ActionIsland>;

export const _ActionIsland: Story = {
    name: 'ActionIsland',
    args: {
        label: 'candidates selected',
        size: '10',
        actionButtons: [
            { label: 'Share', onClick: () => console.log('Share clicked') },
            {
                label: 'Export',
                dropdownItems: [
                    { label: 'Export as PDF', onClick: () => console.log('Export PDF clicked') },
                    { label: 'Export as CSV', onClick: () => console.log('Export CSV clicked') },
                ],
                isGroup: true,
                isGroupDisabled: true,
                tooltipContent: 'Export',
            },
            {
                label: 'ATS Actions',
                isGroup: true,
                dropdownItems: [
                    { label: 'Candidate overview', onClick: () => console.log('Overview clicked') },
                    { label: 'Email candidate', onClick: () => console.log('Email clicked') },
                ],
            },
            {
                label: 'Textkernel Actions',
                isGroup: true,
                dropdownItems: [
                    { label: 'Action 1', onClick: () => console.log('Action 1 clicked') },
                    { label: 'Action 2', onClick: () => console.log('Action 2 clicked') },
                ],
            },
        ],
        moreButtonLabel: 'More',
        closeButtonTooltip: 'Close',
    },

    render: (args) => {
        const [isShown, setIsShown] = React.useState(false);

        const handleOnClose = () => {
            setIsShown(false);
            console.log('OnClose was called');
        };

        return (
            <>
                <Button onClick={() => setIsShown(true)}>Show the action island</Button>
                <ActionIsland {...args} isShown={isShown} onClose={handleOnClose} />
            </>
        );
    },
};
