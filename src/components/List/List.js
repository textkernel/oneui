import React from 'react';
import PropTypes from 'prop-types';
import bem from '../../utils/bem';
import ListItem from './ListItem';
import styles from './List.scss';
import { LIST_NAVIGATION_DIRECTIONS, ENTER_KEY } from '../../constants';
import scrollIntoViewIfNeeded from '../../utils/scrollIntoViewIfNeeded';

const { block, elem } = bem('List', styles);

const isNotListItem = element => element && element.type !== ListItem && element.type !== 'li';
const NAVIGATION_STEP_VALUES = {
    [LIST_NAVIGATION_DIRECTIONS.UP]: -1,
    [LIST_NAVIGATION_DIRECTIONS.DOWN]: 1,
};

export const NOT_LIST_CHILD = 'data-list-exception';
export const LIST_CHILD = 'data-list-child';

const List = React.forwardRef((props, ref) => {
    const { children, isDivided, doSelectOnNavigate, isControlledNavigation, ...rest } = props;

    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [lastNavDirection, setLastNavDirection] = React.useState(null);
    const navigationElementRef = React.createRef();

    // set selectedIndex to first selectedItem that we can find
    React.useEffect(() => {
        if (!children) return;

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (!child.props[NOT_LIST_CHILD] && child.props.isSelected) {
                setSelectedIndex(i);
                break;
            }
        }
    }, [children]);

    // Scroll list if it's necessary to make the current item visible after keyboard navigation
    React.useLayoutEffect(() => {
        if (lastNavDirection) {
            scrollIntoViewIfNeeded(navigationElementRef.current, lastNavDirection);
        }
        setLastNavDirection(null);
    }, [navigationElementRef, lastNavDirection]);

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

    const callOnClick = (index, e) => {
        if (children[index] && children[index].props && children[index].props.onClick) {
            children[index].props.onClick(e);
        }
    };

    const handleKeyDown = e => {
        // Update selectedIndex with arrow navigation and make onNavigate function callback
        if (e.key === LIST_NAVIGATION_DIRECTIONS.UP || e.key === LIST_NAVIGATION_DIRECTIONS.DOWN) {
            const nextSelectedIndex = getNextSelectedIndex(e.key);

            if (selectedIndex !== nextSelectedIndex) {
                e.preventDefault();
                setSelectedIndex(nextSelectedIndex);

                const direction = e.key === LIST_NAVIGATION_DIRECTIONS.UP ? 'top' : 'bottom';
                setLastNavDirection(direction);

                if (doSelectOnNavigate) {
                    callOnClick(nextSelectedIndex, e);
                }
            }
        }

        if (e.key === ENTER_KEY) {
            callOnClick(selectedIndex, e);
        }
    };
    return isControlledNavigation ? (
        <ul {...rest} ref={ref} {...block(props)}>
            {React.Children.map(children, child => {
                if (child) {
                    return child.props[NOT_LIST_CHILD]
                        ? child
                        : React.cloneElement(
                              child,
                              elem('item', {
                                  ...props,
                                  elemClassName: child.props.className,
                              })
                          );
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
                              ...elem('item', {
                                  ...props,
                                  elemClassName: child.props.className,
                              }),
                              ref: index === selectedIndex ? navigationElementRef : null,
                              isHighlighted: index === selectedIndex,
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
