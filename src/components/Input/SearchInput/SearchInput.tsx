import * as React from 'react';
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
            value,
            label,
            helperText,
            errorMessage,
            reserveErrorMessageSpace = false,
            ...rest
        },
        ref
    ) => (
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
            leadingIcon
            deleteButton
            reserveErrorMessageSpace={reserveErrorMessageSpace}
            {...rest}
        />
    )
);

SearchInput.displayName = 'SearchInput';
