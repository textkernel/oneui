import React, { Children, Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import TabContent from './TabContent';
import TabItem from './TabItem';
import TabMenu from './TabMenu';

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
        const { activeTabId } = props;
        return {
            activeTabId,
            derivedProp: activeTabId
        };
    }

    handleTabChange(e, tabId) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        const { onChange } = this.props;
        this.setState({
            activeTabId: tabId
        });
        if (!onChange) {
            return true;
        }
        return onChange(tabId);
    }

    render() {
        const { activeTabId } = this.state;
        const { children, gutters } = this.props;

        return (
            <Fragment>
                <TabMenu gutters={gutters}>
                    {Children.map(children, tab => {
                        const { id, ...rest } = tab.props;

                        return (
                            <TabItem
                                {...rest}
                                onClick={e => {
                                    this.handleTabChange(e, id);
                                }}
                                isActive={id === activeTabId}
                            />
                        );
                    })}
                </TabMenu>
                {Children.map(children, tab => {
                    const { id } = tab.props;
                    if (id !== activeTabId) {
                        return null;
                    }
                    return <TabContent>{tab.props.children}</TabContent>;
                })}
            </Fragment>
        );
    }
}

Tabs.propTypes = {
    /** Id of currently active tab */
    activeTabId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    /** The tabs */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
    /** Have gutters (white space) on both sides of tab menu */
    gutters: PropTypes.bool,
    /** Callback function, fired when switching tabs by clicking
     Passes the new active tab id as first and only parameter */
    onChange: PropTypes.func
};

Tabs.defaultProps = {
    gutters: false,
    onChange: null
};

export default Tabs;
