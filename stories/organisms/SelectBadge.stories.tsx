import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SelectBadge, SelectBadgePriorityItem } from '@textkernel/oneui';

const meta: Meta<typeof SelectBadge> = {
    title: 'Organisms/SelectBadge',
    component: SelectBadge,
};

export default meta;

type Story = StoryObj<typeof SelectBadge<string, string>>;

const priorityItemList: Array<SelectBadgePriorityItem<string>> = [
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
            priorityItemList,
            priorityButtonLabel: 'Priority',
            onPriorityItemChange: () => {},
            priorityItem: undefined,
        },
        option: {
            optionItem: undefined,
            optionItemList: ['5', '10', '15', '25'],
            optionItemListHeader: 'Radius',
            optionButtonLabel: 'Option button',
            optionToLabel: (option: string) => `+${option}`,
        },
    },
    render: (args) => {
        const [selectedPriorityItem, setSelectedPriorityItem] = React.useState<
            SelectBadgePriorityItem<string> | undefined
        >(args.priority?.priorityItem);
        const [selectedOptionItem, setSelectedOptionItem] = React.useState(args.option?.optionItem);

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
                            priorityItem: selectedPriorityItem,
                            onPriorityItemChange: handlePriorityChange,
                        }
                    }
                    option={
                        args.option && {
                            ...args.option,
                            optionItem: selectedOptionItem,
                            onOptionItemChange: handleOptionChange,
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
            optionItem: '555',
            optionItemList: ['5', '10', '15', '25'],
            optionItemListHeader: 'Radius',
            optionButtonLabel: 'Option button',
            optionToLabel: (option: string) => `+${option}`,
        },
    },
    render: (args) => {
        const [selectedOptionItem, setSelectedOptionItem] = React.useState(args.option?.optionItem);

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
                            optionItem: selectedOptionItem,
                            onOptionItemChange: handleOptionChange,
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
            priorityItemList,
            priorityButtonLabel: 'Priority button',
            onPriorityItemChange: () => {},
            priorityItem: { priority: 'mandatory', label: 'Mandatory', value: 'required' },
        },
        option: {
            optionItem: '5',
            optionButtonLabel: 'Option button',
            optionToLabel: (option: string) => `+${option}`,
        },
    },
    render: (args) => {
        const [selectedPriorityItem, setSelectedPriorityItem] = React.useState<
            SelectBadgePriorityItem<string> | undefined
        >(args.priority?.priorityItem);

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
                            priorityItem: selectedPriorityItem,
                            onPriorityItemChange: handlePriorityChange,
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
            priorityItemList,
            priorityButtonLabel: 'Priority button',
            onPriorityItemChange: () => {},
            priorityItem: { priority: 'mandatory', label: 'Mandatory', value: 'required' },
        },
        option: {
            optionItem: '5',
            optionItemList: ['5', '10', '15', '25'],
            optionItemListHeader: 'Radius',
            optionButtonLabel: 'Option button',
            optionToLabel: (option: string) => `+${option}`,
        },
        onDelete: undefined,
    },
    render: (args) => {
        const [selectedPriorityItem, setSelectedPriorityItem] = React.useState<
            SelectBadgePriorityItem<string> | undefined
        >(args.priority?.priorityItem);
        const [selectedOptionItem, setSelectedOptionItem] = React.useState(args.option?.optionItem);

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
                        args.priority
                            ? {
                                  ...args.priority,
                                  priorityItem: selectedPriorityItem,
                                  onPriorityItemChange: handlePriorityChange,
                              }
                            : undefined
                    }
                    option={
                        args.option
                            ? {
                                  ...args.option,
                                  optionItem: selectedOptionItem,
                                  onOptionItemChange: handleOptionChange,
                              }
                            : undefined
                    }
                >
                    {args.children}
                </SelectBadge>
            </div>
        );
    },
};
