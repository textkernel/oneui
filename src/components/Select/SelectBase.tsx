import * as React from 'react';
import Downshift, { GetItemPropsOptions, GetToggleButtonPropsOptions } from 'downshift';
import bem from '../../utils/bem';
import FieldWrapper from '../FieldWrapper';
import { List } from '../List';
import { ENTER_KEY } from '../../constants';
import { Props as ListRendererProps } from './SuggestionsList';
import styles from './SelectBase.scss';

export interface Props<S> extends React.HTMLAttributes<HTMLDivElement> {
    /** an array of objects that will be used to render the suggestions list. */
    suggestions: S[];
    /** suggestionToString(suggestion) should return a string to be displayed in the UI. e.g.: suggestion => suggestion.name */
    suggestionToString: (suggestions?: S | null) => string;
    /** to be shown when no suggestions are available */
    noSuggestionsPlaceholder: string;
    /** to be shown as clear button title */
    clearTitle?: string;
    /** input field ref */
    inputRef?: React.RefObject<HTMLInputElement>;
    /** root wrapper ref */
    rootRef?: React.RefObject<HTMLDivElement>;
    /** suggestions list ref */
    listRef?: React.RefObject<HTMLUListElement>;
    /** onBlur() is called when the component is blurred */
    onBlur?: () => void;
    /** onSelectionChange() called when a suggestion is selected or removed */
    onSelectionChange: (item: S) => void;
    /** onInputValueChange(inputValue) called when the input values is changed. Can be used to implement the component as controlled component */
    onInputValueChange: (value: string) => void;
    /** function to be called if FieldWrapper clear button is clicked */
    onClearAllSelected?: () => void;
    /** show Clear button on hover even if there are no selectedSuggestions passed */
    showClearButton?: boolean;
    /** should this component stay focused after a selection made. Useful to implement multi-select components */
    keepExpandedAfterSelection?: boolean;
    /** will be called when list of suggestions should be rendered */
    listRenderer: (props: ListRendererProps<S>) => ReactNode;
    /** a function that renders the top part of the component when it is focused  */
    focusedRenderer: (helpers: {
        getInputProps: (options: GetItemPropsOptions<S>) => object;
        getToggleButtonProps: (options: GetToggleButtonPropsOptions) => object;
        onBlur: () => void;
        inputValue: string;
    }) => ReactNode;
    /** a function that renders the top part of the component when it is blurred  */
    blurredRenderer: (helpers: {
        getInputProps: (options: GetItemPropsOptions<S>) => object;
        getToggleButtonProps: (options: GetToggleButtonPropsOptions) => object;
    }) => ReactNode;
}

const { block, elem } = bem('SelectBase', styles);

function SelectBase<S>(props: Props<S>) {
    const {
        suggestions,
        suggestionToString,
        clearTitle,
        showClearButton,
        noSuggestionsPlaceholder,
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
        inputRef.current?.focus();
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
            case Downshift.stateChangeTypes.keyDownEnter:
                return {
                    ...changes,
                    highlightedIndex: state.highlightedIndex,
                    isOpen: keepExpandedAfterSelection,
                };
            case Downshift.stateChangeTypes.clickItem:
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
                                      getInputProps,
                                      getToggleButtonProps,
                                      onBlur: handleBlur,
                                      inputValue,
                                  })
                                : blurredRenderer({ getInputProps, getToggleButtonProps })}
                            <List
                                {...getMenuProps({
                                    ...elem('list', stateAndProps),
                                    ref: listRef,
                                    isControlledNavigation: true,
                                })}
                            >
                                {focused
                                    ? listRenderer({
                                          suggestionToString,
                                          suggestions,
                                          noSuggestionsPlaceholder,
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

export default SelectBase;
