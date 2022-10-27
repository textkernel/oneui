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

export const SearchButton = React.forwardRef<HTMLButtonElement, Props>(
    ({ disabled = false, children = '', type = 'button', ...rest }, ref) => {
        const propForBem = { withLabel: !!children };

        return (
            <button
                {...rest}
                {...block({ ...propForBem, ...rest })}
                ref={ref}
                type={type}
                disabled={disabled}
            >
                <FaSearch {...elem('searchIcon', propForBem)} />
                {children}
            </button>
        );
    }
);

SearchButton.displayName = 'SearchButton';
