import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import Tab from '../Tab';
import styles from './Tabs.scss';

class Tabs extends PureComponent {
    constructor(props) {
        super(props);

        const { activeTabId } = props;

        this.state = {
            activeTabId
        };
    }

    render() {
        const { activeTabId, children, ...rest } = this.props;

        return (
            <div {...rest} {...this.block()}>
                <div {...this.elem('container')}>
                    {React.Children.map(children, tab => {
                        const active = activeTabId === tab.props.id;
                        return (
                            <a href="#" {...this.elem(active ? 'tabActive' : 'tab')}>
                                {tab.props.label}
                            </a>
                        );
                    })}
                </div>
                {React.Children.map(children, tab => {
                    if (tab.props.id !== activeTabId) {
                        return null;
                    }
                    return tab;
                })}
            </div>
        );
    }
};

Tabs.propTypes = {
    /** ID of currently active tab */
    activeTabId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    /** The tabs */
    children: PropTypes.oneOfType([
        PropTypes.instanceOf(Tab),
        PropTypes.arrayOf(PropTypes.instanceOf(Tab))
    ]).isRequired
};

Tabs.defaultProps = {};

export default bem(styles)(Tabs);
