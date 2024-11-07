import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PriorityItemType, PrioritySelector } from '@textkernel/oneui';

const meta: Meta<typeof PrioritySelector> = {
    title: 'Molecules/PrioritySelector',
    component: PrioritySelector,
};
export default meta;
type PriorityStory = StoryObj<typeof PrioritySelector<string>>;
const priorityList: PriorityItemType<string>[] = [
    { priority: 'important', label: 'Important', value: 'strongly_favored' },
    { priority: 'mandatory', label: 'Mandatory', value: 'required' },
    { priority: 'optional', label: 'Optional', value: 'favored' },
    { priority: 'exclude', label: 'Exclude', value: 'banned' },
];
export const _PrioritySelectory: PriorityStory = {
    name: 'Priority Selector',
    args: {
        list: priorityList,
        buttonLabel: 'Priority',
        selectedItem: { priority: 'mandatory', label: 'Mandatory', value: 'required' },
    },
    render: (args) => {
        const badgeRef = React.useRef<HTMLDivElement>(null);
        const [selectedPriorityItem, setSelectedPriorityItem] = React.useState<
            PriorityItemType<string>
        >(args.selectedItem as PriorityItemType<string>);

        const handleSelect = (selectedItem: PriorityItemType<string>) => {
            console.log('new item selected: ', selectedItem);
            setSelectedPriorityItem(selectedItem);
        };
        return (
            <div style={{ width: '300px' }} ref={badgeRef}>
                <PrioritySelector
                    {...args}
                    list={args.list}
                    selectedItem={selectedPriorityItem}
                    onChange={handleSelect}
                    parentRef={badgeRef}
                />
            </div>
        );
    },
};
