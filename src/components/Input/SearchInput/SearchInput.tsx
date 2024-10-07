import * as React from 'react';
import Search from '@material-design-icons/svg/round/search.svg';
import Clear from '@material-design-icons/svg/round/cancel.svg';

import { mergeRefs } from '../../../utils/mergeRefs';
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
            value,
            label,
            helperText,
            errorMessage,
            reserveErrorMessageSpace = false,
            ...rest
        },
        ref
    ) => {
        const inputRef = React.useRef<HTMLInputElement | null>(null);
        const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (rest.onChange) {
                rest.onChange(e);
            }
        };

        return (
            <Input
                ref={mergeRefs([ref, inputRef])}
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
                trailingIcon={{
                    icon: <Clear />,
                    callback: () => {
                        if (inputRef && 'current' in inputRef && inputRef.current) {
                            (inputRef.current as HTMLInputElement).value = '';
                            if (rest.onChange) {
                                rest.onChange({
                                    target: inputRef.current,
                                } as React.ChangeEvent<HTMLInputElement>);
                            }
                        }
                    },
                }}
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
