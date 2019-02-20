import React, { createRef, PureComponent } from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import Button from '../Button';
import DropdownContent from './DropdownContent';
import IconCaret from '../Icon/IconCaret';
import { DropdownProvider } from './DropdownContext';
import styles from './Dropdown.scss';
import { CONTEXTS, SIZES } from '../../constants';

class Dropdown extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            expanded: props.initiallyOpened || false,
            filterValue: null,
            selection: props.value || null
        };

        this.dropdown = createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleEscPress = this.handleEscPress.bind(this);
        this.handleSetFilter = this.handleSetFilter.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);

        window.addEventListener('click', this.handleClickOutside, false);
        window.addEventListener('keyup', this.handleEscPress, true);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleClickOutside, false);
        window.removeEventListener('keyup', this.handleEscPress, true);
    }

    handleChange(selection) {
        const { multiselect, onChange } = this.props;

        onChange(selection);

        if (!multiselect) {
            this.toggleDropdown(null, true);
        }
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
        this.toggleDropdown(null, true);
        return true;
    }

    handleEscPress(e) {
        // Collapse dropdown on esc press
        e.stopPropagation();
        const key = e.keyCode || e.which;

        if (key !== 27) {
            return false;
        }

        this.toggleDropdown(null, true);
        return false;
    }

    handleSetFilter(e) {
        const { value } = e.target;
        this.setState({
            filterValue: value || null
        });
    }

    toggleDropdown(e, collapse = false) {
        const { expanded } = this.state;

        if (e && e.stopPropagation) {
            e.stopPropagation();
        }

        const newState = {
            expanded: collapse ? false : !expanded
        };

        this.setState(newState);

        return true;
    }

    render() {
        const {
            children,
            context,
            isBlock,
            label,
            multiselect,
            selectedLabel,
            size,
            ...rest
        } = this.props;
        const { expanded, filterValue, selection } = this.state;

        return (
            <div {...this.block()}>
                <DropdownProvider
                    value={{
                        filterValue,
                        handleChange: this.handleChange,
                        multiselect,
                        selection,
                        setFilter: this.handleSetFilter
                    }}
                >
                    <Button
                        {...rest}
                        context={context}
                        isBlock={isBlock}
                        onClick={this.toggleDropdown}
                        size={size}
                    >
                        {selectedLabel ? selectedLabel(selection) : label}
                        <IconCaret {...this.elem('caret')} context={context} />
                    </Button>
                    {!!expanded && (
                        <DropdownContent ref={this.dropdown} role="menu" aria-expanded shown>
                            {children}
                        </DropdownContent>
                    )}
                </DropdownProvider>
            </div>
        );
    }
}

Dropdown.displayName = 'Dropdown';

Dropdown.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    context: PropTypes.oneOf(['link', ...CONTEXTS]),
    initiallyOpened: PropTypes.bool,
    isBlock: PropTypes.bool,
    label: PropTypes.node.isRequired,
    multiselect: PropTypes.bool,
    onChange: PropTypes.func,
    selectedLabel: PropTypes.func,
    size: PropTypes.oneOf(SIZES),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array])
};

Dropdown.defaultProps = {
    children: null,
    context: 'neutral',
    initiallyOpened: false,
    isBlock: false,
    multiselect: false,
    onChange: () => {},
    selectedLabel: null,
    size: 'normal',
    value: null
};

Dropdown.propsToMods = ['context'];

export default bem(styles)(Dropdown);
