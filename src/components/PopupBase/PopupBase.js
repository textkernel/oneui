import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import PopperJS from 'popper.js';
import { POPUP_PLACEMENTS, ESCAPE_KEY } from '../../constants';

class PopupBase extends React.Component {
    static checkDOMPath(domElem, checkIsTarget) {
        let currentElem = domElem;
        while (currentElem && currentElem !== document) {
            if (checkIsTarget(currentElem)) return true;
            currentElem = currentElem.parentElement;
        }
        return false;
    }

    constructor(props) {
        super(props);
        const { anchorRef, popupRef } = props;

        this.state = { isOpened: false };
        this.popper = undefined;
        this.anchorRef = anchorRef || React.createRef();
        this.popupRef = popupRef || React.createRef();

        this.setPopupVisibility = this.setPopupVisibility.bind(this);
        this.handleWindowClick = this.handleWindowClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleWindowClick);
        document.addEventListener('keydown', this.handleKeyPress, false);
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
        document.removeEventListener('click', this.handleWindowClick);
        document.removeEventListener('keydown', this.handleKeyPress, false);
    }

    setPopupVisibility(shouldBeOpen) {
        const { isOpened } = this.state;
        if (shouldBeOpen !== isOpened) {
            this.setState({ isOpened: shouldBeOpen });
        }
    }

    getArgs() {
        const { isOpened } = this.state;
        return {
            setPopupVisibility: this.setPopupVisibility,
            isOpened,
        };
    }

    handleWindowClick(event) {
        if (!this.popupRef.current) return;
        const wasPopupClicked = PopupBase.checkDOMPath(
            event.target,
            elem => elem.dataset && !!elem.dataset.popup
        );
        const wasOutsideClicked = !this.popupRef.current.contains(event.target);

        const wasAnchorClicked =
            this.anchorRef.current && this.anchorRef.current.contains(event.target);
        if (!wasPopupClicked && wasOutsideClicked && !wasAnchorClicked) {
            this.close();
        }
    }

    handleKeyPress(event) {
        if (event.key === ESCAPE_KEY) {
            this.close();
        }
    }

    close() {
        const { isOpened } = this.state;
        if (isOpened === true) {
            this.setState({ isOpened: false });
        }
    }

    createPopperInstance() {
        if (!this.anchorRef.current || !this.popupRef.current) return;
        const { placement } = this.props;
        this.destroyPopperIstance();
        this.popper = new PopperJS(this.anchorRef.current, this.popupRef.current, {
            placement,
        });
    }

    destroyPopperIstance() {
        if (!this.popper) return;
        this.popper.destroy();
        this.popper = undefined;
    }

    renderAnchor() {
        const { anchorRenderer } = this.props;
        const anchorElem = anchorRenderer(this.getArgs());
        return React.cloneElement(anchorElem, { ref: this.anchorRef });
    }

    renderPopup() {
        const { isOpened } = this.state;
        if (!isOpened) return null;
        const { popupRenderer } = this.props;
        const popupElem = popupRenderer(this.getArgs());
        const popupElemWithProps = React.cloneElement(popupElem, {
            ref: this.popupRef,
            'data-popup': 'true',
        });
        return ReactDOM.createPortal(popupElemWithProps, document.body);
    }

    render() {
        return (
            <React.Fragment>
                {this.renderAnchor()}
                {this.renderPopup()}
            </React.Fragment>
        );
    }
}

PopupBase.displayName = 'PopupBase';

PopupBase.propTypes = {
    /**
     * Function, that returns an element that triggers popup.
     * It will be called with a single object as argument that contains:
     *      * setPopupVisibility {function} - can be called with true/false to show/hide the popup
     *      * isOpened {boolean} - the current state of the popup
     * NOTE: The returned element should support refForward, but should not have it set.
     *     If you need to access the ref, pass the ref with anchorRef prop (see below)
     */
    anchorRenderer: PropTypes.func.isRequired,
    /**
     * Function, that returns popup element.
     * It will be called with a single object as argument that contains:
     *      * setPopupVisibility {function} - can be called with true/false to show/hide the popup
     *      * isOpened {boolean} - the current state of the popup
     * NOTE: The returned element should support refForward, but should not have it set.
     *     If you need to access the ref, pass the ref with popupRef prop (see below)
     */
    popupRenderer: PropTypes.func.isRequired,
    /** ref object for anchor */
    anchorRef: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    /** ref object for popup */
    popupRef: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    /** placement of the popup dialog relative to anchor */
    placement: PropTypes.oneOf(POPUP_PLACEMENTS),
};

PopupBase.defaultProps = {
    anchorRef: null,
    popupRef: null,
    placement: 'bottom-start',
};

export default PopupBase;
