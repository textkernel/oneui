import React from 'react';
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

const isListItem = element => element && element.type !== ListItem && element.type !== 'li';
const NAVIGATION_STEP_VALUES = {
    [LIST_NAVIGATION_DIRECTIONS.UP]: -1,
    [LIST_NAVIGATION_DIRECTIONS.DOWN]: 1,
};

const SCROLL_INTO_VIEW_SETTINGS = {
    block: 'nearest',
};

const List = React.forwardRef((props, ref) => {
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [highlightedWithKeyboard, setHighlightedWithKeyboard] = React.useState(false);

    const highlightedListItem = React.useRef(null);

    const { children, isDivided, doSelectOnNavigate, isControlledNavigation, ...rest } = props;

    /**
     * Scroll list if it's necessary to make the highlighted item visible
     * every time selectedIndex was changed with the keyboard navigation
     */
    React.useEffect(() => {
        const hasScrollIntoViewFunction =
            highlightedListItem &&
            highlightedListItem.current &&
            highlightedListItem.current.scrollIntoView;

        if (highlightedWithKeyboard && hasScrollIntoViewFunction) {
            highlightedListItem.current.scrollIntoView(SCROLL_INTO_VIEW_SETTINGS);
            setHighlightedWithKeyboard(false);
        }
    }, [highlightedWithKeyboard, selectedIndex]);

    const getNextSelectedIndex = keyCode => {
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
    };

    const handleKeyDown = e => {
        // Update selectedIndex with arrow navigation and make onNavigate function callback
        if (e.key === LIST_NAVIGATION_DIRECTIONS.UP || e.key === LIST_NAVIGATION_DIRECTIONS.DOWN) {
            const nextSelectedIndex = getNextSelectedIndex(e.key);

            if (selectedIndex !== nextSelectedIndex) {
                e.preventDefault();
                setSelectedIndex(nextSelectedIndex);
                setHighlightedWithKeyboard(true);
            }
        }

        // Imitate onClick event for the selected highlighted item
        if (e.key === ENTER_KEY || doSelectOnNavigate) {
            if (
                children[selectedIndex] &&
                children[selectedIndex].props &&
                children[selectedIndex].props.onClick
            ) {
                children[selectedIndex].props.onClick(e);
            }
        }
    };

    const handleMouseEnter = React.useCallback(
        index => {
            if (selectedIndex !== index) {
                setSelectedIndex(index);
            }
        },
        [selectedIndex]
    );

    return isControlledNavigation ? (
        <ul {...rest} ref={ref} {...block(props)}>
            {React.Children.map(children, child =>
                child ? React.cloneElement(child, elem('item', props)) : null
            )}
        </ul>
    ) : (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex
        <ul {...rest} ref={ref} tabIndex="0" onKeyDown={handleKeyDown} {...block(props)}>
            {React.Children.map(children, (child, index) =>
                child
                    ? React.cloneElement(child, {
                          ...elem('item', props),
                          ref: index === selectedIndex ? highlightedListItem : null,
                          isHighlighted: index === selectedIndex,
                          onMouseEnter: () => handleMouseEnter(index),
                      })
                    : null
            )}
        </ul>
    );
});

List.displayName = 'List';

List.propTypes = {
    /** List items */
    children: (props, propName, componentName) => {
        const prop = props[propName];

        let error = null;
        React.Children.forEach(prop, child => {
            if (isListItem(child)) {
                error = new Error(
                    `'${componentName}' children should be of type 'ListItem' or 'li'.`
                );
            }
        });
        return error;
    },
    /** Adds dividing lines between the list items */
    isDivided: PropTypes.bool,
    /** Defines if selection should be made on navigate */
    doSelectOnNavigate: PropTypes.bool,
    /** manage keyboard navigation externally */
    isControlledNavigation: PropTypes.bool,
};

List.defaultProps = {
    children: null,
    isDivided: false,
    doSelectOnNavigate: false,
    isControlledNavigation: false,
};

export default List;
