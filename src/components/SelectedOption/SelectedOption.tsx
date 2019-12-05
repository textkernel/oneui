import * as React from 'react';
import { ENTER_KEY, CROSS_CHAR } from '../../constants';

interface Props extends React.HTMLAttributes<HTMLElement> {
    /** the HTML tag in which to render the element */
    As?: string;
    /** callback on delete */
    onDelete: () => void;
    /** the text to be shown */
    children: string | React.ReactElement;
}

const SelectedOption: React.FC<Props> = React.forwardRef((props, ref?: React.Ref<HTMLElement>) => {
    const { As = 'li', children, onDelete, ...rest } = props;

    const handleKeyDown = e => {
        if (e.key === ENTER_KEY) {
            onDelete();
        }
    };

    return (
        <As {...rest} ref={ref}>
            <button onClick={onDelete} onKeyDown={handleKeyDown}>
                {CROSS_CHAR}
            </button>
            {children}
        </As>
    );
});

SelectedOption.displayName = 'SelectedOption';

SelectedOption.defaultProps = {
    As: 'li',
};

export default SelectedOption;
