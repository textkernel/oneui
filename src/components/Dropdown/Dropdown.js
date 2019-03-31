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
        this.dropdownContent = createRef();
    }

    componentDidMount = () => {
        window.addEventListener('click', this.handleClickOutside);
        this.dropdown.current.addEventListener('keyup', this.handleEscPress, true);
    };

    componentWillUnmount = () => {
        window.removeEventListener('click', this.handleClickOutside);
        this.dropdown.current.removeEventListener('keyup', this.handleEscPress, true);
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
        if (!this.dropdownContent || !this.dropdownContent.current) {
            return false;
        }
        if (this.dropdownContent.current.contains(target)) {
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
            renderButton,
            selectedLabel,
            ...rest
        } = this.props;

        const { expanded, filterValue, selection } = this.state;
        const buttonLabel = selectedLabel ? selectedLabel(selection) : label;
        const dropdownButton = renderButton({
            props: {
                ...rest,
                onClick: this.toggleDropdown
            },
            label: buttonLabel,
            caret: <IconCaret {...this.elem('caret')} />
        });

        return (
            <div {...this.block()} ref={this.dropdown}>
                <DropdownProvider
                    value={{
                        filterValue,
                        handleChange: this.handleChange,
                        multiselect,
                        selection,
                        setFilter: this.handleSetFilter
                    }}
                >
                    {dropdownButton}
                    {!!expanded && (
                        <DropdownContent ref={this.dropdownContent} role="menu" aria-expanded shown>
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
    /** Custom dropdown trigger component */
    renderButton: PropTypes.func,
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
    renderButton: ({ props, label, caret }) => (
        <Button {...props}>
            {label}
            {caret}
        </Button>
    ),
    selectedLabel: null,
    size: 'normal',
    value: null
};

Dropdown.propsToMods = ['context'];

export default bem(styles)(Dropdown);
