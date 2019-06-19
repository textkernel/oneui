/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions,
prettier/prettier, react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import ItemTag from './ItemTag';
import { List, ListItem } from '../List';
import MultiDownshift from './MultiDownshift';
import styles from './Multiselect.scss';

const { block, elem } = bem({
    name: 'Multiselect',
    classnames: styles
});

class Multiselect extends React.Component {
    static itemToString(item) {
        return item || '';
    }

    constructor() {
        super();
        this.input = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleChange(selectedItems) {
        const { onChange } = this.props;
        console.log({ selectedItems });
        if (onChange) {
            onChange(selectedItems);
        }
    }

    handleInputKeyDown({ event, isOpen, removeItem, selectedItems }) {
        if (event.key === 'Backspace' && !event.target.value) {
            // remove the last input
            removeItem(selectedItems[selectedItems.length - 1]);
        } else if (isOpen && ['Escape'].includes(event.key)) {
            this.input.current.blur();
        }
    }

    handleBlur(selectedItems) {
        const { onFinished } = this.props;
        if (!onFinished) {
            return;
        }

        onFinished(selectedItems);
    }

    render() {
        const { getItems } = this.props;

        return (
            <div {...block(this.props)}>
                <MultiDownshift
                    onChange={this.handleChange}
                    itemToString={this.constructor.itemToString}
                >
                    {({
                        getInputProps,
                        getMenuProps,
                        getRemoveButtonProps,
                        removeItem,
                        isOpen,
                        inputValue,
                        selectedItems,
                        getItemProps,
                        highlightedIndex,
                        toggleMenu
                    }) => (
                        <div style={{ width: 500, margin: 'auto', position: 'relative' }}>
                            <div
                                {...elem('wrapper', this.props)}
                                style={{
                                    borderBottomRightRadius: isOpen ? 0 : '6px',
                                    borderBottomLeftRadius: isOpen ? 0 : '6px'
                                }}
                                onClick={() => {
                                    toggleMenu();
                                    if (isOpen) {
                                        this.input.current.focus();
                                    }
                                }}
                            >
                                <div {...elem('selectedWrapper', this.props)}>
                                    {selectedItems.length > 0
                                        ? selectedItems.map(item => (
                                              <ItemTag
                                                  key={item}
                                                  buttonProps={getRemoveButtonProps({ item })}
                                              >
                                                  {item}
                                              </ItemTag>
                                          ))
                                        : 'Select a value'}
                                    <input
                                        {...getInputProps({
                                            ref: this.input,
                                            onKeyDown: event => {
                                                this.handleInputKeyDown({
                                                    event,
                                                    isOpen,
                                                    removeItem,
                                                    selectedItems
                                                });
                                            },
                                            onBlur: () => {
                                                this.handleBlur(selectedItems);
                                            },
                                            ...elem('input', this.props)
                                        })}
                                    />
                                </div>
                            </div>
                            <List isDivided {...getMenuProps()}>
                                {isOpen
                                    ? getItems(inputValue, selectedItems).map((item, index) => (
                                          <ListItem
                                              key={item}
                                              {...getItemProps({
                                                  item,
                                                  index,
                                                  isSelected: highlightedIndex === index
                                              })}
                                          >
                                              {item}
                                          </ListItem>
                                      ))
                                    : null}
                            </List>
                        </div>
                    )}
                </MultiDownshift>
            </div>
        );
    }
}

Multiselect.propTypes = {
    //  returns an arrayOf.shape({
    //         name: PropTypes.string.isRequired,
    //         id: PropTypes.string.isRequired
    //     })
    getItems: PropTypes.func.isRequired,
    onFinished: PropTypes.func,
    onChange: PropTypes.func
};

Multiselect.defaultProps = {
    onFinished: null,
    onChange: null
};

export default Multiselect;
