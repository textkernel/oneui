import * as React from 'react';
import bem from '../../../utils/bem';
import { ENTER_KEY } from '../../../constants';
import styles from './SelectButton.scss';

// These props will be passed by the parent <SelectButtonGroup>
interface InternalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** if this button should be in a selected state */
    isSelected?: boolean;
    /** A function to be called if a button is pressed. */
    onChange?: (value: string) => void;
    /** If this component a child of a full block with container  */
    isBlock?: boolean;
    /** If this button has same width as its siblings */
    isEqualWidth?: boolean;
}

export interface Props extends InternalProps {
    /** the label to be displayed on this button */
    children: NotEmptyReactNode;
    /** the value associated with this button */
    value: string;
    /** if this button should be in a selected when first rendered */
    isInitiallySelected?: boolean;
    /** the color context to be applied in the selected state */
    selectedContext?: 'neutral' | 'brand';
}

const { block } = bem('SelectButton', styles);

export const SelectButton: React.FC<Props> = props => {
    const {
        children,
        value,
        onChange,
        isEqualWidth,
        isBlock,
        selectedContext,
        isInitiallySelected,
        isSelected,
        ...rest
    } = props;

    const handleClick = () => {
        onChange?.(value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === ENTER_KEY) {
            handleClick();
        }
    };

    return (
        <div
            role="button"
            tabIndex={0}
            {...rest}
            onKeyPress={handleKeyPress}
            onClick={handleClick}
            {...block(props)}
        >
            {children}
        </div>
    );
};

SelectButton.displayName = 'SelectButton';

SelectButton.defaultProps = {
    isInitiallySelected: false,
    isEqualWidth: false,
};
