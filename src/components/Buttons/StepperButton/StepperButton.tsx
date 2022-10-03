import * as React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
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
    /** Icon to show inside button */
    icon: 'plus' | 'minus';
}

const { block } = bem('StepperButton', styles);

export const StepperButton: React.FC<Props> = ({
    disabled = false,
    icon = 'plus',
    href,
    ...rest
}) => {
    return (
        <button {...rest} {...block({ disabled })} type="button" disabled={disabled}>
            {icon === 'plus' ? <FaPlus size="75%" /> : <FaMinus size="75%" />}
        </button>
    );
};

StepperButton.displayName = 'StepperButton';
