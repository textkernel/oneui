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

const DummyComponent = () => (
    <>
        <span>
            This is some content dropdown has 440px max height so it will show scroll bars after
            that
        </span>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas
            vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum
            quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident
            similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
            molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit
            sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid.
            Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
            sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias
            error harum maxime adipisci amet laborum.
        </p>
        <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas
            vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum
            quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident
            similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
            molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit
            sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid.
            Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
            sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias
            error harum maxime adipisci amet laborum. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Id maiores, quaerat optio ullam eligendi dicta quia ipsam hic
            exercitationem? Ex exercitationem, ad earum est quod architecto facere debitis quia et!
        </span>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <Pill
                    {...args}
                    onClear={() => {
                        console.log('onClear called');
                    }}
                    onClose={() => {
                        console.log('onClose called');
                    }}
                >
                    <DummyComponent />
                </Pill>
                <Pill {...args} content={undefined}>
                    <DummyComponent />
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
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam a fuga
                            beatae reiciendis earum, omnis eius accusantium eveniet quam
                            exercitationem praesentium sint odit harum. Quisquam eos mollitia
                            veritatis eligendi magnam.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam a fuga
                            beatae reiciendis earum, omnis eius accusantium eveniet quam
                            exercitationem praesentium sint odit harum. Quisquam eos mollitia
                            veritatis eligendi magnam.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam a fuga
                            beatae reiciendis earum, omnis eius accusantium eveniet quam
                            exercitationem praesentium sint odit harum. Quisquam eos mollitia
                            veritatis eligendi magnam.
                        </p>
                    </div>
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
