import React, { Children, PureComponent } from 'react';
import PropTypes from 'prop-types';
import diacritics from 'diacritics';
import Button from '../Button';
import Input from '../Input';
import DropdownCaret from './DropdownCaret';
import bem from '../../packages/bem';
import styles from './Dropdown.scss';
import { CONTEXTS, SIZES } from '../../constants';

class Dropdown extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            filterValue: null
        };

        this.dropdown = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleEscPress = this.handleEscPress.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        document.addEventListener('click', this.handleClickOutside, false);
        document.addEventListener('keyup', this.handleEscPress, true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, false);
        document.removeEventListener('keyup', this.handleEscPress, true);
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

    handleEscPress(e) {
        e.stopPropagation();
        const key = e.keyCode || e.which;

        if (key !== 27) {
            return false;
        }

        this.toggleDropdown(null, true, true);
        return false;
    }

    toggleDropdown(e, collapse = false) {
        const { expanded } = this.state;

        if (e && e.stopPropagation) {
            e.stopPropagation();
        }

        this.setState({
            expanded: collapse ? false : !expanded
        });

        return true;
    }

    filteredChildren() {
        const { children, filter } = this.props;
        const { filterValue } = this.state;

        if (!filter || !filterValue) {
            return children;
        }

        const re = new RegExp(
            `${filter.matchPosition === 'start' ? '^' : ''}(${filterValue})`,
            `g${!filter.matchCase ? 'i' : ''}`
        );

        return Children.toArray(children).filter(item => {
            const { children: label } = item.props;
            return label.match(re);
        });
    }

    render() {
        const { children, context, disabled, filter, isBlock, label, size, ...rest } = this.props;
        const { expanded } = this.state;

        return (
            <div {...rest} {...this.block()} ref={this.dropdown}>
                <Button
                    context={context}
                    disabled={disabled}
                    isBlock={isBlock}
                    onClick={this.toggleDropdown}
                    size={size}
                    {...this.elem('button')}
                >
                    {label}
                    <DropdownCaret {...this.elem('caret')} />
                </Button>
                {!!expanded &&
                    !disabled && (
                        <div {...this.elem('list')}>
                            {!!filter && (
                                <div {...this.elem('filter')}>
                                    <Input
                                        autoFocus
                                        isBlock
                                        onChange={e => {
                                            const { value } = e.target;

                                            this.setState({
                                                filterValue: filter.matchDiacritics
                                                    ? value
                                                    : diacritics.remove(value)
                                            });
                                        }}
                                        placeholder={filter.placeholder || null}
                                    />
                                </div>
                            )}
                            <div {...this.elem('list-items')}>
                                {this.filteredChildren()}
                            </div>
                        </div>
                    )}
            </div>
        );
    }
}

Dropdown.propTypes = {
    /** The dropdown items */
    children: PropTypes.node,
    /** Dropdown context */
    context: PropTypes.oneOf(['link', ...CONTEXTS]),
    /** Whether the dropdown is disabled */
    disabled: PropTypes.bool,
    /** Filter dropdown options and highlight matches */
    filter: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
            /** If the filter is case sensitive */
            matchCase: PropTypes.bool,
            /** If the filter should strictly match diacritics */
            matchDiacritics: PropTypes.bool,
            /** Whether to match at any position in the string or from the start */

            matchPosition: PropTypes.oneOf(['any', 'start']),
            /** Input placeholder when filter is empty */
            placeholder: PropTypes.string
        })
    ]),
    /** Render dropdown as block-level element */
    isBlock: PropTypes.bool,
    /** Label for the dropdown trigger */
    label: PropTypes.string.isRequired,
    /** Size of the dropdown trigger */
    size: PropTypes.oneOf(SIZES)
};

Dropdown.defaultProps = {
    children: null,
    context: 'neutral',
    disabled: false,
    filter: false,
    isBlock: false,
    size: 'normal'
};

Dropdown.propsToMods = ['context', 'disabled', 'isBlock', 'size'];
Dropdown.stateToMods = ['expanded'];

export default bem(styles)(Dropdown);
