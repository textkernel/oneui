import PropTypes from 'prop-types';
import { PureComponent } from 'react';

class RemoteInterface extends PureComponent {
    state = {
        response: null,
        loading: true
    };

    componentDidMount() {
        this.fetch();
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
            this.fetch();
        }
    }

    fetch() {
        const { endpoint, method, ...rest } = this.props;

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
        const { children } = this.props;
        const { loading, response } = this.state;

        return children(loading, response);
    }
}

RemoteInterface.propTypes = {
    /** Renderer function */
    children: PropTypes.func.isRequired,
    /** URL to the API endpoint */
    endpoint: PropTypes.string.isRequired,
    /** Request method */
    method: PropTypes.oneOf(['GET', 'POST'])
};

RemoteInterface.defaultProps = {
    method: 'GET'
};

export default RemoteInterface;
