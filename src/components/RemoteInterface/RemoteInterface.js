import PropTypes from 'prop-types';
import { PureComponent } from 'react';

let timeout;

const state = {
    loading: false,
    response: null
};

class RemoteInterface extends PureComponent {
    state = {
        ...state
    };

    componentDidMount() {
        this.fetch();
    }

    componentDidUpdate(prevProps) {
        const { delay } = this.props;
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
            clearTimeout(timeout);
            setTimeout(this.fetch.bind(this), delay);
        }
    }

    fetch() {
        const { endpoint, method, onError, ...rest } = this.props;

        this.setState({ ...state }, () => {
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
                .catch(err => {
                    this.setState({ ...state });

                    if (onError) {
                        onError(err);
                    }
                });
        });
    }

    render() {
        const { children } = this.props;

        return children(this.state);
    }
}

RemoteInterface.displayName = 'RemoteInterface';

RemoteInterface.propTypes = {
    /** Renderer function */
    children: PropTypes.func.isRequired,
    /** Debounce delay */
    delay: PropTypes.number,
    /** URL to the API endpoint */
    endpoint: PropTypes.string.isRequired,
    /** Request method */
    method: PropTypes.oneOf(['GET', 'POST']),
    onError: PropTypes.func
};

RemoteInterface.defaultProps = {
    delay: 0,
    method: 'GET',
    onError: null
};

export default RemoteInterface;
