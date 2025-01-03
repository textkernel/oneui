import * as React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { ButtonContext } from '../../../constants/component-specific';
import { bem } from '../../../utils';
import styles from './StepperButton.scss';

export interface Props
    extends Omit<
        React.ButtonHTMLAttributes<HTMLButtonElement> &
            React.AnchorHTMLAttributes<HTMLAnchorElement>,
        'icon'
    > {
    /** Should button be disabled or not */
    disabled?: boolean;
    /** Should the button be in primary style or not */
    context?: ButtonContext;
    /** Icon to show inside button */
    icon: 'plus' | 'minus';
    /** title attribute for the svg icon */
    title?: string;
}

const { block } = bem('StepperButton', styles);

export const StepperButton: React.FC<Props> = ({
    disabled = false,
    context = 'secondary',
    icon,
    href,
    title,
    ...rest
}) => (
    <button {...rest} {...block({ context, disabled, ...rest })} type="button" disabled={disabled}>
        {icon === 'plus' ? (
            <FaPlus size="75%" title={title || 'plus'} />
        ) : (
            <FaMinus size="75%" title={title || 'minus'} />
        )}
    </button>
);

StepperButton.displayName = 'StepperButton';
