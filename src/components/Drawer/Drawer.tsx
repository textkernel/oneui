import * as React from 'react';
import ReactDOM from 'react-dom';
import { Transition } from 'react-transition-group';
import { IoIosArrowUp } from 'react-icons/io';
import { bem } from '../../utils';
import { ENTER_KEY } from '../../constants';
import styles from './Drawer.scss';

export interface Props extends Omit<React.HTMLAttributes<HTMLLIElement>, 'title'> {
    /** Drawer title */
    title: ReactNode;
    /** Set open/close status for initial state */
    initialIsExpanded?: boolean;
    /** Should the element be in primary style or not */
    isPrimary?: boolean;
    /** Control visibility Drawer component */
    isShown?: boolean;
    /** Set open/close status for state */
    isExpanded?: boolean;
    /** Fired after click open/close button */
    onClick?: () => void;
    /** Node(s) to be rendered inside the container */
    children: ReactNode;
}

const TRANSITION_DURATION = {
    enter: 10,
    exit: 300,
};

const { block, elem } = bem('Drawer', styles);

/**
 *  Drawer can be used like an uncontrolled and controlled component.
 */
export const Drawer: React.FC<Props> = ({
    title,
    isShown = true,
    isExpanded: isExpandedProps,
    initialIsExpanded,
    onClick,
    isPrimary,
    children,
    ...rest
}) => {
    const [isExpanded, setIsExpanded] = React.useState(isExpandedProps || initialIsExpanded);

    React.useEffect(() => {
        if (isExpandedProps !== undefined) {
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
        e.stopPropagation();
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
            {(state) => (
                <div
                    {...block({ [getStatus()]: state !== 'entering' })}
                    aria-hidden={!isShown}
                    {...rest}
                >
                    <header
                        {...elem('head', { isPrimary })}
                        role="button"
                        tabIndex="-1"
                        onKeyPress={handleKeyPress}
                        onClick={handleClick}
                    >
                        <h4 title={title} {...elem('headTitle')}>
                            {title}
                        </h4>
                        <div {...elem('headButtons')}>
                            <button
                                {...elem('expandButton', { isExpanded, isPrimary })}
                                type="button"
                                onClick={handleClick}
                            >
                                <IoIosArrowUp {...elem('expandIcon')} />
                            </button>
                        </div>
                    </header>
                    <section
                        {...elem('body', { isPrimary })}
                        aria-hidden={!(isShown && isExpanded)}
                    >
                        {children}
                    </section>
                </div>
            )}
        </Transition>,
        document.body
    );
};

Drawer.displayName = 'Drawer';
