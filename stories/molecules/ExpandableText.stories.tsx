import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ExpandableText, Text } from '@textkernel/oneui';

const meta: Meta<typeof ExpandableText> = {
    title: 'Molecules/ExpandableText',
    component: ExpandableText,
};

export default meta;

type Story = StoryObj<typeof ExpandableText>;

export const ExpandableLongText: Story = {
    name: 'Expandable text with long text',
    args: {
        showMoreButtonLabel: 'Show more',
        showLessButtonLabel: 'Show less',
    },
    render: (args) => (
        <ExpandableText {...args}>
            <Text>
                03/05 - 11/2010 Magellan Health Services/Icore Healthcare Division , Clinical Sales
                Representative * Managed outside sales of New York&apos;s tri-state territory for
                Injectable Medications. * Consulted Hospital Staff; Endocrinologists, and
                Gastroenterologists on injectable Growth Hormone, and Hepatitis C Medications. *
                Worked together with Oxford, HIP, and Horizon Blue Cross Blue Shield of N.Schlage.
                on targeting the formulary * spending on injectable medications.Maintained
                relationships with pharma
            </Text>
            <Text>
                03/05 - 11/2010 Magellan Health Services/Icore Healthcare Division , Clinical Sales
                Representative * Managed outside sales of New York&apos;s tri-state territory for
                Injectable Medications. * Consulted Hospital Staff; Endocrinologists, and
                Gastroenterologists on injectable Growth Hormone, and Hepatitis C Medications. *
                Worked together with Oxford, HIP, and Horizon Blue Cross Blue Shield of N.Schlage.
                on targeting the formulary * spending on injectable medications.Maintained
                relationships with pharma
            </Text>
        </ExpandableText>
    ),
};

export const ExpandableShortText: Story = {
    name: 'Expandable Text box with short text',
    args: {
        showMoreButtonLabel: 'Show more',
        showLessButtonLabel: 'Collapse',
    },
    render: (args) => (
        <ExpandableText {...args}>
            Some short text - here we shouldn&apos;t show the toggle button
        </ExpandableText>
    ),
};
