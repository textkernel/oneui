import * as React from 'react';
import Close from '@material-design-icons/svg/round/close.svg';
import { bem } from '../../utils';
import { IconButton } from '../Buttons/IconButton/IconButton';
import { Text } from '../Text';
import styles from './ActionIsland.scss';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Determines if the action island is shown. */
    isShown: boolean;
    /** Callbakc function triggered when the close button is clicked. */
    onClose: () => void;
    /** Counter part or prefix of the label. */
    size: React.ReactNode;
    /** Main label to be displayed */
    label: React.ReactNode;
}

const { block, elem } = bem('ActionIsland', styles);

export const ActionIsland: React.FC<Props> = ({
    children,
    isShown,
    onClose,
    size,
    label,
    ...rest
}) =>
    isShown && (
        <div {...block()} {...rest}>
            <Text inline {...elem('label')}>
                <Text inline isBold>
                    {size}
                </Text>{' '}
                {label}
            </Text>
            <div {...elem('actionsContainer')}>Button container</div>
            <IconButton variant="ghost" size="large" onClick={onClose}>
                <Close viewBox="0 0 24 24" />
            </IconButton>
        </div>
    );

ActionIsland.displayName = 'ActionIsland';
