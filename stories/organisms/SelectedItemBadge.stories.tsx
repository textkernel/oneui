import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
    SelectedItemBadge,
    PriorityItemType,
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

type Story = StoryObj<typeof SelectedItemBadge>;

const priorityList: PriorityItemType<string>[] = [
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
            selectedItem: {
                priority: 'mandatory',
                label: 'Mandatory',
                value: 'required',
            },
        },
        buttonLabel: 'Select radius',
    },
    render: (args) => {
        const [selectedPriorityItem, setSelectedPriorityItem] = React.useState<
            PriorityItemType<string>
        >(
            (args.priority?.selectedItem as PriorityItemType<string>) || {
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

        const handlePriorityChange = (newPriorityItem: PriorityItemType<string>) => {
            setSelectedPriorityItem(newPriorityItem);
            console.log(`Priority changed to ${newPriorityItem.priority}`);
        };

        const handleRadiusChange = (newRadius: string) => {
            console.log('handleRadiusChange');
            setSelectedRadius(newRadius);
            console.log(`Option changed to ${newRadius}`);
        };

        const handleDelete = () => {
            console.log('SelectedItemBadge deleted');
            setSelectedRadius(undefined);
        };

        return (
            <div style={{ width: '200px' }}>
                <SelectedItemBadge<string, string>
                    {...args}
                    priority={
                        args.priority && {
                            ...args.priority,
                            list: priorityList,
                            selectedItem: selectedPriorityItem,
                            onChange: handlePriorityChange,
                        }
                    }
                    onDelete={handleDelete}
                    additionalLabel={selectedRadius && `+${selectedRadius} km`}
                >
                    <Separator>RADIUS</Separator>
                    {radiusList.map((radius) => (
                        <SingleSelectItem
                            key={radius}
                            onClick={() => handleRadiusChange(radius)}
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

export const _SelectedItemBadgeMultiSelect: Story = {
    name: 'SelectedItemBadge - With multiselect children',
    args: {
        label: 'Java',
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
            PriorityItemType<string>
        >(
            (args.priority?.selectedItem as PriorityItemType<string>) || {
                priority: 'mandatory',
                label: 'Mandatory',
                value: 'required',
            }
        );
        const [selectedSynonyms, setSelectedSynonyms] = React.useState<string[]>([]);

        React.useEffect(() => {
            if (
                selectedSynonyms.includes('All') &&
                selectedSynonyms.length !== synonyms.length + synonyms2.length + 2
            ) {
                setSelectedSynonyms(selectedSynonyms.filter((s) => s !== 'All'));
            }

            if (
                !selectedSynonyms.includes('All') &&
                selectedSynonyms.length === synonyms.length + synonyms2.length + 1
            ) {
                setSelectedSynonyms([...selectedSynonyms, 'All']);
            }
        }, [selectedSynonyms]);

        const handleOnChange = (checked: boolean, synonym: string) => {
            if (synonym === 'All') {
                if (checked) {
                    setSelectedSynonyms([synonym, 'English', ...synonyms, ...synonyms2]);
                    console.log(`All synonyms selected`);
                } else {
                    setSelectedSynonyms([]);
                    console.log(`All synonyms de-selected`);
                }
                return;
            }

            if (synonym === 'English') {
                if (checked) {
                    setSelectedSynonyms([
                        'English',
                        ...selectedSynonyms.filter((s) => !synonyms.includes(s)),
                        ...synonyms,
                    ]);
                    console.log(`All English synonyms selected`);
                } else {
                    const newSelectedSynonyms = selectedSynonyms
                        .filter((s) => !synonyms.includes(s))
                        .filter((s) => s !== 'English');
                    setSelectedSynonyms(newSelectedSynonyms);
                    console.log(`All English synonyms de-selected`);
                }
                return;
            }

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

        const handlePriorityChange = (newPriorityItem: PriorityItemType<string>) => {
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
                            list: priorityList,
                            selectedItem: selectedPriorityItem,
                            onChange: handlePriorityChange,
                        }
                    }
                    onDelete={handleDelete}
                    additionalLabel={
                        selectedSynonyms.length > 0 &&
                        `+${selectedSynonyms.filter((s) => s !== 'All' && s !== 'English').length}`
                    }
                >
                    <MultiSelectItem
                        variant="select-all"
                        isSelected={selectedSynonyms.includes('All')}
                        onCheckedChange={(checked) => handleOnChange(checked, 'All')}
                        onChange={(e) => console.log(e)}
                    >
                        Select all
                    </MultiSelectItem>
                    {synonyms2.map((synonym) => (
                        <MultiSelectItem
                            key={synonym}
                            id={synonym}
                            onCheckedChange={(checked) => handleOnChange(checked, synonym)}
                            isSelected={selectedSynonyms.includes(synonym)}
                        >
                            {synonym}
                        </MultiSelectItem>
                    ))}
                    <MultiSelectItem
                        variant="group-title"
                        onCheckedChange={(checked) => handleOnChange(checked, 'English')}
                        isSelected={selectedSynonyms.includes('English')}
                    >
                        English
                    </MultiSelectItem>
                    {synonyms.map((synonym) => (
                        <MultiSelectItem
                            key={synonym}
                            id={synonym}
                            onCheckedChange={(checked) => handleOnChange(checked, synonym)}
                            isSelected={selectedSynonyms.includes(synonym)}
                        >
                            {synonym}
                        </MultiSelectItem>
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
                    additionalLabel={selectedRadius && `+${selectedRadius} km`}
                >
                    <Separator>RADIUS</Separator>
                    {radiusList.map((radius) => (
                        <SingleSelectItem
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                gap: '8px',
                            }}
                            key={radius}
                            onSelect={() => handleRadiusChange(radius)}
                        >
                            <Text inline size="small">
                                {radius}
                            </Text>
                        </SingleSelectItem>
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
            PriorityItemType<string>
        >(
            (args.priority?.selectedItem as PriorityItemType<string>) || {
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

        const handlePriorityChange = (newPriorityItem: PriorityItemType<string>) => {
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
                            list: priorityList,
                            selectedItem: selectedPriorityItem,
                            onChange: handlePriorityChange,
                        }
                    }
                    onDelete={handleDelete}
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
            PriorityItemType<string>
        >(
            (args.priority?.selectedItem as PriorityItemType<string>) || {
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

        const handlePriorityChange = (newPriorityItem: PriorityItemType<string>) => {
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
                            list: priorityList,
                            selectedItem: selectedPriorityItem,
                            onChange: handlePriorityChange,
                        }
                    }
                    additionalLabel={selectedRadius && `+${selectedRadius} km`}
                >
                    <Separator>RADIUS</Separator>
                    {radiusList.map((radius) => (
                        <SingleSelectItem key={radius} onSelect={() => handleRadiusChange(radius)}>
                            <Text inline size="small">
                                {radius}
                            </Text>
                        </SingleSelectItem>
                    ))}
                </SelectedItemBadge>
            </div>
        );
    },
};
