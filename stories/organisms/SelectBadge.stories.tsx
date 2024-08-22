import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SelectBadge, SelectBadgePriorityItem } from '@textkernel/oneui';

const meta: Meta<typeof SelectBadge> = {
    title: 'Organisms/SelectBadge',
    component: SelectBadge,
};

export default meta;

type Story = StoryObj<typeof SelectBadge<string, string>>;

const priorityList: Array<SelectBadgePriorityItem<string>> = [
    { priority: 'mandatory', label: 'Mandatory', value: 'required' },
    { priority: 'important', label: 'Important', value: 'strongly_favored' },
    { priority: 'optional', label: 'Optional', value: 'favored' },
    { priority: 'exclude', label: 'Exclude', value: 'banned' },
];

export const _SelectBadge: Story = {
    name: 'SelectBadge',
    args: {
        children: 'London',
        priority: {
            list: priorityList,
            buttonLabel: 'Priority',
            onChange: () => {},
            selectedItem: undefined,
        },
        option: {
            selectedItem: undefined,
            list: ['5', '10', '15', '25'],
            listHeader: 'Radius',
            buttonLabel: 'Option button',
            toLabel: (option: string) => `+${option}`,
        },
    },
    render: (args) => {
        const [selectedPriorityItem, setSelectedPriorityItem] = React.useState<
            SelectBadgePriorityItem<string> | undefined
        >(args.priority?.selectedItem);
        const [selectedOptionItem, setSelectedOptionItem] = React.useState(
            args.option?.selectedItem
        );

        React.useEffect(() => {
            setSelectedPriorityItem(selectedPriorityItem);
        }, [selectedPriorityItem]);

        React.useEffect(() => {
            setSelectedOptionItem(selectedOptionItem);
        }, [selectedOptionItem]);

        const handlePriorityChange = (newPriorityItem: SelectBadgePriorityItem<string>) => {
            setSelectedPriorityItem(newPriorityItem);
            console.log(`Priority changed to ${newPriorityItem.priority}`);
        };

        const handleOptionChange = (newOptionItem: string) => {
            setSelectedOptionItem(newOptionItem);
            console.log(`Option changed to ${newOptionItem}`);
        };

        const handleDelete = () => {
            console.log('SelectBadge deleted');
        };

        return (
            <div style={{ width: '200px' }}>
                <SelectBadge
                    {...args}
                    priority={
                        args.priority && {
                            ...args.priority,
                            selectedItem: selectedPriorityItem,
                            onChange: handlePriorityChange,
                        }
                    }
                    option={
                        args.option && {
                            ...args.option,
                            selectedItem: selectedOptionItem,
                            onChange: handleOptionChange,
                        }
                    }
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
        children: 'London',
        priority: undefined,
        option: {
            selectedItem: '5',
            list: ['5', '10', '15', '25'],
            listHeader: 'Radius',
            buttonLabel: 'Option button',
            toLabel: (option: string) => `+${option}`,
        },
    },
    render: (args) => {
        const [selectedOptionItem, setSelectedOptionItem] = React.useState(
            args.option?.selectedItem
        );

        React.useEffect(() => {
            setSelectedOptionItem(selectedOptionItem);
        }, [selectedOptionItem]);

        const handleOptionChange = (newOptionItem: string) => {
            setSelectedOptionItem(newOptionItem);
            console.log(`Option changed to ${newOptionItem}`);
        };

        const handleDelete = () => {
            console.log('SelectBadge deleted');
        };

        return (
            <div style={{ width: '200px' }}>
                <SelectBadge
                    {...args}
                    option={
                        args.option && {
                            ...args.option,
                            selectedItem: selectedOptionItem,
                            onChange: handleOptionChange,
                        }
                    }
                    onDelete={handleDelete}
                >
                    {args.children}
                </SelectBadge>
            </div>
        );
    },
};

export const SelectBadgeWithoutOptions: Story = {
    name: 'SelectBadge - No Options Control',
    args: {
        children: 'London',
        priority: {
            list: priorityList,
            buttonLabel: 'Priority button',
            onChange: () => {},
            selectedItem: { priority: 'mandatory', label: 'Mandatory', value: 'required' },
        },
        option: {
            selectedItem: '5',
            buttonLabel: 'Option button',
            toLabel: (option: string) => `+${option}`,
        },
    },
    render: (args) => {
        const [selectedPriorityItem, setSelectedPriorityItem] = React.useState<
            SelectBadgePriorityItem<string> | undefined
        >(args.priority?.selectedItem);

        React.useEffect(() => {
            setSelectedPriorityItem(selectedPriorityItem);
        }, [selectedPriorityItem]);

        const handlePriorityChange = (newPriorityItem: SelectBadgePriorityItem<string>) => {
            setSelectedPriorityItem(newPriorityItem);
            console.log(`Priority changed to ${newPriorityItem.priority}`);
        };

        const handleDelete = () => {
            console.log('SelectBadge deleted');
        };

        return (
            <div style={{ width: '200px' }}>
                <SelectBadge
                    {...args}
                    priority={
                        args.priority && {
                            ...args.priority,
                            selectedItem: selectedPriorityItem,
                            onChange: handlePriorityChange,
                        }
                    }
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
        children: 'London',
        priority: {
            list: priorityList,
            buttonLabel: 'Priority button',
            onChange: () => {},
            selectedItem: { priority: 'mandatory', label: 'Mandatory', value: 'required' },
        },
        option: {
            selectedItem: '5',
            list: ['5', '10', '15', '25'],
            listHeader: 'Radius',
            buttonLabel: 'Option button',
            toLabel: (option: string) => `+${option}`,
        },
        onDelete: undefined,
    },
    render: (args) => {
        const [selectedPriorityItem, setSelectedPriorityItem] = React.useState<
            SelectBadgePriorityItem<string> | undefined
        >(args.priority?.selectedItem);
        const [selectedOptionItem, setSelectedOptionItem] = React.useState(
            args.option?.selectedItem
        );

        React.useEffect(() => {
            setSelectedPriorityItem(selectedPriorityItem);
        }, [selectedPriorityItem]);

        React.useEffect(() => {
            setSelectedOptionItem(selectedOptionItem);
        }, [selectedOptionItem]);

        const handlePriorityChange = (newPriorityItem: SelectBadgePriorityItem<string>) => {
            setSelectedPriorityItem(newPriorityItem);
            console.log(`Priority changed to ${newPriorityItem.priority}`);
        };

        const handleOptionChange = (newOptionItem: string) => {
            setSelectedOptionItem(newOptionItem);
            console.log(`Option changed to ${newOptionItem}`);
        };

        return (
            <div style={{ width: '200px' }}>
                <SelectBadge
                    {...args}
                    priority={
                        args.priority && {
                            ...args.priority,
                            selectedItem: selectedPriorityItem,
                            onChange: handlePriorityChange,
                        }
                    }
                    option={
                        args.option && {
                            ...args.option,
                            selectedItem: selectedOptionItem,
                            onChange: handleOptionChange,
                        }
                    }
                >
                    {args.children}
                </SelectBadge>
            </div>
        );
    },
};
