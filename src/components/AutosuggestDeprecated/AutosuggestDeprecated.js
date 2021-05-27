import * as React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import memoize from 'fast-memoize';
import { bem } from '../../utils';
import { Text, MarkedText } from '../Text';
import { FieldWrapper } from '../FieldWrapper';
import { ContentPlaceholder } from '../ContentPlaceholder';
import { List, ListItem } from '../List';
import { ItemTag } from './ItemTag';
import styles from './AutosuggestDeprecated.scss';
import {
    NUMBER_OF_SUGGESTION_LOADING_PLACEHOLDERS,
    BACKSPACE_KEY,
    ESCAPE_KEY,
    TAB_KEY,
    ENTER_KEY,
} from '../../constants';

const FOCUS_DELAY = 250;

const { block, elem } = bem('AutosuggestDeprecated', styles);

export class AutosuggestDeprecated extends React.Component {
    constructor(props) {
        super(props);

        this.inputWrapperRef = React.createRef();
        this.inputRef = props.inputRef || React.createRef();
        this.rootRef = props.rootRef || React.createRef();
        this.listRef = props.listRef || React.createRef();

        this.handleTagDeleteClick = memoize(this.handleTagDeleteClick);
        this.handleWrapperClick = memoize(this.handleWrapperClick);
        this.handleWrapperKeyDown = memoize(this.handleWrapperKeyDown);

        this.state = {
            inputValue: props.defaultInputValue,
            inputValueRecall: '',
            focused: props.isFocused,
        };
    }

    componentDidMount() {
        const { isFocused } = this.props;

        if (isFocused) {
            this.inputRef.current?.focus();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { inputRef, rootRef, listRef } = this.props;

        if (inputRef && inputRef !== this.inputRef) {
            this.inputRef = inputRef;
        }

        if (rootRef && rootRef !== this.rootRef) {
            this.rootRef = rootRef;
        }

        if (listRef && listRef !== this.listRef) {
            this.listRef = listRef;
        }

        if (this.inputRef?.current) {
            const isInputFocused = this.inputRef.current === document.activeElement;

            if (!prevState.focused && isInputFocused) {
                setTimeout(() => {
                    // eslint-disable-next-line react/no-did-update-set-state
                    this.setState({ focused: isInputFocused });
                }, FOCUS_DELAY);
            }
        }
    }

    handleChange = (selectedItem, downshift) => {
        const { suggestionToString, onSelectionChange, saveSelectedValueToInput, isMultiselect } =
            this.props;
        const { clearSelection, openMenu } = downshift;

        clearSelection();

        if (selectedItem) {
            this.setState({
                inputValue: saveSelectedValueToInput ? suggestionToString(selectedItem) : '',
            });
            onSelectionChange(selectedItem);
        }

        if (!isMultiselect) {
            this.inputWrapperRef?.current.focus();
            this.handleBlur();
        } else {
            openMenu();
        }
    };

    handleInputKeyDown = (event) => {
        const { onSelectionChange, getSuggestions, selectedSuggestions } = this.props;

        if (
            event.key === BACKSPACE_KEY &&
            !event.target.value &&
            selectedSuggestions &&
            !!selectedSuggestions.length
        ) {
            // remove the last input
            onSelectionChange(selectedSuggestions[selectedSuggestions.length - 1]);
        } else if (event.key === TAB_KEY) {
            this.inputRef.current.blur();
            this.handleBlur();
        } else if (event.key === ESCAPE_KEY) {
            // prevents key propagation and sets the focus on parent component
            this.inputRef.current.blur();
            this.handleBlur();
            this.inputRef.current.parentElement.focus();
            event.stopPropagation();
        } else if (event.key === ENTER_KEY) {
            // prevents key propagation when there are suggestions in the dropdown
            if (Array.isArray(getSuggestions) && getSuggestions.length > 0) {
                event.stopPropagation();
            }
        }
    };

    handleInputValueChange = (inputValue, changes) => {
        const { onInputValueChange } = this.props;
        if (changes.type === Downshift.stateChangeTypes.changeInput) {
            this.setState({ inputValue, inputValueRecall: inputValue });
            if (this.listRef.current) {
                this.listRef.current.scrollTop = 0;
            }
            if (onInputValueChange) {
                onInputValueChange(inputValue);
            }
        }
    };

    handleClearSelectedSuggestions = (e) => {
        const { onClearAllSelected } = this.props;

        e.stopPropagation();
        this.setState({ inputValue: '' });
        this.inputWrapperRef?.current.focus();
        if (onClearAllSelected) {
            onClearAllSelected();
        }
    };

    handleBlur = () => {
        const { saveSelectedValueToInput, onBlur } = this.props;

        if (!saveSelectedValueToInput) {
            this.setState({ inputValue: '', inputValueRecall: '' });
        }

        if (onBlur) {
            onBlur();
        }
    };

    handleInputBlur = () => {
        this.setState({ focused: false });
    };

    handleTagDeleteClick = (item) => {
        const { onSelectionChange } = this.props;

        return (e) => {
            e.stopPropagation();
            onSelectionChange(item);
            this.inputRef.current?.focus();
        };
    };

    handleWrapperClick = (openMenu) => () => {
        const { focused } = this.state;
        if (!focused) {
            this.focus(openMenu);
        }
    };

    handleWrapperKeyDown = (openMenu) => (e) => {
        const { focused } = this.state;
        if (!focused && e.key === ENTER_KEY) {
            this.focus(openMenu);
        }
    };

    stateReducer = (state, changes) => {
        const { isMultiselect } = this.props;

        switch (changes.type) {
            case Downshift.stateChangeTypes.keyDownEnter:
            case Downshift.stateChangeTypes.clickItem:
                return {
                    ...changes,
                    highlightedIndex: state.highlightedIndex,
                    isOpen: isMultiselect,
                };
            default:
                return changes;
        }
    };

    stateUpdater = (change, state) => {
        const { focused } = this.state;
        if (state.isOpen !== focused) {
            this.setState({ focused: state.isOpen });
        }
    };

    focus(openMenu) {
        openMenu();
        this.inputRef.current?.focus();
    }

    renderTags() {
        const { selectedPlaceholder, suggestionToString, selectedSuggestions } = this.props;
        const { focused } = this.state;

        if (!focused) {
            return selectedPlaceholder ? (
                <div {...elem('spacedElem', { ...this.props, ...this.state })}>
                    {selectedPlaceholder}
                </div>
            ) : null;
        }

        if (selectedSuggestions && !!selectedSuggestions.length) {
            return selectedSuggestions.map((item) => (
                <ItemTag key={suggestionToString(item)} onClick={this.handleTagDeleteClick(item)}>
                    {suggestionToString(item)}
                </ItemTag>
            ));
        }

        return null;
    }

    renderSuggestions({ getItemProps, highlightedIndex }) {
        const {
            isLoading,
            suggestionToString,
            getSuggestions,
            noSuggestionsPlaceholder,
            listRenderer,
        } = this.props;
        const { inputValue, inputValueRecall } = this.state;

        if (isLoading) {
            return new Array(NUMBER_OF_SUGGESTION_LOADING_PLACEHOLDERS).fill('').map((el, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <ListItem key={i}>
                    <div {...elem('loaderContainer', { ...this.props, ...this.state })}>
                        <ContentPlaceholder />
                    </div>
                </ListItem>
            ));
        }

        const suggestions =
            typeof getSuggestions === 'function' ? getSuggestions(inputValue) : getSuggestions;

        if (!suggestions || !suggestions.length) {
            return inputValue && inputValueRecall === inputValue ? (
                <ListItem disabled>
                    <Text context="muted">{noSuggestionsPlaceholder}</Text>
                </ListItem>
            ) : null;
        }

        const defaultListRenderer = () =>
            suggestions.map((item, index) => (
                <ListItem
                    key={suggestionToString(item)}
                    {...getItemProps({
                        item,
                        index,
                        isHighlighted: highlightedIndex === index,
                    })}
                >
                    <MarkedText marker={inputValueRecall} inline>
                        {suggestionToString(item)}
                    </MarkedText>
                </ListItem>
            ));

        return listRenderer
            ? listRenderer({
                  suggestions,
                  getItemProps,
                  highlightedIndex,
                  listInputValue: inputValueRecall,
              })
            : defaultListRenderer();
    }

    render() {
        const {
            selectedPlaceholder,
            suggestionToString,
            defaultInputValue,
            inputPlaceholder,
            clearTitle,
            showClearButton,
            iconNode,
            selectedSuggestions,
            getSuggestions,
            isLoading,
            isFocused,
            saveSelectedValueToInput,
            noSuggestionsPlaceholder,
            onBlur,
            onSelectionChange,
            onInputValueChange,
            onClearAllSelected,
            inputRef,
            rootRef,
            listRef,
            isMultiselect,
            isProminent,
            listRenderer,
            ...rest
        } = this.props;
        const { inputValue, focused } = this.state;

        const stateAndProps = { ...this.props, ...this.state };
        const hideInputPlaceholder = !focused && !!selectedPlaceholder;
        const doShowClearButton = saveSelectedValueToInput
            ? showClearButton && inputValue.length > 0 && !focused
            : showClearButton && !!selectedSuggestions && !!selectedSuggestions.length && !focused;

        return (
            <div {...rest} ref={this.rootRef} {...block(stateAndProps)}>
                <Downshift
                    onChange={this.handleChange}
                    itemToString={suggestionToString}
                    onOuterClick={this.handleBlur}
                    stateReducer={this.stateReducer}
                    onStateChange={this.stateUpdater}
                    onInputValueChange={this.handleInputValueChange}
                    inputValue={inputValue}
                    defaultHighlightedIndex={0}
                >
                    {({
                        getInputProps,
                        getMenuProps,
                        getItemProps,
                        highlightedIndex,
                        openMenu,
                    }) => (
                        <div {...elem('main', stateAndProps)}>
                            <FieldWrapper
                                clearLabel={clearTitle}
                                onClear={this.handleClearSelectedSuggestions}
                                showClearButton={doShowClearButton}
                                isFocused={focused}
                                onClick={this.handleWrapperClick(openMenu)}
                                onKeyDown={this.handleWrapperKeyDown(openMenu)}
                                {...elem('field', stateAndProps)}
                            >
                                <div
                                    tabIndex="0"
                                    role="searchbox"
                                    ref={this.inputWrapperRef}
                                    {...elem('wrapper', stateAndProps)}
                                >
                                    {iconNode &&
                                        React.cloneElement(
                                            iconNode,
                                            elem('spacedElem', {
                                                elemClassName: iconNode.props.className,
                                            })
                                        )}
                                    {this.renderTags()}
                                    <input
                                        {...getInputProps({
                                            ref: this.inputRef,
                                            onBlur: this.handleInputBlur,
                                            placeholder: hideInputPlaceholder
                                                ? ''
                                                : inputPlaceholder,
                                            'data-lpignore': true,
                                            onKeyDown: this.handleInputKeyDown,
                                            ...elem('input', stateAndProps),
                                        })}
                                    />
                                </div>
                                <List
                                    {...getMenuProps({
                                        ...elem('list', stateAndProps),
                                        ref: (e) => {
                                            this.listRef.current = e;
                                        },
                                        isControlledNavigation: true,
                                    })}
                                >
                                    {focused
                                        ? this.renderSuggestions({
                                              getItemProps,
                                              highlightedIndex,
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
}

AutosuggestDeprecated.propTypes = {
    /** array of already selected suggestions */
    selectedSuggestions: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    /** getSuggestions(inputValue) => an array of objects that will be used to render the suggestions list. */
    getSuggestions: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    /** suggestionToString(suggestion) should return a string to be displayed in the UI. e.g.: suggestion => suggestion.name */
    suggestionToString: PropTypes.func.isRequired,
    /** if suggestions are still loading, i.e. display placeholders */
    isLoading: PropTypes.bool,
    /** trigger of the initial focus of the input field */
    isFocused: PropTypes.bool,
    /** a string or function (to be called with selectedValues) that represents the selected values when the component is blurred */
    selectedPlaceholder: PropTypes.string,
    /** default input value */
    defaultInputValue: PropTypes.string,
    /** to be shown in the input field when no value is typed */
    inputPlaceholder: PropTypes.string.isRequired,
    /** to be shown when no suggestions are available */
    noSuggestionsPlaceholder: PropTypes.string.isRequired,
    /** to be shown as clear button title */
    clearTitle: PropTypes.string,
    /** input field ref */
    inputRef: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    /** root wrapper ref */
    rootRef: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    /** suggestions list ref */
    listRef: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    /** onBlur() is called when the component is blurred */
    onBlur: PropTypes.func,
    /** onSelectionChange() called when a suggestion is selected or removed. Can be used to implement the component as controlled component */
    onSelectionChange: PropTypes.func.isRequired,
    /** onInputValueChange(inputValue) called when the input values is changed. Can be used to implement the component as controlled component */
    onInputValueChange: PropTypes.func,
    /** reset the selected suggestions array to it's default value */
    onClearAllSelected: PropTypes.func,
    /** show Clear button on hover even if there are no selectedSuggestions passed */
    showClearButton: PropTypes.bool,
    /** display selected value as input value */
    saveSelectedValueToInput: PropTypes.bool,
    /** an icon or other node to always be rendered as a first element inside the input box */
    iconNode: PropTypes.node,
    /** should this component behave as a multiselect (e.g. no collapse after selection made) */
    isMultiselect: PropTypes.bool,
    /** style the component to be prominent */
    isProminent: PropTypes.bool,
    /** custom render function for listing suggestions */
    listRenderer: PropTypes.func,
};

AutosuggestDeprecated.defaultProps = {
    getSuggestions: null,
    selectedSuggestions: null,
    isLoading: false,
    isFocused: false,
    inputRef: null,
    rootRef: null,
    listRef: null,
    onBlur: null,
    onInputValueChange: null,
    onClearAllSelected: null,
    showClearButton: false,
    saveSelectedValueToInput: false,
    defaultInputValue: '',
    selectedPlaceholder: '',
    iconNode: null,
    isMultiselect: false,
    isProminent: false,
    listRenderer: null,
    clearTitle: '',
};

AutosuggestDeprecated.displayName = 'AutosuggestDeprecated';
