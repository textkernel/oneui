import React, { Children, PureComponent } from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './Tabs.scss';

class Tabs extends PureComponent {
    constructor(props) {
        super(props);

        const { activeTabId } = props;

        this.state = {
            activeTabId,
            derivedProp: activeTabId // eslint-disable-line react/no-unused-state
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.activeTabId === state.derivedProp) {
            return null;
        }
        return {
            activeTabId: props.activeTabId,
            derivedProp: props.activeTabId
        };
    }

    handleTabChange(e, id) {
        e.preventDefault();
        const { onChange } = this.props;
        this.setState({
            activeTabId: id
        });
        if (!onChange) {
            return true;
        }
        return onChange(id);
    }

    render() {
        const { activeTabId: idFromProps, children, onChange, ...rest } = this.props;
        const { activeTabId } = this.state;

        return (
            <div {...rest} {...this.block()}>
                <div {...this.elem('container')}>
                    {Children.map(children, tab => {
                        const { href, id } = tab.props;
                        if (!id) {
                            return null;
                        }
                        const active = activeTabId === id;
                        return (
                            <a
                                href={href || '#'}
                                {...this.elem(active ? 'tabActive' : 'tab')}
                                key={id}
                                onClick={e => {
                                    this.handleTabChange(e, id);
                                }}
                            >
                                {tab.props.label}
                            </a>
                        );
                    })}
                </div>
                {Children.map(children, tab => {
                    const { id } = tab.props;
                    if (id !== activeTabId) {
                        return null;
                    }
                    return tab;
                })}
            </div>
        );
    }
}

Tabs.propTypes = {
    /** Id of currently active tab */
    activeTabId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    /** The tabs */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
    /** Callback function, fired when switching tabs by clicking
     Passes the new active tab id as first and only parameter */
    onChange: PropTypes.func
};

Tabs.defaultProps = {
    onChange: null
};

export default bem(styles)(Tabs);
