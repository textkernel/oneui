import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './ItemTag.scss';

const { block, elem } = bem({
    name: 'ItemTag',
    classnames: styles
});

const ItemTag = props => {
    const { children, onClick, ...rest } = props;

    return (
        <div {...rest} {...block(props)}>
            <span title={children} {...elem('label', props)}>
                {children}
            </span>
            {onClick ? (
                <button onClick={onClick} type="button" {...elem('button', props)}>
                    &times;
                </button>
            ) : null}
        </div>
    );
};

ItemTag.propTypes = {
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

ItemTag.defaultProps = {
    onClick: null
};

ItemTag.displayName = 'ItemTag';

export default ItemTag;
