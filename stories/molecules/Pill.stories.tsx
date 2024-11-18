import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
    PillButton,
    PillButtonEnhanced,
    PillDropdown,
    Pill,
    PriorityItemType,
    SelectedItemBadge,
    SingleSelectItem,
} from '@textkernel/oneui';

const DummyComponent = (props) => (
    <>
        <p>This is some content for the pill</p>
        <button onClick={props.close}>Close me</button>
    </>
);

const priorityList: PriorityItemType<string>[] = [
    { priority: 'mandatory', label: 'Mandatory', value: 'required' },
    { priority: 'important', label: 'Important', value: 'strongly_favored' },
    { priority: 'optional', label: 'Optional', value: 'favored' },
    { priority: 'exclude', label: 'Exclude', value: 'banned' },
];

const meta: Meta<typeof Pill> = {
    title: 'Molecules/Pill',
    component: Pill,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subcomponents: { PillButton, PillButtonEnhanced, PillDropdown } as any,
    argTypes: {
        ref: { control: false },
        dropdownRef: { control: false },
    },
};

export default meta;

type Story = StoryObj<typeof Pill>;

export const _Pill: Story = {
    name: 'Pill',
    args: {
        doneLabel: 'Done',
        name: 'Pill name',
        content: 'This pill is used',
        downArrowLabel: 'down arrow',
        upArrowLabel: 'up arrow',
        clearLabel: 'clear label',
    },
    render: (args) => {
        const [prioritySelected, setPrioritySelected] = React.useState<PriorityItemType<string>>({
            priority: 'mandatory',
            label: 'Mandatory',
            value: 'required',
        });

        const handlePrioritySelect = (selectedItem: PriorityItemType<string>) => {
            console.log('new item selected: ', selectedItem);
            setPrioritySelected(selectedItem);
        };

        const badgeOption = ['some', 'other', 'options'];
        const handleOptionChange = (option) => {
            console.log('SelectedItemBadge option was selected: ', option);
        };

        return (
            <div style={{ position: 'relative', display: 'flex', gap: '4px' }}>
                <Pill
                    {...args}
                    onClear={() => {
                        console.log('onClear called');
                    }}
                    onClose={() => {
                        console.log('onClose called');
                    }}
                >
                    {({ close }) => <DummyComponent close={close} />}
                </Pill>
                <Pill
                    {...args}
                    onClose={() => {
                        console.log('onClose called');
                    }}
                    onClear={() => {
                        console.log('onClear called');
                    }}
                    variant="enhanced"
                    priority={{
                        onChange: handlePrioritySelect,
                        selectedItem: prioritySelected,
                        list: priorityList,
                        buttonLabel: 'priorityButton',
                    }}
                >
                    {() => (
                        <div style={{ width: '150px' }}>
                            <SelectedItemBadge
                                label="Java"
                                priority={{
                                    onChange: handlePrioritySelect,
                                    selectedItem: prioritySelected,
                                    list: priorityList,
                                    buttonLabel: 'priorityButton',
                                }}
                            >
                                {badgeOption.map((option) => (
                                    <SingleSelectItem
                                        key={option}
                                        onClick={() => handleOptionChange(option)}
                                        isSelected={option === 'Java'}
                                    >
                                        {option}
                                    </SingleSelectItem>
                                ))}
                            </SelectedItemBadge>
                        </div>
                    )}
                </Pill>
                <Pill {...args} content={undefined}>
                    {({ close }) => <DummyComponent close={close} />}
                </Pill>
            </div>
        );
    },
};

type PillButtonStory = StoryObj<typeof PillButton>;

export const _PillButton: PillButtonStory = {
    name: 'PillButton',
    args: {
        name: 'Pill name',
        content: 'This pill is used',
        downArrowLabel: 'down arrow',
        upArrowLabel: 'up arrow',
        clearLabel: 'clear label',
    },
    render: (args) => (
        <div style={{ display: 'flex' }}>
            <PillButton {...args} />
            &nbsp;&nbsp;
            <PillButton {...args} name="Pill 2" content="" />
        </div>
    ),
};

type PillButtonEnhancedStory = StoryObj<typeof PillButtonEnhanced>;

export const _PillButtonEnhanced: PillButtonEnhancedStory = {
    name: 'PillButtonEnhanced',
    args: {
        name: 'Pill name',
        content: 'value',
        downArrowLabel: 'down arrow',
        upArrowLabel: 'up arrow',
        clearLabel: 'clear label',
        additionalContentLabel: '+2',
        additionalContentTooltip: (
            <>
                an other value
                <br />a third thing
            </>
        ),
    },
    render: (args) => (
        <div style={{ display: 'flex' }}>
            <PillButtonEnhanced {...args} />
            &nbsp;&nbsp;
            <PillButtonEnhanced
                {...args}
                name="Pill 2"
                content=""
                additionalContentLabel=""
                additionalContentTooltip=""
            />
        </div>
    ),
};

export const _PillButtonEnhancedWithPriority: PillButtonEnhancedStory = {
    name: 'PillButtonEnhanced with Priority selector',
    args: {
        name: 'Pill name',
        content: 'value',
        downArrowLabel: 'down arrow',
        upArrowLabel: 'up arrow',
        clearLabel: 'clear label',
    },
    render: (args) => {
        const [prioritySelected, setPrioritySelected] = React.useState<PriorityItemType<string>>({
            priority: 'mandatory',
            label: 'Mandatory',
            value: 'required',
        });

        const handlePrioritySelect = (selectedItem: PriorityItemType<string>) => {
            console.log('new item selected: ', selectedItem);
            setPrioritySelected(selectedItem);
        };

        return (
            <div style={{ display: 'flex' }}>
                <PillButtonEnhanced<string>
                    {...args}
                    priority={{
                        onChange: handlePrioritySelect,
                        selectedItem: prioritySelected,
                        list: priorityList,
                        buttonLabel: 'priorityButton',
                    }}
                />
                &nbsp;&nbsp;
                <PillButtonEnhanced
                    {...args}
                    name="Pill 2"
                    content=""
                    additionalContentLabel=""
                    additionalContentTooltip=""
                />
            </div>
        );
    },
};

type PillDropdownStory = StoryObj<typeof PillDropdown>;

export const _PillDropdown: PillDropdownStory = {
    name: 'PillDropdown',
    args: {
        doneLabel: 'Done',
    },
    render: (args) => (
        <PillDropdown {...args}>{({ close }) => <DummyComponent close={close} />}</PillDropdown>
    ),
};
