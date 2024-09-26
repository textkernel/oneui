import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
    Checkbox,
    ListItem,
    SelectedItemBadge,
    SelectedItemBadgePriorityItem,
    SingleSelectItem,
    Text,
} from '@textkernel/oneui';

const meta: Meta<typeof SelectedItemBadge> = {
    title: 'Organisms/SelectedItemBadge',
    component: SelectedItemBadge,
};

export default meta;

type Story = StoryObj<typeof SelectedItemBadge<string, string>>;

const priorityList: Array<SelectedItemBadgePriorityItem<string>> = [
    { priority: 'mandatory', label: 'Mandatory', value: 'required' },
    { priority: 'important', label: 'Important', value: 'strongly_favored' },
    { priority: 'optional', label: 'Optional', value: 'favored' },
    { priority: 'exclude', label: 'Exclude', value: 'banned' },
];

const radiusList = ['5', '10', '15', '25'];

const synonyms = ['Java developer', 'Java engineer', 'Java Programmer', 'Java Architect'];

export const _SelectedItemBadge: Story = {
    name: 'SelectedItemBadge',
    args: {
        label: 'London',
        priority: {
            list: priorityList,
            buttonLabel: 'Priority',
            onChange: () => {},
            selectedItem: { priority: 'mandatory', label: 'Mandatory', value: 'required' },
        },
        buttonLabel: 'Select radius',
    },
    render: (args) => {
        const [selectedPriorityItem, setSelectedPriorityItem] = React.useState<
            SelectedItemBadgePriorityItem<string>
        >(
            args.priority?.selectedItem || {
                priority: 'mandatory',
                label: 'Mandatory',
                value: 'required',
            }
        );
        const [selectedRadius, setSelectedRadius] = React.useState<string>();

        React.useEffect(() => {
            setSelectedPriorityItem(selectedPriorityItem);
        }, [selectedPriorityItem]);

        React.useEffect(() => {
            setSelectedRadius(selectedRadius);
        }, [selectedRadius]);

        const handlePriorityChange = (newPriorityItem: SelectedItemBadgePriorityItem<string>) => {
            setSelectedPriorityItem(newPriorityItem);
            console.log(`Priority changed to ${newPriorityItem.priority}`);
        };

        const handleRadiusChange = (newRadius: string) => {
            setSelectedRadius(newRadius);
            console.log(`Option changed to ${newRadius}`);
        };

        const handleDelete = () => {
            console.log('SelectedItemBadge deleted');
        };

        return (
            <div style={{ width: '200px' }}>
                <SelectedItemBadge
                    {...args}
                    priority={
                        args.priority && {
                            ...args.priority,
                            selectedItem: selectedPriorityItem,
                            onChange: handlePriorityChange,
                        }
                    }
                    onDelete={handleDelete}
                    onChange={handleRadiusChange}
                    additionalLabel={selectedRadius && `+${selectedRadius} km`}
                >
                    <div
                        style={{
                            padding: 'var(--space-75) var(--space-75) var(--space-50)',
                            backgroundColor: 'var(--color-background-brand-subtlest-default)',
                            fontWeight: 'var(--font-weight-bold)',
                            color: 'var(--color-text-brand-default)',
                        }}
                    >
                        <Text inline title="Radius" size="small">
                            {'Radius'.toUpperCase()}
                        </Text>
                    </div>
                    {radiusList.map((radius) => (
                        <ListItem
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                gap: '8px',
                            }}
                            key={radius}
                            value={radius}
                        >
                            <Text inline size="small">
                                {radius}
                            </Text>
                        </ListItem>
                    ))}
                </SelectedItemBadge>
            </div>
        );
    },
};

export const _SelectedItemBadgeMultiSelect: Story = {
    name: 'SelectedItemBadge - With multiselect children',
    args: {
        label: 'Java',
        isMultiSelect: true,
        priority: {
            list: priorityList,
            buttonLabel: 'Priority',
            onChange: () => {},
            selectedItem: { priority: 'mandatory', label: 'Mandatory', value: 'required' },
        },
        buttonLabel: 'Select synonyms',
    },
    render: (args) => {
        const [selectedPriorityItem, setSelectedPriorityItem] = React.useState<
            SelectedItemBadgePriorityItem<string>
        >(
            args.priority?.selectedItem || {
                priority: 'mandatory',
                label: 'Mandatory',
                value: 'required',
            }
        );
        const [selectedSynonyms, setSelectedSynonyms] = React.useState<string[]>([]);

        const handleOnChange = (synonym: string) => {
            const index = selectedSynonyms.indexOf(synonym);

            if (index > -1) {
                setSelectedSynonyms([
                    ...selectedSynonyms.slice(0, index),
                    ...selectedSynonyms.slice(index + 1),
                ]);
                console.log(`${synonym} removed from the list of synonyms.`);
            } else {
                setSelectedSynonyms([...selectedSynonyms, synonym]);
                console.log(`${synonym} added to the list of synonyms`);
            }
        };

        React.useEffect(() => {
            setSelectedPriorityItem(selectedPriorityItem);
        }, [selectedPriorityItem]);

        const handlePriorityChange = (newPriorityItem: SelectedItemBadgePriorityItem<string>) => {
            setSelectedPriorityItem(newPriorityItem);
            console.log(`Priority changed to ${newPriorityItem.priority}`);
        };

        const handleDelete = () => {
            console.log('SelectedItemBadge deleted');
        };

        return (
            <div style={{ width: '200px' }}>
                <SelectedItemBadge
                    {...args}
                    priority={
                        args.priority && {
                            ...args.priority,
                            selectedItem: selectedPriorityItem,
                            onChange: handlePriorityChange,
                        }
                    }
                    onDelete={handleDelete}
                    onChange={handleOnChange}
                    isMultiSelect={args.isMultiSelect}
                    additionalLabel={selectedSynonyms.length > 0 && `+${selectedSynonyms.length}`}
                >
                    <div
                        style={{
                            padding: 'var(--space-75) var(--space-75) var(--space-50)',
                            backgroundColor: 'var(--color-background-brand-subtlest-default)',
                            fontWeight: 'var(--font-weight-bold)',
                            color: 'var(--color-text-brand-default)',
                        }}
                    >
                        <Text inline title="Radius" size="small">
                            {'English'.toUpperCase()}
                        </Text>
                    </div>
                    {synonyms.map((synonym) => (
                        <ListItem value={synonym}>
                            <Checkbox
                                id={synonym}
                                onChange={() => null}
                                checked={selectedSynonyms.includes(synonym)}
                            >
                                {synonym}
                            </Checkbox>
                        </ListItem>
                    ))}
                </SelectedItemBadge>
            </div>
        );
    },
};

export const SelectedItemBadgeWithoutPriorityButton: Story = {
    name: 'SelectedItemBadge - No Priority Control',
    args: {
        label: 'London',
        priority: undefined,
    },
    render: (args) => {
        const [selectedRadius, setSelectedRadius] = React.useState<string>();

        React.useEffect(() => {
            setSelectedRadius(selectedRadius);
        }, [selectedRadius]);

        const handleRadiusChange = (newRadius: string) => {
            setSelectedRadius(newRadius);
            console.log(`Option changed to ${newRadius}`);
        };

        const handleDelete = () => {
            console.log('SelectedItemBadge deleted');
        };

        return (
            <div style={{ width: '200px' }}>
                <SelectedItemBadge
                    {...args}
                    onDelete={handleDelete}
                    onChange={handleRadiusChange}
                    additionalLabel={selectedRadius && `+${selectedRadius} km`}
                >
                    <div
                        style={{
                            padding: 'var(--space-75) var(--space-75) var(--space-50)',
                            backgroundColor: 'var(--color-background-brand-subtlest-default)',
                            fontWeight: 'var(--font-weight-bold)',
                            color: 'var(--color-text-brand-default)',
                        }}
                    >
                        <Text inline title="Radius" size="small">
                            {'Radius'.toUpperCase()}
                        </Text>
                    </div>
                    {radiusList.map((radius) => (
                        <ListItem
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                gap: '8px',
                            }}
                            key={radius}
                            value={radius}
                        >
                            <Text inline size="small">
                                {radius}
                            </Text>
                        </ListItem>
                    ))}
                </SelectedItemBadge>
            </div>
        );
    },
};

export const SelectedItemBadgeWithoutChildren: Story = {
    name: 'SelectedItemBadge - No children',
    args: {
        label: 'London',
        priority: {
            list: priorityList,
            buttonLabel: 'Priority',
            onChange: () => {},
            selectedItem: { priority: 'mandatory', label: 'Mandatory', value: 'required' },
        },
        children: undefined,
    },
    render: (args) => {
        const [selectedPriorityItem, setSelectedPriorityItem] = React.useState<
            SelectedItemBadgePriorityItem<string>
        >(
            args.priority?.selectedItem || {
                priority: 'mandatory',
                label: 'Mandatory',
                value: 'required',
            }
        );
        const [selectedRadius, setSelectedRadius] = React.useState<string>();

        React.useEffect(() => {
            setSelectedPriorityItem(selectedPriorityItem);
        }, [selectedPriorityItem]);

        React.useEffect(() => {
            setSelectedRadius(selectedRadius);
        }, [selectedRadius]);

        const handlePriorityChange = (newPriorityItem: SelectedItemBadgePriorityItem<string>) => {
            setSelectedPriorityItem(newPriorityItem);
            console.log(`Priority changed to ${newPriorityItem.priority}`);
        };

        const handleRadiusChange = (newRadius: string) => {
            setSelectedRadius(newRadius);
            console.log(`Option changed to ${newRadius}`);
        };

        const handleDelete = () => {
            console.log('SelectedItemBadge deleted');
        };

        return (
            <div style={{ width: '200px' }}>
                <SelectedItemBadge
                    {...args}
                    priority={
                        args.priority && {
                            ...args.priority,
                            selectedItem: selectedPriorityItem,
                            onChange: handlePriorityChange,
                        }
                    }
                    onDelete={handleDelete}
                    onChange={handleRadiusChange}
                    additionalLabel={selectedRadius && `+${selectedRadius} km`}
                />
            </div>
        );
    },
};

export const SelectedItemBadgeWithoutCloseButton: Story = {
    name: 'SelectedItemBadge - No close funcionality',
    args: {
        label: 'London',
        priority: {
            list: priorityList,
            buttonLabel: 'Priority',
            onChange: () => {},
            selectedItem: { priority: 'mandatory', label: 'Mandatory', value: 'required' },
        },
        onDelete: undefined,
    },
    render: (args) => {
        const [selectedPriorityItem, setSelectedPriorityItem] = React.useState<
            SelectedItemBadgePriorityItem<string>
        >(
            args.priority?.selectedItem || {
                priority: 'mandatory',
                label: 'Mandatory',
                value: 'required',
            }
        );
        const [selectedRadius, setSelectedRadius] = React.useState<string>();

        React.useEffect(() => {
            setSelectedPriorityItem(selectedPriorityItem);
        }, [selectedPriorityItem]);

        React.useEffect(() => {
            setSelectedRadius(selectedRadius);
        }, [selectedRadius]);

        const handlePriorityChange = (newPriorityItem: SelectedItemBadgePriorityItem<string>) => {
            setSelectedPriorityItem(newPriorityItem);
            console.log(`Priority changed to ${newPriorityItem.priority}`);
        };

        const handleRadiusChange = (newRadius: string) => {
            setSelectedRadius(newRadius);
            console.log(`Option changed to ${newRadius}`);
        };

        return (
            <div style={{ width: '200px' }}>
                <SelectedItemBadge
                    {...args}
                    priority={
                        args.priority && {
                            ...args.priority,
                            selectedItem: selectedPriorityItem,
                            onChange: handlePriorityChange,
                        }
                    }
                    onChange={handleRadiusChange}
                    additionalLabel={selectedRadius && `+${selectedRadius} km`}
                >
                    <div
                        style={{
                            padding: 'var(--space-75) var(--space-75) var(--space-50)',
                            backgroundColor: 'var(--color-background-brand-subtlest-default)',
                            fontWeight: 'var(--font-weight-bold)',
                            color: 'var(--color-text-brand-default)',
                        }}
                    >
                        <Text inline title="Radius" size="small">
                            {'Radius'.toUpperCase()}
                        </Text>
                    </div>
                    {radiusList.map((radius) => (
                        <ListItem
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                gap: '8px',
                            }}
                            key={radius}
                            value={radius}
                        >
                            <Text inline size="small">
                                {radius}
                            </Text>
                        </ListItem>
                    ))}
                </SelectedItemBadge>
            </div>
        );
    },
};

export const SelectedItemBadgeWithSingleSelectItems: Story = {
    name: 'SelectedItemBadge - SingleSelectItem',
    args: {
        label: 'London',
        onDelete: undefined,
    },
    render: (args) => {
        const [selectedRadius, setSelectedRadius] = React.useState<string>();

        React.useEffect(() => {
            setSelectedRadius(selectedRadius);
        }, [selectedRadius]);

        const handleRadiusChange = (newRadius: string) => {
            setSelectedRadius(newRadius);
            console.log(`Option changed to ${newRadius}`);
        };

        return (
            <div style={{ width: '200px' }}>
                <SelectedItemBadge
                    {...args}
                    onChange={handleRadiusChange}
                    additionalLabel={selectedRadius && `+${selectedRadius} km`}
                >
                    <div
                        style={{
                            padding: 'var(--space-75) var(--space-75) var(--space-50)',
                            backgroundColor: 'var(--color-background-brand-subtlest-default)',
                            fontWeight: 'var(--font-weight-bold)',
                            color: 'var(--color-text-brand-default)',
                        }}
                    >
                        <Text inline title="Radius" size="small">
                            {'Radius'.toUpperCase()}
                        </Text>
                    </div>
                    {radiusList.map((radius) => (
                        <SingleSelectItem
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                gap: '8px',
                            }}
                            key={radius}
                            value={radius}
                        >
                            {radius}
                        </SingleSelectItem>
                    ))}
                </SelectedItemBadge>
            </div>
        );
    },
};
