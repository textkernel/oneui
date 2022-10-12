import * as React from 'react';
import { FaSearch } from 'react-icons/fa';
import { bem } from '../../../utils';
import styles from './SearchButton.scss';

export interface Props
    extends Omit<
        React.ButtonHTMLAttributes<HTMLButtonElement> &
            React.AnchorHTMLAttributes<HTMLAnchorElement>,
        'type'
    > {
    /** Used to disable the button */
    disabled?: boolean;
    /** Type of the button */
    type?: 'submit' | 'button';
    /** Label for the button */
    children?: string;
}

const { block, elem } = bem('SearchButton', styles);

export const SearchButton = React.forwardRef<HTMLButtonElement, Props>((props: Props, ref) => {
    const { disabled, children, type, ...rest } = props;
    const propsForBem = { ...props, withLabel: !!children };

    return (
        <button {...rest} {...block(propsForBem)} ref={ref} type={type} disabled={disabled}>
            <FaSearch {...elem('searchIcon', propsForBem)} />
            {children}
        </button>
    );
});

SearchButton.displayName = 'SearchButton';

SearchButton.defaultProps = {
    children: '',
    disabled: false,
    type: 'button',
};
