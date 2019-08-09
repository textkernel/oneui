import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import ListItem from './ListItem';
import styles from './List.scss';
import { LIST_NAVIGATION_DIRECTIONS, ENTER_KEY } from '../../constants';

const { block, elem } = bem({
    name: 'List',
    classnames: styles,
    propsToMods: ['isDivided'],
});

const isNotListItem = element => element && element.type !== ListItem && element.type !== 'li';
const NAVIGATION_STEP_VALUES = {
    [LIST_NAVIGATION_DIRECTIONS.UP]: -1,
    [LIST_NAVIGATION_DIRECTIONS.DOWN]: 1,
};

const SCROLL_INTO_VIEW_SETTINGS = {
    block: 'nearest',
};

const NOT_LIST_CHILD = 'data-list-exception';
const LIST_CHILD = 'data-list-child';

const List = React.forwardRef((props, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [highlightedWithKeyboard, setHighlightedWithKeyboard] = useState(false);

    const highlightedListItem = useRef(null);

    const { children, isDivided, onNavigate, onSelect, isControlledNavigation, ...rest } = props;

    /**
     * Scroll list if it's necessary to make the highlighted item visible
     * every time selectedIndex was changed with the keyboard navigation
     */
    useEffect(() => {
        const hasScrollIntoViewFunction =
            highlightedListItem &&
            highlightedListItem.current &&
            highlightedListItem.current.scrollIntoView;

        if (highlightedWithKeyboard && hasScrollIntoViewFunction) {
            highlightedListItem.current.scrollIntoView(SCROLL_INTO_VIEW_SETTINGS);
            setHighlightedWithKeyboard(false);
        }
    }, [highlightedWithKeyboard, selectedIndex]);

    const getNextSelectedIndex = useCallback(
        keyCode => {
            const stepValue = NAVIGATION_STEP_VALUES[keyCode];
            const nextSelectedIndex = selectedIndex + stepValue;

            // Return 0 index if nextSelectedIndex has negative value or selectedIndex hasn't been updated before
            if (nextSelectedIndex < 0 || selectedIndex === null) {
                return 0;
            }

            // Return last React.Children index if nextSelectedIndex is out of the right bound
            if (nextSelectedIndex >= children.length) {
                return children.length - 1;
            }

            // Return nextSelectedIndex without any changes for others cases
            return nextSelectedIndex;
        },
        [selectedIndex, children]
    );

    const handleKeyDown = useCallback(
        e => {
            // Update selectedIndex with arrow navigation and make onNavigate function callback
            if (
                e.key === LIST_NAVIGATION_DIRECTIONS.UP ||
                e.key === LIST_NAVIGATION_DIRECTIONS.DOWN
            ) {
                const nextSelectedIndex = getNextSelectedIndex(e.key);

                if (selectedIndex !== nextSelectedIndex) {
                    e.preventDefault();
                    setSelectedIndex(nextSelectedIndex);
                    setHighlightedWithKeyboard(true);

                    if (onNavigate) {
                        onNavigate(nextSelectedIndex, e.key);
                    }
                }
            }

            // Imitate onClick event on Enter press and make onSelect function callback
            if (e.key === ENTER_KEY) {
                if (
                    children[selectedIndex] &&
                    children[selectedIndex].props &&
                    children[selectedIndex].props.onClick
                ) {
                    children[selectedIndex].props.onClick(e);

                    if (onSelect) {
                        onSelect(selectedIndex);
                    }
                }
            }
        },
        [children, getNextSelectedIndex, onNavigate, onSelect, selectedIndex]
    );

    const handleMouseEnter = index => {
        if (selectedIndex !== index) {
            setSelectedIndex(index);
        }
    };

    const getChildClasses = child => {
        const classes = [elem('item', props).className];
        if (child.props.className) {
            classes.push(child.props.className);
        }

        return classes.join(' ');
    };

    return isControlledNavigation ? (
        <ul {...rest} ref={ref} {...block(props)}>
            {React.Children.map(children, child => {
                if (child) {
                    return child.props[NOT_LIST_CHILD]
                        ? child
                        : React.cloneElement(child, { className: getChildClasses(child) });
                }
                return null;
            })}
        </ul>
    ) : (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex
        <ul {...rest} ref={ref} tabIndex="0" onKeyDown={handleKeyDown} {...block(props)}>
            {React.Children.map(children, (child, index) => {
                if (child) {
                    return child.props[NOT_LIST_CHILD]
                        ? child
                        : React.cloneElement(child, {
                              className: getChildClasses(child),
                              ref: index === selectedIndex ? highlightedListItem : null,
                              isHighlighted: index === selectedIndex,
                              onMouseEnter: () => handleMouseEnter(index),
                          });
                }
                return null;
            })}
        </ul>
    );
});

List.displayName = 'List';

List.propTypes = {
    /** List items. They should be ListItem or li.
     * If you sure using other element will work for you, you can bypass validation by adding `data-list-item` as a prop to the child
     * If you want to add an element that is not part of the list, but should be rendered within it
     * (e.g. an image to decorate the list) use `data-list-exception` as a prop to that child
     */
    children: (props, propName, componentName) => {
        const prop = props[propName];

        let error = null;
        React.Children.forEach(prop, child => {
            if (isNotListItem(child) && !child.props[LIST_CHILD] && !child.props[NOT_LIST_CHILD]) {
                error = new Error(
                    `'${componentName}' children should be of type 'ListItem' or 'li' or have '${LIST_CHILD}' or '${NOT_LIST_CHILD}' attribute.`
                );
            }
        });
        return error;
    },
    /** Adds dividing lines between the list items */
    isDivided: PropTypes.bool,
    /** onNavigate function callback. (selectedIndex: number, key: 'ArrowUp' || 'ArrowDown') */
    onNavigate: PropTypes.func,
    /** onSelect function callback. (selectedIndex: number) */
    onSelect: PropTypes.func,
    /** manage keyboard navigation externally */
    isControlledNavigation: PropTypes.bool,
};

List.defaultProps = {
    children: null,
    isDivided: false,
    onNavigate: null,
    onSelect: null,
    isControlledNavigation: false,
};

export default List;
