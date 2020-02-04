import * as React from 'react';
import Downshift from 'downshift';
import { bem } from '../../../utils/bem';
import { FieldWrapper } from '../../FieldWrapper';
import { List } from '../../List';
import { ENTER_KEY } from '../../../constants';
import { Props } from './interfaces';
import styles from './SelectBase.scss';

const { block, elem } = bem('SelectBase', styles);

export function SelectBase<S>(props: Props<S>) {
    const {
        suggestions,
        suggestionToString,
        clearTitle,
        showClearButton,
        onBlur,
        onSelectionChange,
        onInputValueChange,
        onClearAllSelected,
        inputRef: inputRefFromProps,
        rootRef: rootRefFromProps,
        listRef: listRefFromProps,
        listRenderer,
        focusedRenderer,
        blurredRenderer,
        keepExpandedAfterSelection,
        ...rest
    } = props;

    const [inputRef, setInputRef] = React.useState(
        inputRefFromProps || React.createRef<HTMLInputElement>()
    );
    const [rootRef, setRootRef] = React.useState(
        rootRefFromProps || React.createRef<HTMLDivElement>()
    );
    const [listRef, setListRef] = React.useState(
        listRefFromProps || React.createRef<HTMLUListElement>()
    );

    const [inputValue, setInputValue] = React.useState('');
    const [inputValueRecall, setInputValueRecall] = React.useState('');
    const [focused, setFocused] = React.useState(false);

    // focus input field if component is focused
    React.useEffect(() => {
        if (focused) {
            inputRef.current?.focus();
        }
    }, [focused, inputRef]);

    // update inputRef from props if changed
    React.useEffect(() => {
        if (inputRefFromProps) {
            setInputRef(inputRefFromProps);
        }
    }, [inputRefFromProps]);

    // update listRef from props if changed
    React.useEffect(() => {
        if (listRefFromProps) {
            setListRef(listRefFromProps);
        }
    }, [listRefFromProps]);

    // update rootRef from props if changed
    React.useEffect(() => {
        if (rootRefFromProps) {
            setRootRef(rootRefFromProps);
        }
    }, [rootRefFromProps]);

    const handleBlur = () => {
        setInputValue('');
        setInputValueRecall('');
        onBlur?.();
    };

    const handleChange = (selectedItem, downshift) => {
        const { clearSelection, openMenu } = downshift;

        setInputValue('');
        clearSelection();

        if (selectedItem) {
            onSelectionChange(selectedItem);
        }

        if (!keepExpandedAfterSelection) {
            handleBlur();
        } else {
            openMenu();
        }
    };

    const handleInputValueChange = (inputVal, changes) => {
        if (changes.type === Downshift.stateChangeTypes.changeInput) {
            setInputValue(inputVal);
            setInputValueRecall(inputVal);
            if (listRef.current) {
                listRef.current.scrollTop = 0;
            }

            onInputValueChange?.(inputVal);
        }
    };

    const handleClearSelectedSuggestions = e => {
        e.stopPropagation();
        onClearAllSelected?.();
    };

    const focus = openMenu => {
        openMenu();
        setFocused(true);
    };

    const handleWrapperClick = openMenu => () => {
        if (!focused) {
            focus(openMenu);
        }
    };

    const handleWrapperKeyDown = openMenu => e => {
        if (!focused && e.key === ENTER_KEY) {
            focus(openMenu);
        }
    };

    const stateReducer = (state, changes) => {
        switch (changes.type) {
            case Downshift.stateChangeTypes.clickItem:
            case Downshift.stateChangeTypes.keyDownEnter:
                return {
                    ...changes,
                    highlightedIndex: state.highlightedIndex,
                    isOpen: keepExpandedAfterSelection,
                };
            default:
                return changes;
        }
    };

    const stateUpdater = (change, state) => {
        if (state.isOpen !== focused) {
            setFocused(state.isOpen);
        }
    };

    const stateAndProps = { props, focused };

    const getInputPropsWithUpdatedRef = getInputProps => inputProps => {
        return inputRefFromProps
            ? getInputProps(inputProps)
            : getInputProps({ ...inputProps, ref: inputRef });
    };

    return (
        <div {...rest} ref={rootRef} {...block(stateAndProps)}>
            <Downshift
                onChange={handleChange}
                itemToString={suggestionToString}
                onOuterClick={handleBlur}
                stateReducer={stateReducer}
                onStateChange={stateUpdater}
                onInputValueChange={handleInputValueChange}
                inputValue={inputValue}
                defaultHighlightedIndex={0}
            >
                {({
                    getInputProps,
                    getMenuProps,
                    getItemProps,
                    getToggleButtonProps,
                    highlightedIndex,
                    openMenu,
                }) => (
                    <div {...elem('main', stateAndProps)}>
                        <FieldWrapper
                            clearLabel={clearTitle}
                            onClear={handleClearSelectedSuggestions}
                            showClearButton={!focused && showClearButton}
                            isFocused={focused}
                            onClick={handleWrapperClick(openMenu)}
                            onKeyDown={handleWrapperKeyDown(openMenu)}
                            {...elem('field', stateAndProps)}
                        >
                            {focused
                                ? focusedRenderer({
                                      getInputProps: getInputPropsWithUpdatedRef(getInputProps),
                                      getToggleButtonProps,
                                      onBlur: handleBlur,
                                      inputValue,
                                  })
                                : blurredRenderer({ getInputProps, getToggleButtonProps })}
                            <List
                                {...getMenuProps({
                                    ...elem('list', stateAndProps),
                                    ref: listRef.current,
                                    isControlledNavigation: true,
                                })}
                            >
                                {focused
                                    ? listRenderer({
                                          suggestionToString,
                                          suggestions,
                                          getItemProps,
                                          highlightedIndex,
                                          inputValue: inputValueRecall,
                                      })
                                    : null}
                            </List>
                        </FieldWrapper>
                    </div>
                )}
            </Downshift>
        </div>
    );
}

SelectBase.defaultProps = {
    showClearButton: false,
    keepExpandedAfterSelection: false,
    clearTitle: '',
};

SelectBase.displayName = 'SelectBase';
