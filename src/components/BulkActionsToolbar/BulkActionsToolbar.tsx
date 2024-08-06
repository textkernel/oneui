import * as React from 'react';
import { Context } from '../../constants';
import { bem } from '../../utils';
import { Button } from '../Buttons/Button';
import { Tooltip } from '../Tooltip';
import styles from './BulkActionsToolbar.scss';

export type ToggleState = 'all' | 'none';

export type BulkActionsToolbarSelection = {
    hasSelection: boolean;
    label: React.ReactNode;
    tooltip?: string;
};

export type BulkActionsToolbarToggle = {
    selectAllLabel: React.ReactNode;
    selectAllTooltip?: string;
    selectNoneLabel: React.ReactNode;
    selectNoneTooltip?: string;
    onToggle: (toggleState: ToggleState) => void;
};

export type BulkActionsToolbarAction = {
    label: string;
    icon?: React.ReactElement;
    tooltip?: string;
    disabled: boolean;
    /** Default is 'link' */
    context?: Context | 'link';
    onClick: () => void;
};

export interface BulkActionsToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Defines if any items are selected and selection information text */
    selection: BulkActionsToolbarSelection;
    /** Defines current toggle's state (all or none) */
    toggleState: ToggleState;
    /** Defines parameters of Select All / Select None toggle */
    toggle: BulkActionsToolbarToggle;
    /** Defines list of actions */
    actions?: BulkActionsToolbarAction[];
    tooltipDelay?: number;
}

const { block, elem } = bem('BulkActionsToolbar', styles);

export const BulkActionsToolbar: React.FC<BulkActionsToolbarProps> = ({
    selection,
    toggleState,
    toggle,
    actions = [],
    tooltipDelay,
    ...rest
}) => {
    const toggleTooltip =
        toggleState === 'all' ? toggle.selectAllTooltip : toggle.selectNoneTooltip;
    const toggleLabel = toggleState === 'all' ? toggle.selectAllLabel : toggle.selectNoneLabel;
    return (
        <div {...block({ hasSelection: selection.hasSelection })} {...rest}>
            {selection.hasSelection && (
                <Tooltip content={selection.tooltip} delay={tooltipDelay}>
                    <div {...elem('counter')}>{selection.label}</div>
                </Tooltip>
            )}
            <div {...elem('toggle')}>
                <Tooltip content={toggleTooltip}>
                    <Button
                        isLink
                        onClick={() => toggle.onToggle(toggleState)}
                        {...elem('toggleButton')}
                    >
                        {toggleLabel}
                    </Button>
                </Tooltip>
            </div>
            <div {...elem('actions')}>
                {actions.map((action, index) => (
                    // We have to wrap the button into <span/> in order to
                    // be able to show the tooltip on disabled button.
                    // https://github.com/atomiks/tippyjs-react/issues/123
                    <Tooltip key={action.label} content={action.tooltip} delay={tooltipDelay}>
                        <span {...elem('actionWrapper', { first: index === 0 })}>
                            <Button
                                disabled={action.disabled}
                                onClick={action.onClick}
                                {...elem('action')}
                            >
                                {action.icon && <span {...elem('icon')}>{action.icon} </span>}
                                {action.label}
                            </Button>
                        </span>
                    </Tooltip>
                ))}
            </div>
        </div>
    );
};

BulkActionsToolbar.displayName = 'BulkActionsToolbar';
