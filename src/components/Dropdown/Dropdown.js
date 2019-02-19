import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import Button from '../Button';
import DropdownContent from './DropdownContent';
import { DropdownProvider } from './DropdownContext';
import styles from './Dropdown.scss';
import { CONTEXTS, SIZES } from '../../constants';

class Dropdown extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            expanded: props.initiallyOpened || false
        };
    }

    render() {
        const { children, context, label, multiselect, size } = this.props;
        const { expanded } = this.state;

        return (
            <div {...this.block()}>
                <DropdownProvider
                    value={{
                        multiselect
                    }}
                >
                    <Button context={context} size={size}>
                        {label}
                    </Button>
                    <DropdownContent shown={expanded}>{children}</DropdownContent>
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
    label: PropTypes.node.isRequired,
    multiselect: PropTypes.bool,
    size: PropTypes.oneOf(SIZES)
};

Dropdown.defaultProps = {
    children: null,
    context: 'neutral',
    initiallyOpened: false,
    multiselect: false,
    size: 'normal'
};

export default bem(styles)(Dropdown);
