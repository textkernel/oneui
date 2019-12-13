import * as React from 'react';
import PropTypes from 'prop-types';
import bem from '../../../utils/bem';
import styles from './TabContent.scss';

const { block } = bem('TabContent', styles);

const TabContent = props => {
    const { children, ...rest } = props;
    return (
        <div {...rest} {...block(props)} role="tabpanel">
            {children}
        </div>
    );
};

TabContent.displayName = 'TabContent';

TabContent.propTypes = {
    /** Content for this tab */
    children: PropTypes.node.isRequired,
};

export default TabContent;
