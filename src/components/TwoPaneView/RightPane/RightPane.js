import * as React from 'react';
import PropTypes from 'prop-types';
import bem from '../../../utils/bem';
import styles from './RightPane.scss';

const { block } = bem('RightPane', styles);

const RightPane = props => {
    const { children, ...rest } = props;

    return (
        <div {...rest} {...block(props)}>
            {children}
        </div>
    );
};

RightPane.displayName = 'RightPane';

RightPane.propTypes = {
    /** Node(s) to be rendered in the right pane */
    children: PropTypes.node.isRequired,
};

export default RightPane;
