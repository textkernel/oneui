import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { IoIosArrowUp } from 'react-icons/io';
import { bem } from '../../utils';
import { ENTER_KEY } from '../../constants';
import styles from './Drawer.scss';

const TRANSITION_DURATION = {
    enter: 10,
    exit: 300,
};

const { block, elem } = bem('Drawer', styles);

export const Drawer = props => {
    const {
        title,
        isShown,
        isExpanded: isExpandedProps,
        initialIsExpanded,
        onClick,
        children,
        ...rest
    } = props;
    const [isExpanded, setIsExpanded] = useState(isExpandedProps || initialIsExpanded);

    useEffect(() => {
        if (isExpandedProps !== null) {
            setIsExpanded(isExpandedProps);
        }
    }, [isExpandedProps]);

    function getStatus() {
        const STATUS_LIST = {
            IS_EXPANDED: 'isShownAndExpanded',
            IS_CLOSED: 'isShownAndClosed',
            IS_HIDDEN: '',
        };

        if (isShown) {
            return isExpanded ? STATUS_LIST.IS_EXPANDED : STATUS_LIST.IS_CLOSED;
        }

        return STATUS_LIST.IS_HIDDEN;
    }

    function toggleDrawer() {
        if (onClick) {
            onClick();
        } else {
            setIsExpanded(!isExpanded);
        }
    }

    function handleClick(e) {
        e.preventDefault();
        toggleDrawer();
    }

    function handleKeyPress(e) {
        e.preventDefault();

        if (e.key === ENTER_KEY) {
            toggleDrawer();
        }
    }

    return ReactDOM.createPortal(
        <Transition appear unmountOnExit in={isShown} timeout={TRANSITION_DURATION}>
            {state => (
                <div
                    {...block({ [getStatus()]: state !== 'entering' })}
                    aria-hidden={!isShown}
                    {...rest}
                >
                    <header
                        {...elem('head', props)}
                        role="button"
                        tabIndex="-1"
                        onKeyPress={handleKeyPress}
                        onClick={handleClick}
                    >
                        <h4 {...elem('headTitle', props)}>{title}</h4>
                        <div {...elem('headButtons', props)}>
                            <button
                                {...elem('expandButton', { isExpanded })}
                                type="button"
                                onClick={handleClick}
                            >
                                <IoIosArrowUp {...elem('expandIcon', props)} />
                            </button>
                        </div>
                    </header>
                    <section {...elem('body', props)} aria-hidden={!(isShown && isExpanded)}>
                        {children}
                    </section>
                </div>
            )}
        </Transition>,
        document.body
    );
};

Drawer.propTypes = {
    /** Drawer title */
    title: PropTypes.string.isRequired,
    /** Set open/close status for initial state */
    initialIsExpanded: PropTypes.bool,
    /** Control visibility Drawer component */
    isShown: PropTypes.bool,
    /** Set open/close status for state */
    isExpanded: PropTypes.bool,
    /** Fired after click open/close button */
    onClick: PropTypes.func,
    /** Node(s) to be rendered inside the container */
    children: PropTypes.node.isRequired,
};

Drawer.defaultProps = {
    initialIsExpanded: false,
    isShown: true,
    isExpanded: null,
    onClick: null,
};

Drawer.displayName = 'Drawer';
