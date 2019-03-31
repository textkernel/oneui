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

        const { initiallyOpened = false, value = null } = props;

        this.state = {
            expanded: initiallyOpened,
            filterValue: null,
            selection: value
        };

        this.dropdown = createRef();
    }

    componentDidMount = () => {
        window.addEventListener('click', this.handleClickOutside);
        window.addEventListener('keyup', this.handleEscPress, true);
    };

    componentWillUnmount = () => {
        window.removeEventListener('click', this.handleClickOutside);
        window.removeEventListener('keyup', this.handleEscPress, true);
    };

    handleChange = selection => {
        const { multiselect, onChange } = this.props;

        onChange(selection);

        if (!multiselect) {
            this.toggleDropdown(null, true);
        }
    };

    handleClickOutside = ({ target }) => {
        // Collapse dropdown on click outside
        if (!this.dropdown || !this.dropdown.current) {
            return false;
        }
        if (this.dropdown.current.contains(target)) {
            return false;
        }
        const { expanded } = this.state;
        if (!expanded) {
            return false;
        }
        this.toggleDropdown(null, true);
        return true;
    };

    handleEscPress = event => {
        // Collapse dropdown on esc press
        event.stopPropagation();
        const key = event.keyCode || event.which;

        if (key !== 27) {
            return false;
        }

        this.toggleDropdown(null, true);
        return false;
    };

    handleSetFilter = event => {
        const {
            target: { value }
        } = event;
        this.setState({
            filterValue: value
        });
    };

    toggleDropdown = (event, collapse = false) => {
        const { expanded } = this.state;

        if (event && event.stopPropagation) {
            event.stopPropagation();
        }

        const newState = {
            expanded: collapse ? false : !expanded
        };

        if (collapse) {
            newState.filterValue = null;
        }

        this.setState(newState);

        return true;
    };

    render() {
        const {
            children,
            initiallyOpened,
            label,
            multiselect,
            selectedLabel,
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
                    <Button {...rest} onClick={this.toggleDropdown}>
                        {selectedLabel ? selectedLabel(selection) : label}
                        <IconCaret {...this.elem('caret')} />
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
    /** The dropdown content */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    /** Context for this dropdown */
    context: PropTypes.oneOf(['link', ...CONTEXTS]),
    /** Wether the dropdown should be expanded when rendered */
    initiallyOpened: PropTypes.bool,
    /** Renders block-level dropdown trigger */
    isBlock: PropTypes.bool,
    /** Label for the dropdown trigger */
    label: PropTypes.node.isRequired,
    /** Wether it is possible to select multiple items */
    multiselect: PropTypes.bool,
    /** Callback function to be triggered when selecting items */
    onChange: PropTypes.func,
    /** Returns the label to be shown in case of a selection */
    selectedLabel: PropTypes.func,
    /** Size for the dropdown trigger */
    size: PropTypes.oneOf(SIZES),
    /** Current selection */
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
