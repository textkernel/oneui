/* eslint-disable react/sort-comp */
import React from 'react';
import Downshift from 'downshift';

class MultiDownshift extends React.Component {
    constructor() {
        super();
        this.state = { selectedItems: [] };

        this.handleSelection = this.handleSelection.bind(this);
        this.getStateAndHelpers = this.getStateAndHelpers.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.getRemoveButtonProps = this.getRemoveButtonProps.bind(this);
    }

    static stateReducer(state, changes) {
        switch (changes.type) {
            case Downshift.stateChangeTypes.keyDownEnter:
            case Downshift.stateChangeTypes.clickItem:
                return {
                    ...changes,
                    highlightedIndex: state.highlightedIndex,
                    isOpen: true,
                    inputValue: ''
                };
            default:
                return changes;
        }
    }

    handleSelection(selectedItem, downshift) {
        const { selectedItems } = this.state;
        const callOnChange = () => {
            const { onSelect, onChange } = this.props;
            if (onSelect) {
                onSelect(selectedItems, this.getStateAndHelpers(downshift));
            }
            if (onChange) {
                onChange(selectedItems, this.getStateAndHelpers(downshift));
            }
        };
        if (selectedItems.includes(selectedItem)) {
            this.removeItem(selectedItem, callOnChange);
        } else {
            this.addSelectedItem(selectedItem, callOnChange);
        }
    }

    removeItem(item, cb) {
        this.setState(
            ({ selectedItems }) => ({
                selectedItems: selectedItems.filter(i => i !== item)
            }),
            cb
        );
    }

    addSelectedItem(item, cb) {
        this.setState(
            ({ selectedItems }) => ({
                selectedItems: [...selectedItems, item]
            }),
            cb
        );
    }

    getRemoveButtonProps({ onClick, item, ...props } = {}) {
        return {
            onClick: e => {
                // TODO: use something like downshift's composeEventHandlers utility instead
                if (onClick) {
                    onClick(e);
                }
                e.stopPropagation();
                this.removeItem(item);
            },
            ...props
        };
    }

    getStateAndHelpers(downshift) {
        const { selectedItems } = this.state;
        const { getRemoveButtonProps, removeItem } = this;
        return {
            getRemoveButtonProps,
            removeItem,
            selectedItems,
            ...downshift
        };
    }

    render() {
        const { render, children = render, ...props } = this.props;
        // TODO: compose together props (rather than overwriting them) like downshift does
        return (
            <Downshift
                {...props}
                stateReducer={this.constructor.stateReducer}
                onChange={this.handleSelection}
                selectedItem={null}
            >
                {downshift => children(this.getStateAndHelpers(downshift))}
            </Downshift>
        );
    }
}

export default MultiDownshift;
