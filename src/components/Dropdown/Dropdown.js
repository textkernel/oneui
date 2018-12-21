import React, { cloneElement, createRef, Children, Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import diacritics from 'diacritics';
import bem from 'bem';
import { escapeRegExp } from '../../utils';
import Button from '../Button';
import Input from '../Input';
import DropdownCaret from './DropdownCaret';
import DropdownItem from './DropdownItem';
import styles from './Dropdown.scss';
import { CONTEXTS, SIZES } from '../../constants';

class Dropdown extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            expanded: props.initiallyOpened,
            filterValue: null,
            fromRight: false,
            fromRightOffset: 0,
            selection: props.value
        };

        this.dropdown = createRef();
        this.filter = createRef();
        this.list = createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleEscPress = this.handleEscPress.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        window.addEventListener('click', this.handleClickOutside, false);
        window.addEventListener('keyup', this.handleEscPress, true);
        window.addEventListener('resize', this.determineListOrientation.bind(this), false);
    }

    componentDidMount() {
        this.determineListOrientation();
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleClickOutside, false);
        window.removeEventListener('keyup', this.handleEscPress, true);
        window.removeEventListener('resize', this.determineListOrientation.bind(this), false);
    }

    determineListOrientation() {
        if (!this.list || !this.list.current) {
            return true;
        }

        const windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

        const { left, right, width } = this.list.current.getBoundingClientRect();
        const { fromRight, fromRightOffset } = this.state;

        if (left - width > 0 && right >= windowWidth && !fromRight) {
            this.setState({
                fromRight: true,
                fromRightOffset: right
            });
        } else if (fromRight && fromRightOffset < windowWidth) {
            this.setState({
                fromRight: false,
                fromRightOffset: 0
            });
        }

        return true;
    }

    focusFilter() {
        // Focus filter input if enabled and dropdown is a multiselect
        const { filter, multiple } = this.props;
        if (!filter || !this.filter || !this.filter.current || !multiple) {
            return false;
        }
        this.filter.current.focus();
        return true;
    }

    handleChange(value) {
        const { multiple } = this.props;
        let newSelection;

        if (multiple) {
            const { selection } = this.state;
            // Clone existing selection or start with empty one
            newSelection = selection ? [...selection] : [];

            const index = newSelection.indexOf(value);
            if (index > -1) {
                // Value already selected: remove it
                newSelection.splice(index, 1);
            } else {
                // Add value to selection
                newSelection = [...newSelection, value];
            }
        } else {
            // Single-select dropdown: replace value
            newSelection = value;
        }

        this.setState(
            {
                selection: newSelection
            },
            () => {
                const { onChange } = this.props;
                this.focusFilter();
                if (!onChange) {
                    return true;
                }
                return onChange(newSelection);
            }
        );
    }

    handleClickOutside(e) {
        // Collapse dropdown on click outside
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
        // Collapse dropdown on esc press
        e.stopPropagation();
        const key = e.keyCode || e.which;

        if (key !== 27) {
            return false;
        }

        this.toggleDropdown(null, true, true);
        return false;
    }

    highlightLabel(label) {
        // Highlight parts of a label that match with current filter value
        const { filterValue } = this.state;

        if (!filterValue) {
            return label;
        }

        const parts = diacritics
            .remove(label)
            .split(new RegExp(`(${escapeRegExp(filterValue)})`, 'gi'));
        let pos = 0;

        return (
            <Fragment>
                {parts.map((part, i) => {
                    const match = part.toLowerCase() === filterValue.toLowerCase();
                    const originalPart = label.substring(pos, pos + part.length);
                    pos += part.length;

                    if (match) {
                        return (
                            <strong key={i.toString()} {...this.elem('highlight')}>
                                {originalPart}
                            </strong>
                        );
                    }
                    return <span key={i.toString()}>{originalPart}</span>;
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
            const { selection } = this.state;
            if (!newState.expanded && onClose) {
                onClose(selection);
            }
        });

        return true;
    }

    extendItemProps(children) {
        // Clone dropdown item and extend its props with those
        // needed for a multiselect dropdown item
        const { multiple } = this.props;
        const { selection } = this.state;

        return Children.map(children, (item, index) =>
            cloneElement(item, {
                checkbox: multiple,
                checked: multiple && (selection || []).indexOf(item.props.value) > -1,
                children: this.highlightLabel(item.props.children),
                index,
                onSelect: this.handleChange
            })
        );
    }

    filteredChildren() {
        const { children, filter } = this.props;
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
            return diacritics.remove(label).match(re);
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
                        <div {...this.elem('list')} ref={this.list}>
                            {!!heading && <div {...this.elem('heading')}>{heading}</div>}
                            {!!filter && (
                                <div {...this.elem('filter')}>
                                    <Input
                                        autoFocus
                                        isBlock
                                        onChange={e => {
                                            const { value } = e.target;

                                            this.setState({
                                                filterValue: diacritics.remove(value)
                                            });
                                        }}
                                        placeholder={filter.placeholder || null}
                                        ref={this.filter}
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
                                role="menu"
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
    /** Callback function that is fired after dropdown collapses
     Current selection is passed as first argument */
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
Dropdown.stateToMods = ['expanded', 'fromRight'];

export default bem(styles)(Dropdown);
