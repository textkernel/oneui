import * as React from 'react';
import Search from '@material-design-icons/svg/round/search.svg';
import Clear from '@material-design-icons/svg/round/cancel.svg';

import { Input, Props } from '../Input';

export const SearchInput = React.forwardRef<HTMLInputElement, Props>(
    (
        {
            id,
            children,
            context = undefined,
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

        return (
            <Input
                ref={ref}
                disabled={disabled}
                readOnly={readOnly}
                isBlock={isBlock}
                context={context}
                size={size}
                label={label}
                helperText={helperText}
                type="search"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                leadingIcon={<Search />}
                trailingIcon={{ icon: <Clear />, callback: () => setValue('') }}
                reserveErrorMessageSpace={reserveErrorMessageSpace}
                errorMessage={errorMessage}
                {...rest}
            />
        );
    }
);

SearchInput.displayName = 'SearchInput';
