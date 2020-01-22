import * as React from 'react';
import PropTypes from 'prop-types';
import { bem } from '../../../utils/bem';
import styles from './ListActions.scss';

const { block } = bem('ListActions', styles);

export const ListActions = props => {
    const { children, ...rest } = props;

    return (
        <div {...rest} {...block(props)}>
            {children}
        </div>
    );
};

ListActions.displayName = 'ListActions';

ListActions.propTypes = {
    /** Actions to be pushed to the left side of a List Item */
    children: PropTypes.node,
};

ListActions.defaultProps = {
    children: null,
};
