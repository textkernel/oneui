import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { BulkActionsToolbar } from '@textkernel/oneui';

storiesOf('Molecules|BulkActionsToolbar', module)
    .addDecorator(withKnobs)
    .add('BulkActionsToolbar', () => {
        const hasSelection = boolean('Has selection', true);
        const currentToggleState = select(
            'Current toggle',
            {
                'Select All': 'all',
                'Select None': 'none',
            },
            'all'
        );
        return (
            <BulkActionsToolbar
                selection={{
                    hasSelection,
                    label: 'Some result(s) selected',
                    tooltip: 'Total amount of selected items across all pages',
                }}
                toggleState={currentToggleState}
                toggle={{
                    selectAllLabel: 'Select All',
                    selectAllTooltip: '"Select All" will select all items on the current page',
                    selectNoneLabel: 'Select None',
                    selectNoneTooltip: '"Select None" will unselect all items on the current page',
                    onToggle: (toggleState) => {
                        console.log(
                            `"onToggle" has been clicked with toggleState "${toggleState}"`
                        );
                    },
                }}
                actions={[
                    {
                        label: 'Compare',
                        tooltip: 'Select 2 or more candidates to compare',
                        disabled: true,
                        onClick: () => {
                            console.log('"Compare" has been clicked');
                        },
                    },
                    {
                        label: 'Import',
                        tooltip: 'Import selected candidates to your ATS',
                        disabled: false,
                        onClick: () => {
                            console.log('"Import" has been clicked');
                        },
                    },
                    {
                        label: 'Mark as viewed',
                        disabled: false,
                        onClick: () => {
                            console.log('"Mark as viewed" has been clicked');
                        },
                    },
                ]}
            />
        );
    });
