import * as React from 'react';
import ReactDOM from 'react-dom';
import { Transition } from 'react-transition-group';
import { IoIosArrowUp } from 'react-icons/io';
import { bem } from '../../utils';
import { ENTER_KEY } from '../../constants';
import styles from './Drawer.scss';

interface Props extends Omit<React.HTMLAttributes<HTMLLIElement>, 'title'> {
    /** Drawer title */
    title: ReactNode;
    /** Set open/close status for initial state */
    initialIsExpanded?: boolean;
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

export const Drawer: React.FC<Props> = (props) => {
    const {
        title,
        isShown,
        isExpanded: isExpandedProps,
        initialIsExpanded,
        onClick,
        children,
        ...rest
    } = props;
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

Drawer.defaultProps = {
    isShown: true,
};

Drawer.displayName = 'Drawer';
