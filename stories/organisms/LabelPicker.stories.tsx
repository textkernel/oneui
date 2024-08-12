import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LabelPicker, Button, LabelPickerLabel } from '@textkernel/oneui';

type MyLabel = LabelPickerLabel & { id: number };

const LABELS = [
    { name: 'Label 1', isSelected: false, count: 0, id: 1 },
    { name: 'Label 2', isSelected: true, count: 2, id: 2 },
    { name: 'Label 3', isSelected: false, count: 300, id: 3 },
    { name: 'Label 4', isSelected: false, id: 4 },
    { name: 'This is label 5 which has a very very long name', isSelected: false, id: 5 },
    {
        name: 'This is label 6 which has a very very long name and a count',
        isSelected: false,
        count: 654,
        id: 6,
    },
];

const meta: Meta<typeof LabelPicker> = {
    title: 'Organisms/LabelPicker',
    component: LabelPicker,
};

export default meta;

type Story = StoryObj<typeof LabelPicker>;

export const _LabelPicker: Story = {
    name: 'LabelPicker',
    args: {
        inputPlaceholder: 'Create a new label..',
    },
    render: (args) => {
        const [labels, setLabels] = React.useState<MyLabel[]>([...LABELS]);

        const handleChange = (label: MyLabel) => {
            console.log(`onChange was called with ${JSON.stringify(label)}`);

            const idx = labels.findIndex((element) => element.id === label.id);
            const newLabels = [...labels];
            newLabels.splice(idx, 1, { ...label, isSelected: !label.isSelected });
            setLabels(newLabels);
        };

        const handleAdd = (name: string) => {
            console.log(`onAdd was called with ${name}`);

            setLabels([...labels, { name, isSelected: true, id: labels.length + 1 }]);
        };

        return (
            <LabelPicker<MyLabel>
                {...args}
                labels={labels}
                onChange={handleChange}
                onAdd={handleAdd}
            >
                <Button variant="ghost">Apply label</Button>
            </LabelPicker>
        );
    },
};
