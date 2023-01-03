import * as React from 'react';
import { BulkActionsToolbar } from '@textkernel/oneui';
import { FiCheck } from 'react-icons/fi';

export default {
    title: 'Molecules/BulkActionsToolbar',
    component: BulkActionsToolbar,
};

export const _BulkActionsToolbar = (args) => <BulkActionsToolbar {...args} />;
_BulkActionsToolbar.args = {
    selection: {
        hasSelection: true,
        label: 'Some result(s) selected',
        tooltip: 'Total amount of selected items across all pages',
    },
    toggleState: 'all',
    toggle: {
        selectAllLabel: 'Select All',
        selectAllTooltip: '"Select All" will select all items on the current page',
        selectNoneLabel: 'Select None',
        selectNoneTooltip: '"Select None" will unselect all items on the current page',
        onToggle: (toggleState) => {
            console.log(`"onToggle" has been clicked with toggleState "${toggleState}"`);
        },
    },
    actions: [
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
            context: 'primary',
            tooltip: 'Import selected candidates to your ATS',
            disabled: false,
            onClick: () => {
                console.log('"Import" has been clicked');
            },
        },
        {
            label: 'Mark as viewed',
            icon: React.createElement(FiCheck),
            context: 'primary',
            disabled: false,
            onClick: () => {
                console.log('"Mark as viewed" has been clicked');
            },
        },
    ],
    tooltipDelay: 500,
};
