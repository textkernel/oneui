import * as React from 'react';
import { useSelect } from 'downshift';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { bem } from '../../../utils/bem/bem';
import { FieldWrapper } from '../../FieldWrapper';
import { List } from '../../List';
import { BasicSelectProps } from '../SelectBase';
import { SuggestionsList } from '../SuggestionsList';
import styles from './Select.scss';

const { block, elem } = bem('Select', styles);

interface Props<S> extends Omit<BasicSelectProps<S>, 'isProminent'> {
    /** The suggestions that is currently selected */
    selectedSuggestion: S;
}

export function Select<S>(props: Props<S>) {
    const {
        suggestions,
        selectedSuggestion,
        suggestionToString,
        suggestionItemRenderer,
        onSelectionAdd,
        onBlur,
        onFocus,
        rootRef,
        listRef,
        ...rest
    } = props;

    const handleSelection = (state) => {
        onSelectionAdd(state.selectedItem);
        onBlur?.();
    };

    const {
        isOpen,
        getToggleButtonProps,
        getMenuProps,
        highlightedIndex,
        getItemProps,
    } = useSelect({
        items: suggestions,
        selectedItem: selectedSuggestion,
        onSelectedItemChange: handleSelection,
    });

    const handleToggle = (e) => {
        e?.stopPropagation();
        if (isOpen) {
            onBlur?.();
        } else {
            onFocus?.();
        }
    };

    return (
        <div ref={rootRef} {...rest} {...block({})}>
            <div {...elem('main', { isOpen })}>
                <FieldWrapper isFocused={isOpen} {...elem('field', {})}>
                    <div
                        tabIndex={0}
                        role="searchbox"
                        {...elem('wrapper', { isOpen })}
                        {...getToggleButtonProps({ onClick: handleToggle })}
                    >
                        <span {...elem('selected', {})}>
                            {suggestionToString(selectedSuggestion)}
                        </span>
                        {isOpen ? (
                            <IoMdArrowDropup {...elem('dropdownIcon', {})} />
                        ) : (
                            <IoMdArrowDropdown {...elem('dropdownIcon', {})} />
                        )}
                    </div>
                    <List
                        {...getMenuProps({ ref: listRef })}
                        {...elem('list', { isOpen })}
                        isControlledNavigation
                    >
                        {isOpen ? (
                            <SuggestionsList
                                suggestionToString={suggestionToString}
                                suggestionItemRenderer={suggestionItemRenderer}
                                suggestions={suggestions}
                                getItemProps={getItemProps}
                                highlightedIndex={highlightedIndex}
                            />
                        ) : null}
                    </List>
                </FieldWrapper>
            </div>
        </div>
    );
}

Select.displayName = 'Select';
