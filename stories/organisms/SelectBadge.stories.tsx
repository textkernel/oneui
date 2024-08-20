import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SelectBadge, SelectBadgePriorityItem, SelectBadgeProps } from '@textkernel/oneui';

const meta: Meta<typeof SelectBadge> = {
    title: 'Organisms/SelectBadge',
    component: SelectBadge,
};

export default meta;

type Story = StoryObj<typeof SelectBadge<string, string>>;

const commonArgs: Partial<SelectBadgeProps<string, string>> = {
    children: 'London',
    option: '5',
    optionList: ['5', '10', '15', '25'],
    optionListHeader: 'Radius',
};

const priorityItems: Array<SelectBadgePriorityItem<string>> = [
    { priority: 'mandatory', label: 'Mandatory', value: 'required' },
    { priority: 'important', label: 'Important', value: 'strongly_favored' },
    { priority: 'optional', label: 'Optional', value: 'favored' },
    { priority: 'exclude', label: 'Exclude', value: 'banned' },
];

export const _SelectBadge: Story = {
    name: 'SelectBadge',
    args: {
        ...commonArgs,
        option: undefined,
        priorityItem: { priority: 'mandatory', label: 'Mandatory', value: 'required' },
        priorityItems,
    },
    render: (args) => {
        const [selectedPriorityItem, setSelectedPriorityItem] = React.useState<
            SelectBadgePriorityItem<string> | undefined
        >(args.priorityItem);
        const [selectedOption, setSelectedOption] = React.useState(args.option);

        React.useEffect(() => {
            setSelectedPriorityItem(selectedPriorityItem);
        }, [selectedPriorityItem]);

        React.useEffect(() => {
            setSelectedOption(selectedOption);
        }, [selectedOption]);

        const optionToLabel = (option) => option && `+${option}`;

        const handlePriorityChange = (newPriorityItem: SelectBadgePriorityItem<string>) => {
            setSelectedPriorityItem(newPriorityItem);

            console.log(`Priority changed to ${newPriorityItem.priority}`);
        };

        const handleOptionChange = (newOption: string) => {
            setSelectedOption(newOption);

            console.log(`Option changed to ${newOption}`);
        };

        const handleDelete = () => {
            console.log('SelectBadge deleted');
        };

        return (
            <div style={{ width: '200px' }}>
                <SelectBadge
                    {...args}
                    priorityItem={selectedPriorityItem}
                    option={selectedOption}
                    optionToLabel={optionToLabel}
                    onPriorityChange={handlePriorityChange}
                    onChange={handleOptionChange}
                    onDelete={handleDelete}
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

        const optionToLabel = (option) => option && `+${option}`;

        const handleOptionChange = React.useCallback((newOption: string) => {
            setSelectedOption(newOption);

            console.log(`Option changed to ${newOption}`);
        }, []);

        const handleDelete = () => {
            console.log('SelectBadge deleted');
        };

        return (
            <div style={{ width: '200px' }}>
                <SelectBadge
                    {...args}
                    option={selectedOption}
                    onChange={handleOptionChange}
                    onDelete={handleDelete}
                    optionToLabel={optionToLabel}
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
        priorityItem: { priority: 'mandatory', label: 'Mandatory', value: 'required' },
        priorityItems,
    },
    render: (args) => {
        const [selectedPriorityItem, setSelectedPriorityItem] = React.useState<
            SelectBadgePriorityItem<string> | undefined
        >(args.priorityItem);

        React.useEffect(() => {
            setSelectedPriorityItem(args.priorityItem);
        }, [args.priorityItem]);

        const handlePriorityChange = (newPriorityItem: SelectBadgePriorityItem<string>) => {
            setSelectedPriorityItem(newPriorityItem);

            console.log(`Priority changed to ${newPriorityItem}`);
        };

        const handleDelete = () => {
            console.log('SelectBadge deleted');
        };

        return (
            <div style={{ width: '200px' }}>
                <SelectBadge
                    {...args}
                    priorityItem={selectedPriorityItem}
                    onPriorityChange={handlePriorityChange}
                    onDelete={handleDelete}
                >
                    {args.children}
                </SelectBadge>
            </div>
        );
    },
};

export const SelectBadgeWithoutCloseButton: Story = {
    name: 'SelectBadge - No Delete Functionality',
    args: {
        ...commonArgs,
        priorityItem: { priority: 'mandatory', label: 'Mandatory', value: 'required' },
        priorityItems,
        onDelete: undefined,
    },
    render: (args) => {
        const [selectedPriorityItem, setSelectedPriorityItem] = React.useState<
            SelectBadgePriorityItem<string> | undefined
        >(args.priorityItem);
        const [selectedOption, setSelectedOption] = React.useState(args.option);

        React.useEffect(() => {
            setSelectedPriorityItem(args.priorityItem);
        }, [args.priorityItem]);

        React.useEffect(() => {
            setSelectedOption(args.option);
        }, [args.option]);

        const optionToLabel = (option) => option && `+${option}`;

        const handlePriorityChange = (newPriorityItem: SelectBadgePriorityItem<string>) => {
            setSelectedPriorityItem(newPriorityItem);

            console.log(`Priority changed to ${newPriorityItem}`);
        };

        const handleOptionChange = (newOption: string) => {
            setSelectedOption(newOption);

            console.log(`Option changed to ${newOption}`);
        };

        return (
            <div style={{ width: '200px' }}>
                <SelectBadge
                    {...args}
                    priorityItem={selectedPriorityItem}
                    option={selectedOption}
                    optionToLabel={optionToLabel}
                    onPriorityChange={handlePriorityChange}
                    onChange={handleOptionChange}
                >
                    {args.children}
                </SelectBadge>
            </div>
        );
    },
};
