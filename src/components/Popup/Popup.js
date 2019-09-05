import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import PopperJS from 'popper.js';

export default class Popup extends React.Component {
    static displayName = 'Popup';

    static propTypes = {
        /**
         * Function, that returns an element that triggers popup.
         * NOTE: Element should support refForward
         */
        anchor: PropTypes.func.isRequired,
        /**
         * Function, that returns popup's content.
         * NOTE: Element should support refForward
         */
        content: PropTypes.func.isRequired,
        placement: PropTypes.oneOf([
            'auto',
            'auto-start',
            'auto-end',
            'top',
            'top-start',
            'top-end',
            'right',
            'right-start',
            'right-end',
            'bottom',
            'bottom-start',
            'bottom-end',
            'left',
            'left-start',
            'left-end',
        ]),
    };

    static defaultProps = {
        placement: 'bottom-start',
    };

    static checkDOMPath(domElem, doCheck) {
        let currentElem = domElem;
        while (currentElem && currentElem !== document) {
            if (doCheck(currentElem) === true) return true;
            currentElem = currentElem.parentElement;
        }
        return false;
    }

    constructor(props) {
        super(props);
        this.state = { isOpened: false };
        this.popper = undefined;
        this.anchorRef = React.createRef();
        this.contentRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleWindowClick);
        document.addEventListener('keydown', this.handleEscKeyPress, false);
    }

    componentDidUpdate(prevProps, prevState) {
        const { isOpened } = this.state;
        if (isOpened && !prevState.isOpened) {
            this.createPopperInstance();
        }
        if (!isOpened && prevState.isOpened) {
            this.destroyPopperIstance();
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleWindowClick);
        document.removeEventListener('keydown', this.handleEscKeyPress, false);
    }

    setPopupVisibility = isOpened => {
        if (isOpened !== this.state.isOpened) { // eslint-disable-line
            this.setState({ isOpened });
        }
    };

    getArgs() {
        const { isOpened } = this.state;
        const args = {
            setPopupVisibility: this.setPopupVisibility,
            isOpened,
        };
        if (this.anchorRef.current) {
            const { width } = this.anchorRef.current.getBoundingClientRect();
            args.anchorWidth = width;
        }
        return args;
    }

    handleWindowClick = event => {
        if (!this.contentRef.current) return;
        const wasPopupClicked = Popup.checkDOMPath(
            event.target,
            elem => elem.dataset.popup === 'true'
        );
        const wasOutsideClicked = this.contentRef.current.contains(event.target) === false;
        const wasAnchorClicked =
            this.anchorRef.current && this.anchorRef.current.contains(event.target) === true;
        if (wasPopupClicked === false && wasOutsideClicked === true && wasAnchorClicked === false) {
            this.close();
        }
    };

    handleEscKeyPress = event => {
        if (event.keyCode === 27) {
            this.close();
        }
    };

    close() {
        const { isOpened } = this.state;
        if (isOpened === true) {
            this.setState({ isOpened: false });
        }
    }

    createPopperInstance() {
        if (!this.anchorRef.current || !this.contentRef.current) return;
        const { placement } = this.props;
        this.destroyPopperIstance();
        this.popper = new PopperJS(this.anchorRef.current, this.contentRef.current, {
            placement,
        });
    }

    destroyPopperIstance() {
        if (!this.popper) return;
        this.popper.destroy();
        this.popper = undefined;
    }

    renderAnchor() {
        const { anchor } = this.props;
        const anchorElem = anchor(this.getArgs());
        return React.cloneElement(anchorElem, { ref: this.anchorRef });
    }

    renderContent() {
        const { isOpened } = this.state;
        if (!isOpened) return null;
        const { content } = this.props;
        const contentElem = content(this.getArgs());
        const contentElemWithRef = React.cloneElement(contentElem, {
            ref: this.contentRef,
            'data-popup': 'true',
        });
        return ReactDOM.createPortal(contentElemWithRef, document.body);
    }

    render() {
        return (
            <React.Fragment>
                {this.renderAnchor()}
                {this.renderContent()}
            </React.Fragment>
        );
    }
}
