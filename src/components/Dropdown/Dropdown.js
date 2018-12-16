import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import bem from '../../packages/bem';
import styles from './Dropdown.scss';
import { CONTEXTS, SIZES } from '../../constants';

class Dropdown extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };

        this.dropdown = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        document.addEventListener('click', this.handleClickOutside, false);
    }

    handleClickOutside(e) {
        if (!this.dropdown || !this.dropdown.current) {
            return false;
        }
        if (this.dropdown.current.contains(e.target)) {
            return false;
        }
        this.toggleDropdown(null, true, true);
        return true;
    }

    toggleDropdown(e, collapse = false) {
        const { disabled } = this.props;
        const { expanded } = this.state;

        if (e && e.stopPropagation) {
            e.stopPropagation();
        }

        this.setState({
            expanded: collapse ? false : !expanded
        });

        return true;
    }

    render() {
        const { children, context, disabled, isBlock, label, size, ...rest } = this.props;
        const { expanded } = this.state;

        return (
            <div {...rest} {...this.block()} ref={ this.dropdown }>
                <Button
                    context={ context }
                    disabled={ disabled }
                    isBlock={ isBlock }
                    onClick={ this.toggleDropdown }
                    size={ size }
                    {...this.elem('button')}
                >
                    { label }
                </Button>
                <div {...this.elem('list')}>
                    { children }
                </div>
            </div>
        );
    }
}

Dropdown.propTypes = {
    children: PropTypes.node,
    context: PropTypes.oneOf(['link', ...CONTEXTS]),
    disabled: PropTypes.bool,
    isBlock: PropTypes.bool,
    label: PropTypes.string.isRequired,
    size: PropTypes.oneOf(SIZES)
};

Dropdown.defaultProps = {
    children: null,
    context: 'neutral',
    disabled: false,
    isBlock: false,
    size: 'normal'
};

Dropdown.propsToMods = ['context', 'disabled', 'isBlock', 'size'];
Dropdown.stateToMods = ['expanded'];

export default bem(styles)(Dropdown);
