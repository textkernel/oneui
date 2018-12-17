import React, { cloneElement, Children, Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import diacritics from 'diacritics';
import { escapeRegExp } from '../../utils';
import Button from '../Button';
import Input from '../Input';
import DropdownCaret from './DropdownCaret';
import DropdownItem from '../DropdownItem';
import bem from '../../packages/bem';
import styles from './Dropdown.scss';
import { CONTEXTS, SIZES } from '../../constants';

class Dropdown extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            expanded: props.initiallyOpened,
            filterValue: null,
            value: null
        };

        this.dropdown = React.createRef();
        this.handleChange = this.handleChange.bind(this);
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

    handleChange(e, value) {
        console.log(e, value);
    }

    handleClickOutside(e) {
        if (!this.dropdown || !this.dropdown.current) {
            return false;
        }
        if (this.dropdown.current.contains(e.target)) {
            return false;
        }
        const { expanded } = this.state;
        if (!expanded) {
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

    highlightLabel(label) {
        const { filterValue } = this.state;

        if (!filterValue) {
            return label;
        }

        const parts = label.split(new RegExp(`(${escapeRegExp(filterValue)})`, 'gi'));

        return (
            <Fragment>
                {parts.map((part, i) => {
                    if (part.toLowerCase() === filterValue.toLowerCase()) {
                        return (
                            <strong key={i} {...this.elem('highlight')}>
                                {part}
                            </strong>
                        );
                    }
                    return <span key={i}>{part}</span>;
                })}
            </Fragment>
        );
    }

    toggleDropdown(e, collapse = false) {
        const { expanded } = this.state;

        if (e && e.stopPropagation) {
            e.stopPropagation();
        }

        const newState = {
            expanded: collapse ? false : !expanded
        };

        if (!newState.expanded) {
            newState.filterValue = null;
        }

        this.setState(newState, () => {
            const { onClose } = this.props;
            if (!newState.expanded && onClose) {
                onClose();
            }
        });

        return true;
    }

    extendItemProps(children) {
        const { multiple } = this.props;
        return Children.map(children, item =>
            cloneElement(item, {
                checkbox: multiple,
                children: this.highlightLabel(item.props.children),
                onClick: this.handleChange
            })
        );
    }

    filteredChildren() {
        const { children, filter, multiple } = this.props;
        const { filterValue } = this.state;

        if (!filter || !filterValue) {
            return this.extendItemProps(children);
        }

        const re = new RegExp(
            `${filter.matchPosition === 'start' ? '^' : ''}(${escapeRegExp(filterValue)})`,
            `g${!filter.matchCase ? 'i' : ''}`
        );

        const filteredChildren = Children.toArray(children).filter(item => {
            const { children: label } = item.props;
            return label.match(re);
        });

        if (!filteredChildren.length) {
            return (
                <DropdownItem isStatic>{filter.noMatchLabel || 'No matches found'}</DropdownItem>
            );
        }

        return this.extendItemProps(filteredChildren);
    }

    render() {
        const {
            children,
            context,
            heading,
            disabled,
            filter,
            initiallyOpened,
            isBlock,
            label,
            maxHeight,
            minWidth,
            size,
            ...rest
        } = this.props;
        const { expanded, filterValue } = this.state;

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
                            {!!heading && <div {...this.elem('heading')}>{heading}</div>}
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
                                        value={filterValue || ''}
                                    />
                                </div>
                            )}
                            <div
                                style={{
                                    maxHeight,
                                    minWidth
                                }}
                                {...this.elem('list-items')}
                            >
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
    /** heading to be rendered at the top of dropdown list */
    heading: PropTypes.node,
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
            /** Text to show when filter produced no matches */
            noMatchLabel: PropTypes.node,
            /** Input placeholder when filter is empty */
            placeholder: PropTypes.string
        })
    ]),
    /** Open the dropdown after first render */
    initiallyOpened: PropTypes.bool,
    /** Render dropdown as block-level element */
    isBlock: PropTypes.bool,
    /** Label for the dropdown trigger */
    label: PropTypes.string.isRequired,
    /** Max. height of dropdown list (will scroll if exceeded) */
    maxHeight: PropTypes.number,
    /** Min. width of dropdown list */
    minWidth: PropTypes.number,
    /** Whether to render a multiselect dropdown (value should be an array) */
    multiple: PropTypes.bool,
    /** Callback function that is fired upon item selection
        The current selection is passed as second argument
        In case of a multiselect, the new value is added if not yet present
        or removed if already present */
    onChange: PropTypes.func,
    /** Callback function that is fired after dropdown collapses */
    onClose: PropTypes.func,
    /** Size of the dropdown trigger */
    size: PropTypes.oneOf(SIZES),
    /** Current dropdown value. In case of a multiselect this is expected
        to be an array of values. Otherwise it holds the value of a selected
        dropdown item. If provided, the dropdown is a controlled component */
    value: PropTypes.oneOfType([
        PropTypes.arrayOf([PropTypes.string, PropTypes.number]),
        PropTypes.string,
        PropTypes.number
    ])
};

Dropdown.defaultProps = {
    children: null,
    context: 'neutral',
    heading: null,
    disabled: false,
    filter: false,
    initiallyOpened: false,
    isBlock: false,
    maxHeight: null,
    minWidth: null,
    multiple: false,
    onChange: null,
    onClose: null,
    size: 'normal',
    value: null
};

Dropdown.propsToMods = ['context', 'disabled', 'isBlock', 'size'];
Dropdown.stateToMods = ['expanded'];

export default bem(styles)(Dropdown);
