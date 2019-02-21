import PropTypes from 'prop-types';
import { PureComponent } from 'react';

class RemoteInterface extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            response: null,
            loading: true
        };
    }

    componentDidMount() {
        const { endpoint, method, renderer, ...rest } = this.props;

        // eslint-disable-next-line no-undef
        fetch(endpoint, {
            method,
            ...rest
        })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    response,
                    loading: false
                });
            })
            .catch(() => {
                this.setState({
                    response: null,
                    loading: false
                });

                throw new Error('Request failed');
            });
    }

    render() {
        const { renderer } = this.props;
        const { loading, response } = this.state;

        return response ? renderer(loading, response) : renderer(loading);
    }
}

RemoteInterface.propTypes = {
    /** URL to the API endpoint */
    endpoint: PropTypes.string.isRequired,
    /** Request method */
    method: PropTypes.oneOf(['GET', 'POST']),
    /** Renderer function */
    renderer: PropTypes.func.isRequired
};

RemoteInterface.defaultProps = {
    method: 'GET'
};

export default RemoteInterface;
