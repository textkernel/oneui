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
