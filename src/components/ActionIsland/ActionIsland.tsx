import * as React from 'react';
import Close from '@material-design-icons/svg/round/close.svg';
import { bem } from '../../utils';
import { IconButton } from '../Buttons/IconButton/IconButton';
import { Text } from '../Text';
import styles from './ActionIsland.scss';
import { ActionButton } from './ActionButton';
import { Tooltip } from '../Tooltip/Tooltip';
import { ActionButtonProps } from './ActionButton/ActionButton';

export interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    actionButtons: ActionButtonProps[];
    /** Determines if the action island is shown. */
    isShown: boolean;
    /** Callback function triggered when the close button is clicked. */
    onClose: () => void;
    /** Counter part or prefix of the label. */
    size: React.ReactNode;
    /** Main label to be displayed */
    label: React.ReactNode;
    /** Label for the "More" button */
    moreButtonLabel?: string;
    /** Close button label name for ARIA labelling */
    closeButtonLabel?: string;
    /** Tooltip content for the close button, which appears on hover */
    closeButtonTooltip?: string;
}

const { block, elem } = bem('ActionIsland', styles);

export const ActionIsland: React.FC<Props> = ({
    actionButtons,
    isShown,
    onClose,
    size,
    label,
    moreButtonLabel,
    closeButtonLabel,
    closeButtonTooltip,
    ...rest
}) => {
    const visibleButtons = actionButtons.slice(0, 3);
    const overflowButtons = actionButtons.slice(3);

    return (
        isShown && (
            <div {...block()} {...rest}>
                <div {...elem('header')}>
                    <Text inline {...elem('label')}>
                        <Text inline isBold>
                            {size}
                        </Text>{' '}
                        {label}
                    </Text>
                </div>
                <div {...elem('actionsContainer')}>
                    {visibleButtons.map((button) => (
                        <ActionButton key={`${button.label}`} {...button} />
                    ))}
                    {overflowButtons.length > 0 && (
                        <ActionButton label={moreButtonLabel} dropdownItems={overflowButtons} />
                    )}
                </div>
                <Tooltip placement="top" content={closeButtonTooltip}>
                    <IconButton
                        variant="ghost"
                        size="large"
                        onClick={onClose}
                        aria-label={closeButtonLabel}
                    >
                        <Close viewBox="0 0 24 24" />
                    </IconButton>
                </Tooltip>
            </div>
        )
    );
};

ActionIsland.displayName = 'ActionIsland';
