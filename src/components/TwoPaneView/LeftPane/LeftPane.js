import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './LeftPane.scss';

const { block } = bem({
    name: 'LeftPane',
    classnames: styles,
});

const LeftPane = React.forwardRef((props, ref) => {
    const { children, ...rest } = props;

    return (
        <div {...rest} ref={ref} {...block(props)}>
            {children}
        </div>
    );
});

LeftPane.displayName = 'LeftPane';

LeftPane.propTypes = {
    /** Node(s) to be rendered in the left pane */
    children: PropTypes.node.isRequired,
};

export default LeftPane;
