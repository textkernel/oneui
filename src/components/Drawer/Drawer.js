import React, { useState } from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import { IoIosArrowUp } from 'react-icons/io';
import styles from './Drawer.scss';

const { block, elem } = bem({
    name: 'Drawer',
    classnames: styles,
    propsToMods: ['isOpen'],
});

const Drawer = props => {
    const { title, initialIsOpen, children, ...rest } = props;
    const [isOpen, setIsOpen] = useState(initialIsOpen);

    function handleClick() {
        setIsOpen(!isOpen);
    }

    return (
        <div {...block({ isOpen })} {...rest}>
            <header {...elem('head', props)}>
                <h4 {...elem('headTitle', props)}>{title}</h4>
                <div {...elem('headButtons', props)}>
                    <button
                        {...elem('extendButton', { isOpen })}
                        type="button"
                        onClick={handleClick}
                    >
                        <IoIosArrowUp {...elem('extendIcon', props)} />
                    </button>
                </div>
            </header>
            <section {...elem('body', props)} aria-hidden={!isOpen}>
                {children}
            </section>
        </div>
    );
};

Drawer.propTypes = {
    /** Drawer title */
    title: PropTypes.string.isRequired,
    /** Set open/close status for initial state */
    initialIsOpen: PropTypes.bool,
    /** Node(s) to be rendered inside the container */
    children: PropTypes.node.isRequired,
};

Drawer.defaultProps = {
    initialIsOpen: false,
};

Drawer.displayName = 'Drawer';

export default Drawer;
