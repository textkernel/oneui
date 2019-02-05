import PropTypes from 'prop-types';

const Tab = ({ children }) => children;

Tab.displayName = 'Tab';

Tab.propTypes = {
    /** The tab content */
    children: PropTypes.node.isRequired,
    /** Unique ID for this tab */
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    /** Label for this tab */
    label: PropTypes.node.isRequired
};

Tab.defaultProps = {};

export default Tab;
