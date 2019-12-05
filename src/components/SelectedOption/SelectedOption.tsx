import * as React from 'react';
import bem from '../../utils/bem';
import { ENTER_KEY } from '../../constants';
import { IoIosClose } from 'react-icons/io';
import styles from './SelectedOption.scss';

interface Props extends React.HTMLAttributes<HTMLElement> {
    /** the HTML tag in which to render the element */
    As?: string;
    /** callback on delete */
    onDelete: () => void;
    /** the text to be shown */
    children: NotEmptyReactNode;
}

const { block, elem } = bem('SelectedOption', styles);

const SelectedOption: React.FC<Props> = React.forwardRef((props, ref?: React.Ref<HTMLElement>) => {
    const { As = 'div', children, onDelete, ...rest } = props;

    const handleKeyDown = e => {
        if (e.key === ENTER_KEY) {
            onDelete();
        }
    };

    return (
        <As {...rest} ref={ref} {...block(props)}>
            <button {...elem('button', props)} onClick={onDelete} onKeyDown={handleKeyDown}>
                <IoIosClose {...elem('buttonIcon', props)} />
            </button>
            {children}
        </As>
    );
});

SelectedOption.displayName = 'SelectedOption';

SelectedOption.defaultProps = {
    As: 'div',
};

export default SelectedOption;
