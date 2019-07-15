import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import Downshift from 'downshift';
import memoize from 'fast-memoize';
import { List, ListItem, ContentPlaceholder, Text, InputWrapper } from '../../index';
import ItemTag from './ItemTag';
import styles from './Autocomplete.scss';
import { NUMBER_OF_SUGGESTION_LOADING_PLACEHOLDERS } from '../../constants';

const { block, elem } = bem({
    name: 'Autocomplete',
    classnames: styles,
    propsToMods: ['focused', 'isOpen']
});

class Autocomplete extends React.Component {
    constructor() {
        super();
        this.inputRef = React.createRef();
        this.rootRef = React.createRef();
        this.state = {
            inputValue: '',
            focused: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
        this.handleInputValueChange = this.handleInputValueChange.bind(this);
        this.handleClearSelectedSuggestions = this.handleClearSelectedSuggestions.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.renderTags = this.renderTags.bind(this);
        this.stateUpdater = this.stateUpdater.bind(this);
        this.stateReducer = this.stateReducer.bind(this);
    }

    handleChange(selectedItem) {
        const { onSelectionChange } = this.props;

        this.setState({ inputValue: '' });
        onSelectionChange(selectedItem);
    }

    handleInputKeyDown(event) {
        const { onSelectionChange, selectedSuggestions } = this.props;
        if (
            event.key === 'Backspace' &&
            !event.target.value &&
            selectedSuggestions &&
            selectedSuggestions.length
        ) {
            // remove the last input
            onSelectionChange(selectedSuggestions[selectedSuggestions.length - 1]);
        } else if (['Escape', 'Tab'].includes(event.key)) {
            this.inputRef.current.blur();
            this.handleBlur();
        }
    }

    handleInputValueChange(inputValue, changes) {
        const { onInputValueChange } = this.props;
        if (changes.type === Downshift.stateChangeTypes.changeInput) {
            this.setState({ inputValue });
            const listEl = document.querySelector(`.${styles.list}`);
            if (listEl) {
                listEl.scrollTop = 0;
            }
            if (onInputValueChange) {
                onInputValueChange(inputValue);
            }
        }
    }

    handleClearSelectedSuggestions(e) {
        const { clearSelectedSuggestions } = this.props;

        e.stopPropagation();
        clearSelectedSuggestions();
    }

    handleBlur() {
        const { onBlur } = this.props;

        this.setState({ inputValue: '' });
        if (onBlur) {
            onBlur();
        }
    }

    focus(openMenu) {
        openMenu();
        this.inputRef.current.focus();
    }

    stateReducer(state, changes) {
        const { isMultiselect } = this.props;

        switch (changes.type) {
            case Downshift.stateChangeTypes.keyDownEnter:
                return {
                    ...changes,
                    highlightedIndex: state.highlightedIndex,
                    isOpen: isMultiselect
                };
            case Downshift.stateChangeTypes.clickItem:
                return {
                    ...changes,
                    isOpen: isMultiselect
                };
            default:
                return changes;
        }
    }

    stateUpdater(change, state) {
        const { focused } = this.state;
        if (state.isOpen !== focused) {
            this.setState({ focused: state.isOpen });
        }
    }

    renderTags(isOpen) {
        const {
            selectedPlaceholder,
            suggestionToString,
            selectedSuggestions,
            onSelectionChange
        } = this.props;

        if (!isOpen) {
            return selectedPlaceholder ? (
                <div {...elem('spacedElem', { ...this.props, ...this.state, isOpen })}>
                    {selectedPlaceholder}
                </div>
            ) : null;
        }

        if (selectedSuggestions && selectedSuggestions.length > 0) {
            const onClick = memoize(item => e => {
                e.stopPropagation();
                onSelectionChange(item);
                this.inputRef.current.focus();
            });

            return selectedSuggestions.map(item => (
                <ItemTag key={suggestionToString(item)} onClick={onClick(item)}>
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
            noSuggestionsPlaceholder
        } = this.props;
        const { inputValue } = this.state;

        if (isLoading) {
            return new Array(NUMBER_OF_SUGGESTION_LOADING_PLACEHOLDERS).fill('').map((el, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <ListItem key={i}>
                    <div {...elem('placeholderContainer', { ...this.props, ...this.state })}>
                        <ContentPlaceholder />
                    </div>
                </ListItem>
            ));
        }

        const suggestions = getSuggestions(inputValue);

        if (!suggestions || !suggestions.length) {
            return inputValue ? (
                <ListItem disabled>
                    <Text context="muted">{noSuggestionsPlaceholder}</Text>
                </ListItem>
            ) : null;
        }

        return suggestions.map((item, index) => (
            <ListItem
                key={suggestionToString(item)}
                {...getItemProps({
                    item,
                    index,
                    isSelected: highlightedIndex === index,
                    highlightContext: 'brand'
                })}
            >
                {suggestionToString(item)}
            </ListItem>
        ));
    }

    render() {
        const {
            selectedPlaceholder,
            suggestionToString,
            inputPlaceholder,
            clearTitle,
            showClearButton,
            iconNode,
            // props not used here, but listed to clear the ...rest
            selectedSuggestions,
            getSuggestions,
            isLoading,
            noSuggestionsPlaceholder,
            onBlur,
            onSelectionChange,
            onInputValueChange,
            clearSelectedSuggestions,
            isMultiselect,
            ...rest
        } = this.props;
        const { inputValue, focused } = this.state;

        // eslint-disable-next-line no-unused-vars
        const wrapperOnClick = memoize(openMenu => e => {
            this.focus(openMenu);
        });
        const wrapperOnKeyDown = memoize(openMenu => e => {
            if (e.key === 'Enter') {
                this.focus(openMenu);
            }
        });

        const hideInputPlaceholder = isOpen => !isOpen && !!selectedPlaceholder;

        return (
            <Downshift
                onChange={this.handleChange}
                itemToString={suggestionToString}
                onOuterClick={this.handleBlur}
                stateReducer={this.constructor.stateReducer}
                onStateChange={this.stateUpdater}
                onInputValueChange={this.handleInputValueChange}
                inputValue={inputValue}
                defaultHighlightedIndex={0}
            >
                {({
                    getRootProps,
                    getInputProps,
                    getMenuProps,
                    isOpen,
                    getItemProps,
                    highlightedIndex,
                    openMenu
                }) => (
                    <InputWrapper
                        clearLabel={clearTitle}
                        onClear={this.handleClearSelectedSuggestions}
                        showClearButton={showClearButton}
                        isFocused={focused}
                        {...rest}
                        {...block({ ...this.props, ...this.state, isOpen })}
                        {...getRootProps({ refKey: 'ref' })}
                    >
                        <div
                            tabIndex="0"
                            onClick={wrapperOnClick(openMenu)}
                            onKeyDown={wrapperOnKeyDown(openMenu)}
                            role="searchbox"
                            {...elem('wrapper', { ...this.props, ...this.state, isOpen })}
                        >
                            {iconNode &&
                                React.cloneElement(
                                    iconNode,
                                    elem('spacedElem', { ...this.props, ...this.state, isOpen })
                                )}
                            {this.renderTags(isOpen)}
                            <input
                                {...getInputProps({
                                    ref: this.inputRef,
                                    onKeyDown: this.handleInputKeyDown,
                                    placeholder: hideInputPlaceholder(isOpen)
                                        ? ''
                                        : inputPlaceholder,
                                    ...elem('input', { ...this.props, ...this.state, isOpen })
                                })}
                            />
                        </div>
                        <List
                            {...getMenuProps({
                                ...elem('list', { ...this.props, ...this.state, isOpen })
                            })}
                        >
                            {isOpen
                                ? this.renderSuggestions({
                                      getItemProps,
                                      highlightedIndex
                                  })
                                : null}
                        </List>
                    </InputWrapper>
                )}
            </Downshift>
        );
    }
}

Autocomplete.propTypes = {
    /** array of already selected suggestions */
    selectedSuggestions: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    /** getSuggestions(inputValue) => should return an array of objects that will be used to render the suggestions list. */
    getSuggestions: PropTypes.func.isRequired,
    /** suggestionToString(suggestion) should return a string to be displayed in the UI. e.g.: suggestion => suggestion.name */
    suggestionToString: PropTypes.func.isRequired,
    /** if suggestions are still loading, i.e. display palceholders */
    isLoading: PropTypes.bool,
    /** a string or function (to be called with selectedValues) that represents the selected values when the component is blured */
    selectedPlaceholder: PropTypes.string,
    /** to be shown in the input field when no value is typed */
    inputPlaceholder: PropTypes.string.isRequired,
    /** to be shown when no suggestions are available */
    noSuggestionsPlaceholder: PropTypes.string.isRequired,
    /** to be shown as clear button title */
    clearTitle: PropTypes.string.isRequired,
    /** onBlur() is called when the component is blurred */
    onBlur: PropTypes.func,
    /** onSelectionChange() called when a suggestion is seelcted or removed. Can be used to implement the component as controlled component */
    onSelectionChange: PropTypes.func.isRequired,
    /** onInputValueChange(inputValue) called when the input values is changed. Can be used to implement the component as controlled component */
    onInputValueChange: PropTypes.func,
    /** reset the selected suggestions array to it's default value */
    clearSelectedSuggestions: PropTypes.func.isRequired,
    /** show Clear button on hover even if there are no selectedSuggestions passed */
    showClearButton: PropTypes.bool,
    /** an icon or other node to always be rendered as a first element inside the input box */
    iconNode: PropTypes.node,
    /** should this component behaive as a multiselect (e.g. no collapse after selection made) */
    isMultiselect: PropTypes.bool
};

Autocomplete.defaultProps = {
    selectedSuggestions: null,
    isLoading: false,
    onBlur: null,
    onInputValueChange: null,
    showClearButton: false,
    selectedPlaceholder: '',
    iconNode: null,
    isMultiselect: false
};

Autocomplete.displayName = 'Autocomplete';

export default Autocomplete;
