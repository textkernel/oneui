import * as React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { bem } from '../../../utils';
import styles from './StepperButton.scss';

export interface Props
    extends Omit<
        React.ButtonHTMLAttributes<HTMLButtonElement> &
            React.AnchorHTMLAttributes<HTMLAnchorElement>,
        'size'
    > {
    /** Should button be disabled or not */
    disabled?: boolean;
    /** Icon to show inside button */
    icon: 'plus' | 'minus'; // TODO: Use boolean here? But semantically text looks better
}

const { block } = bem('StepperButton', styles);

export const StepperButton: React.FC<Props> = (props) => {
    const { disabled, href, icon, ...rest } = props;

    return (
        <button {...rest} {...block(props)} type="button" disabled={disabled}>
            {icon === 'plus' ? <FaPlus size="75%" /> : <FaMinus size="75%" />}
        </button>
    );
};

StepperButton.displayName = 'StepperButton';

StepperButton.defaultProps = {
    disabled: false,
    icon: 'plus',
};
