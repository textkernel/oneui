import * as React from 'react';
import Search from '@material-design-icons/svg/round/search.svg';
import Clear from '@material-design-icons/svg/round/cancel.svg';

import { Input, Props } from '../Input';

export interface SearchInputProps extends Omit<Props, 'type' | 'leadingIcon' | 'trailingIcon'> {}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
    (
        {
            id,
            children,
            context,
            disabled = false,
            readOnly = false,
            isBlock = false,
            size = 'medium',
            value: initialValue = '',
            label,
            helperText,
            errorMessage,
            reserveErrorMessageSpace = false,
            ...rest
        },
        ref
    ) => {
        const [value, setValue] = React.useState(initialValue);

        React.useEffect(() => {
            setValue(initialValue);
        }, [initialValue]);

        const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
            if (rest.onChange) {
                rest.onChange(e);
            }
        };

        return (
            <Input
                ref={ref}
                disabled={disabled}
                readOnly={readOnly}
                isBlock={isBlock}
                size={size}
                label={label}
                helperText={helperText}
                type="search"
                value={value}
                onChange={handleOnChange}
                leadingIcon={{ icon: <Search /> }}
                trailingIcon={{ icon: <Clear />, callback: () => setValue('') }}
                reserveErrorMessageSpace={reserveErrorMessageSpace}
                {...(context && errorMessage
                    ? { context, errorMessage }
                    : { context: undefined, errorMessage: undefined })}
                {...rest}
            />
        );
    }
);

SearchInput.displayName = 'SearchInput';
