import * as React from 'react';
import Downshift from 'downshift';
import { createPortal } from 'react-dom';
import { bem } from '../../../utils/bem';
import { useBrowserTabVisibilityChange } from '../../../hooks';
import { FieldWrapper } from '../../FieldWrapper';
import { List } from '../../List';
import { Props } from './interfaces';
import styles from './SelectBase.scss';

const { block, elem } = bem('SelectBase', styles);

export function SelectBase<S>({
    suggestions,
    suggestionToString,
    clearTitle,
    showArrow = false,
    downArrowLabel,
    upArrowLabel,
    showClearButton = false,
    disabled,
    onFocus,
    onBlur,
    onSelectionAdd,
    onInputValueChange = () => null,
    onClearAllSelected,
    onOuterClick,
    inputRef: inputRefFromProps,
    rootRef: rootRefFromProps,
    listRef: listRefFromProps,
    className = '',
    listRenderer,
    focusedRenderer,
    blurredRenderer,
    keepExpandedAfterSelection = false,
    clearInputAfterSelection = false,
    highlightOnEmptyInput = true,
    initInputValue,
    autoFocus = false,
    shouldRenderWithPortal = false,
    ...rest
}: Props<S>) {
    const [inputRef, setInputRef] = React.useState(
        inputRefFromProps || React.createRef<HTMLInputElement>()
    );
    const [rootRef, setRootRef] = React.useState(
        rootRefFromProps || React.createRef<HTMLDivElement>()
    );
    const [listRef, setListRef] = React.useState(
        listRefFromProps || React.createRef<HTMLUListElement>()
    );

    const [dropdownStyles, setDropdownStyles] = React.useState({
        top: 0,
        left: 0,
        width: 0,
    });

    const calculateDropdownPosition = () => {
        if (rootRef.current) {
            const rect = rootRef.current.getBoundingClientRect();
            setDropdownStyles({
                top: rect.bottom + window.scrollY, // Position below the input field
                left: rect.left + window.scrollX, // Align left with the input field
                width: rect.width, // Match the width of the input field
            });
        }
    };

    const [inputValue, setInputValue] = React.useState(initInputValue || '');
    const [inputValueRecall, setInputValueRecall] = React.useState('');
    const [focused, setFocused] = React.useState(autoFocus);
    const isBrowserTabVisible = useBrowserTabVisibilityChange();

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

    React.useEffect(() => {
        setInputValue(initInputValue || '');
    }, [setInputValue, initInputValue]);

    React.useEffect(() => {
        if (focused) {
            calculateDropdownPosition();
        }

        const handleResize = () => {
            if (focused) {
                calculateDropdownPosition();
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [focused, rootRef]);

    const handleBlur = () => {
        setFocused(false);
        if (isBrowserTabVisible) {
            setInputValue(inputValue || initInputValue || '');
            setInputValueRecall(inputValue || initInputValue || '');
            if (focused) {
                onBlur?.();
            }
        }
    };

    const handleOuterClick = () => {
        onOuterClick?.();
        handleBlur();
    };

    const handleChange = (selectedItem, downshift) => {
        const { clearSelection, openMenu } = downshift;

        clearSelection();

        if (selectedItem) {
            onSelectionAdd(selectedItem);
        }

        if (clearInputAfterSelection) {
            setInputValue('');
            onInputValueChange?.('');
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

    const handleClearSelectedSuggestions = (e) => {
        e.stopPropagation();
        onClearAllSelected?.();
    };

    const focus = (openMenu) => {
        openMenu();
        setFocused(true);
    };

    const handleWrapperClick = (openMenu) => () => {
        if (!focused && !disabled) {
            focus(openMenu);
        }
    };

    const handleInputOnFocus = (openMenu) => () => {
        if (!focused) {
            focus(openMenu);
        }

        if (isBrowserTabVisible) {
            onFocus?.();
        }
    };

    const stateUpdater = (change, state) => {
        switch (change.type) {
            case Downshift.stateChangeTypes.blurInput:
                handleBlur();
                break;
            case Downshift.stateChangeTypes.clickButton:
                setFocused(change.isOpen);
                break;
            case Downshift.stateChangeTypes.changeInput:
                if (state.isOpen !== focused) {
                    setFocused(state.isOpen);
                }
                break;
            default:
                break;
        }
    };

    const stateReducer = (state, newChanges) => {
        const changes = {
            ...newChanges,
            isEscapeAction: false,
        };

        switch (newChanges.type) {
            case Downshift.stateChangeTypes.changeInput:
                return {
                    ...changes,
                    highlightedIndex: highlightOnEmptyInput || newChanges.inputValue ? 0 : -1,
                };
            case Downshift.stateChangeTypes.clickItem:
            case Downshift.stateChangeTypes.keyDownEnter:
                return {
                    ...changes,
                    highlightedIndex: state.highlightedIndex,
                    isOpen: keepExpandedAfterSelection,
                };
            case Downshift.stateChangeTypes.keyDownEscape:
                return {
                    ...changes,
                    isOpen: false,
                    isEscapeAction: true,
                };
            default:
                return changes;
        }
    };

    const stateAndProps = { focused };

    const getInputPropsWithUpdatedRef = (getInputProps) => (inputProps) =>
        inputRefFromProps
            ? getInputProps(inputProps)
            : getInputProps({ ...inputProps, ref: inputRef });

    return (
        <div {...rest} ref={rootRef} {...block({ ...stateAndProps, className })}>
            <Downshift
                onChange={handleChange}
                itemToString={suggestionToString}
                onOuterClick={handleOuterClick}
                stateReducer={stateReducer}
                onStateChange={stateUpdater}
                onInputValueChange={handleInputValueChange}
                inputValue={inputValue}
                defaultHighlightedIndex={highlightOnEmptyInput ? 0 : -1}
            >
                {({
                    getInputProps,
                    getMenuProps,
                    getItemProps,
                    getToggleButtonProps,
                    highlightedIndex,
                    openMenu,
                }) => {
                    const listContent =
                        focused && !disabled
                            ? listRenderer({
                                  suggestionToString,
                                  suggestions,
                                  getItemProps,
                                  highlightedIndex,
                                  inputValue: inputValueRecall,
                              })
                            : null;

                    const dropdownProps = getMenuProps({
                        ...elem('list', stateAndProps),
                        ref: listRef.current,
                        isControlledNavigation: true,
                    });

                    return (
                        <div {...elem('main', stateAndProps)}>
                            <FieldWrapper
                                showArrow={showArrow}
                                isArrowUp={focused}
                                onArrowClick={
                                    focused ? handleOuterClick : handleWrapperClick(openMenu)
                                }
                                clearTooltipLabel={clearTitle}
                                downArrowLabel={downArrowLabel}
                                upArrowLabel={upArrowLabel}
                                onClear={handleClearSelectedSuggestions}
                                showClearButton={!focused && showClearButton}
                                isFocused={focused && !disabled}
                                disabled={disabled}
                                onClick={handleWrapperClick(openMenu)}
                                {...elem('field', stateAndProps)}
                            >
                                {focused && !disabled
                                    ? focusedRenderer({
                                          getInputProps: getInputPropsWithUpdatedRef(getInputProps),
                                          getToggleButtonProps,
                                          onBlur: handleBlur,
                                          onFocus: handleInputOnFocus(openMenu),
                                          highlightedIndex,
                                          inputValue,
                                      })
                                    : blurredRenderer({
                                          getInputProps,
                                          getToggleButtonProps,
                                          onFocus: handleInputOnFocus(openMenu),
                                          onBlur: handleBlur,
                                      })}

                                {shouldRenderWithPortal ? (
                                    focused &&
                                    !disabled &&
                                    createPortal(
                                        <List
                                            {...dropdownProps}
                                            // implemented directly for elem not to override elem styles
                                            style={{
                                                position: 'absolute',
                                                top: dropdownStyles.top,
                                                left: dropdownStyles.left,
                                                width: dropdownStyles.width,
                                                zIndex: 700,
                                                background: 'var(--color-background)',
                                                border: '1px solid var(--color-neutral-30)',
                                                borderRadiusLeftBottom: 'var(--border-radius)',
                                                borderRadiusRightBottom: 'var(--border-radius)',
                                                boxSizing: 'border-box',
                                            }}
                                        >
                                            {listContent}
                                        </List>,
                                        document.body
                                    )
                                ) : (
                                    <List {...dropdownProps}>{listContent}</List>
                                )}
                            </FieldWrapper>
                        </div>
                    );
                }}
            </Downshift>
        </div>
    );
}

SelectBase.displayName = 'SelectBase';
