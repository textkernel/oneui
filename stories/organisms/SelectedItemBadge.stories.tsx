import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
    ListItem,
    SelectedItemBadge,
    SelectedItemBadgePriorityItem,
    Separator,
    SingleSelectItem,
    Text,
    MultiSelectItem,
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
const synonyms2 = ['Developer', 'Engineer', 'Programmer', 'Architect'];

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
                    <Separator title={'Radius'.toUpperCase()} />
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
            <>
                <Text>
                    Note: group selection and Select all is not correctly implemented in this
                    example. We only showcasing the layout here.
                </Text>
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
                        additionalLabel={
                            selectedSynonyms.length > 0 && `+${selectedSynonyms.length}`
                        }
                    >
                        <MultiSelectItem
                            value="All"
                            variant="select-all"
                            isSelected={selectedSynonyms.includes('All')}
                        >
                            Select all
                        </MultiSelectItem>
                        {synonyms2.map((synonym) => (
                            <MultiSelectItem
                                value={synonym}
                                id={synonym}
                                isSelected={selectedSynonyms.includes(synonym)}
                            >
                                {synonym}
                            </MultiSelectItem>
                        ))}
                        <MultiSelectItem
                            value="English"
                            variant="group-title"
                            isSelected={selectedSynonyms.includes('English')}
                        >
                            English
                        </MultiSelectItem>
                        {synonyms.map((synonym) => (
                            <MultiSelectItem
                                value={synonym}
                                id={synonym}
                                isSelected={selectedSynonyms.includes(synonym)}
                            >
                                {synonym}
                            </MultiSelectItem>
                        ))}
                    </SelectedItemBadge>
                </div>
            </>
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
                    <Separator title={'Radius'.toUpperCase()} />
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
                    <Separator title={'Radius'.toUpperCase()} />
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
                    <Separator title={'Radius'.toUpperCase()} />
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
                            isSelected={selectedRadius === radius}
                        >
                            {radius}
                        </SingleSelectItem>
                    ))}
                </SelectedItemBadge>
            </div>
        );
    },
};
