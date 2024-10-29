import * as React from 'react';
import Search from '@material-design-icons/svg/round/search.svg';
import Clear from '@material-design-icons/svg/round/cancel.svg';

import { bem } from '../../../utils/bem';
import { mergeRefs } from '../../../utils/mergeRefs';
import { Input, Props } from '../Input';
import styles from './SearchInput.scss';

export interface SearchInputProps extends Omit<Props, 'type' | 'leadingIcon' | 'trailingIcon'> {}

const { elem } = bem('SearchInput', styles);

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
    ({ context, errorMessage, size, value, readOnly, ...rest }, ref) => {
        const inputRef = React.useRef<HTMLInputElement | null>(null);
        const [hasText, setHasText] = React.useState<boolean>(!!inputRef.current?.value);

        React.useEffect(() => {
            setHasText(!!value);
        }, [value]);

        const handleClear = () => {
            if (inputRef.current) {
                const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                    window.HTMLInputElement.prototype,
                    'value'
                )?.set;
                if (nativeInputValueSetter) {
                    // Use the setter to update the value
                    nativeInputValueSetter.call(inputRef.current, '');

                    // Dispatch the 'input' event so React detects the change
                    const event = new Event('input', { bubbles: true });
                    inputRef.current.dispatchEvent(event);
                }
                setHasText(false);
            }
        };

        const ClearIcon = (): React.JSX.Element => (
            <Clear
                {...elem('icon', { type: 'trailing', visible: hasText, size, readOnly })}
                viewBox="0 0 24 24"
                onClick={handleClear}
            />
        );
        ClearIcon.displayName = 'ClearIcon';

        const SearchIcon = (): React.JSX.Element => (
            <Search
                {...elem('icon', { type: 'leading', bold: hasText, size })}
                viewBox="0 0 24 24"
            />
        );
        SearchIcon.displayName = 'SearchIcon';

        return (
            <Input
                {...rest}
                ref={mergeRefs([ref, inputRef])}
                value={value}
                type="search"
                leadingIcon={<SearchIcon />}
                trailingIcon={<ClearIcon />}
                readOnly={readOnly}
                size={size}
                {...(context && errorMessage
                    ? { context, errorMessage }
                    : { context: undefined, errorMessage: undefined })}
            />
        );
    }
);

SearchInput.displayName = 'SearchInput';
