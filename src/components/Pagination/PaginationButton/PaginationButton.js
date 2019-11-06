import React from 'react';
import PropTypes from 'prop-types';
import bem from '../../../utils/bem';
import styles from './PaginationButton.scss';
import { Button } from '../../Buttons';

const { block } = bem('PaginationButton', styles);

const PaginationButton = props => {
    const { children, isActive, ...rest } = props;

    return (
        <Button {...rest} context="link" {...block(props)} aria-current={isActive ? 'page' : null}>
            {children}
        </Button>
    );
};

PaginationButton.displayName = 'PaginationButton';

PaginationButton.propTypes = {
    children: PropTypes.number.isRequired,
    isActive: PropTypes.bool,
};

PaginationButton.defaultProps = {
    isActive: false,
};

export default PaginationButton;
