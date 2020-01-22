import * as React from 'react';
import PropTypes from 'prop-types';
import { bem } from '../../../utils/bem';
import styles from './ItemTag.scss';
import { CROSS_CHAR } from '../../../constants';

const { block, elem } = bem('ItemTag', styles);

export const ItemTag = props => {
    const { children, onClick, ...rest } = props;

    return (
        <div {...rest} {...block(props)}>
            <span title={children} {...elem('label', props)}>
                {children}
            </span>
            {onClick ? (
                <button onClick={onClick} type="button" {...elem('button', props)}>
                    {CROSS_CHAR}
                </button>
            ) : null}
        </div>
    );
};

ItemTag.propTypes = {
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

ItemTag.defaultProps = {
    onClick: null,
};

ItemTag.displayName = 'ItemTag';
