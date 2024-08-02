import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Option, Priority, SelectBadge } from '@textkernel/oneui';

const meta: Meta<typeof SelectBadge> = {
    title: 'Molecules/SelectBadge',
    component: SelectBadge,
};

export default meta;

type Story = StoryObj<typeof SelectBadge>;

const commonArgs = {
    children: 'London',
    option: { value: '15', label: '+15 km' },
    optionList: [
        { value: '5', label: '+5 km' },
        { value: '15', label: '+15 km' },
        { value: '25', label: '+25 km' },
    ],
    optionListHeader: 'Radius',
};

export const _SelectBadge: Story = {
    name: 'SelectBadge',
    args: {
        ...commonArgs,
        priority: 'mandatory',
        priorityLabels: {
            mandatory: 'Mandatory',
            important: 'Important',
            optional: 'Optional',
            exclude: 'Exclude',
        },
    },
    render: (args) => {
        const [priority, setPriority] = React.useState<Priority>(args.priority);
        const [selectedOption, setSelectedOption] = React.useState(args.option);

        React.useEffect(() => {
            setPriority(args.priority);
        }, [args.priority]);

        React.useEffect(() => {
            setSelectedOption(args.option);
        }, [args.option]);

        const handlePriorityChange = (newPriority: Priority) => {
            setPriority(newPriority);
        };

        const handleOptionChange = (newOption: Option) => {
            setSelectedOption(newOption);
        };

        const handleClose = () => {
            console.log('SelectBadge closed');
        };

        return (
            <div style={{ width: '200px' }}>
                <SelectBadge
                    {...args}
                    priority={priority}
                    option={selectedOption}
                    onPriorityChange={handlePriorityChange}
                    onChange={handleOptionChange}
                    onClose={handleClose}
                >
                    {args.children}
                </SelectBadge>
            </div>
        );
    },
};

export const SelectBadgeWithoutPriorityButton: Story = {
    name: 'SelectBadge - No Priority Control',
    args: {
        ...commonArgs,
        onPriorityChange: undefined,
    },
    render: (args) => {
        const [selectedOption, setSelectedOption] = React.useState(args.option);

        React.useEffect(() => {
            setSelectedOption(args.option);
        }, [args.option]);

        const handleOptionChange = React.useCallback((newOption: Option) => {
            setSelectedOption(newOption);
        }, []);

        const handleClose = () => {
            console.log('SelectBadge closed');
        };

        return (
            <div style={{ width: '200px' }}>
                <SelectBadge
                    {...args}
                    option={selectedOption}
                    onChange={handleOptionChange}
                    onClose={handleClose}
                >
                    {args.children}
                </SelectBadge>
            </div>
        );
    },
};

export const SelectBadgeWithoutOptions: Story = {
    name: 'SelectBadge - No Options',
    args: {
        ...commonArgs,
        onChange: undefined,
        option: undefined,
        optionList: undefined,
        priority: 'mandatory',
        priorityLabels: {
            mandatory: 'Mandatory',
            important: 'Important',
            optional: 'Optional',
            exclude: 'Exclude',
        },
    },
    render: (args) => {
        const [priority, setPriority] = React.useState<Priority>(args.priority);

        React.useEffect(() => {
            setPriority(args.priority);
        }, [args.priority]);

        const handlePriorityChange = React.useCallback((newPriority: Priority) => {
            setPriority(newPriority);
        }, []);

        const handleClose = () => {
            console.log('SelectBadge closed');
        };

        return (
            <div style={{ width: '200px' }}>
                <SelectBadge
                    {...args}
                    priority={priority}
                    onPriorityChange={handlePriorityChange}
                    onClose={handleClose}
                >
                    {args.children}
                </SelectBadge>
            </div>
        );
    },
};

export const SelectBadgeWithoutCloseButton: Story = {
    name: 'SelectBadge - No Close Functionality',
    args: {
        ...commonArgs,
        priority: 'mandatory',
        priorityLabels: {
            mandatory: 'Mandatory',
            important: 'Important',
            optional: 'Optional',
            exclude: 'Exclude',
        },
        onClose: undefined,
    },
    render: (args) => {
        const [priority, setPriority] = React.useState<Priority>(args.priority);
        const [selectedOption, setSelectedOption] = React.useState(args.option);

        React.useEffect(() => {
            setPriority(args.priority);
        }, [args.priority]);

        React.useEffect(() => {
            setSelectedOption(args.option);
        }, [args.option]);

        const handlePriorityChange = React.useCallback((newPriority: Priority) => {
            setPriority(newPriority);
        }, []);

        const handleOptionChange = React.useCallback((newOption: Option) => {
            setSelectedOption(newOption);
        }, []);

        return (
            <div style={{ width: '200px' }}>
                <SelectBadge
                    {...args}
                    priority={priority}
                    option={selectedOption}
                    onPriorityChange={handlePriorityChange}
                    onChange={handleOptionChange}
                >
                    {args.children}
                </SelectBadge>
            </div>
        );
    },
};
