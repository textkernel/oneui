import * as React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createPopper } from '@popperjs/core';
import { POPUP_PLACEMENTS, ESCAPE_KEY } from '../../constants';

export class PopupBase extends React.Component {
    constructor(props) {
        super(props);
        const { anchorRef, popupRef } = props;

        this.state = { isOpen: false };
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
        const { isOpen } = this.state;
        if (isOpen && !prevState.isOpen) {
            this.createPopperInstance();
        }
        if (!isOpen && prevState.isOpen) {
            this.destroyPopperInstance();
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleWindowClick);
        document.removeEventListener('keydown', this.handleKeyPress, false);
    }

    handleWindowClick(event) {
        const { isOpen } = this.state;

        if (isOpen) {
            if (!this.wasPopupClicked(event) && !this.wasAnchorClicked(event)) {
                this.close();
            }
        }
    }

    handleKeyPress(event) {
        if (event.key === ESCAPE_KEY) {
            this.close();
        }
    }

    setPopupVisibility(shouldBeOpen) {
        const { isOpen } = this.state;
        if (shouldBeOpen !== isOpen) {
            this.setState({ isOpen: shouldBeOpen });
        }
    }

    getArgs() {
        const { isOpen } = this.state;
        return {
            setPopupVisibility: this.setPopupVisibility,
            isOpen,
        };
    }

    wasPopupClicked(event) {
        if (event.composedPath && this.anchorRef.current) {
            return Array.from(event.composedPath()).some((node) => {
                // Must be Element node
                if (node.nodeType === 1) {
                    return this.popupRef.current.contains(node);
                }
                return false;
            });
        }
        return false;
    }

    wasAnchorClicked(event) {
        if (this.anchorRef.current) {
            return this.anchorRef.current.contains(event.target);
        }
        return false;
    }

    close() {
        const { onClose } = this.props;
        const { isOpen } = this.state;

        if (isOpen) {
            if (onClose) {
                onClose();
            }
            this.setState({ isOpen: false });
        }
    }

    createPopperInstance() {
        if (this.anchorRef.current && this.popupRef.current) {
            const { placement, popperOptions } = this.props;
            this.destroyPopperInstance();
            this.popper = createPopper(this.anchorRef.current, this.popupRef.current, {
                placement,
                ...popperOptions,
            });
        }
    }

    destroyPopperInstance() {
        if (this.popper) {
            this.popper.destroy();
            this.popper = undefined;
        }
    }

    renderAnchor() {
        const { anchorRenderer } = this.props;
        const anchorElem = anchorRenderer(this.getArgs());
        return React.cloneElement(anchorElem, { ref: this.anchorRef });
    }

    renderPopup() {
        const { renderInPortal } = this.props;
        const { isOpen } = this.state;
        if (isOpen) {
            const { popupRenderer } = this.props;
            const popupElem = popupRenderer(this.getArgs());
            if (!popupElem) {
                return null;
            }

            const popupElemWithProps = React.cloneElement(popupElem, {
                ref: this.popupRef,
                'data-popup': 'true',
            });

            return renderInPortal
                ? ReactDOM.createPortal(popupElemWithProps, document.body)
                : popupElemWithProps;
        }

        return null;
    }

    render() {
        return (
            <>
                {this.renderAnchor()}
                {this.renderPopup()}
            </>
        );
    }
}

PopupBase.displayName = 'PopupBase';

PopupBase.propTypes = {
    /**
     * Function, that returns an element that triggers popup.
     * It will be called with a single object as argument that contains:
     *      * setPopupVisibility {function} - can be called with true/false to show/hide the popup
     *      * isOpen {boolean} - the current state of the popup
     * NOTE: The returned element should support refForward, but should not have it set.
     *     If you need to access the ref, pass the ref with anchorRef prop (see below)
     */
    anchorRenderer: PropTypes.func.isRequired,
    /**
     * Function, that returns popup element.
     * It will be called with a single object as argument that contains:
     *      * setPopupVisibility {function} - can be called with true/false to show/hide the popup
     *      * isOpen {boolean} - the current state of the popup
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
    /** additional Popper options. See https://popper.js.org/docs/v2/constructors/#options */
    popperOptions: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    /** To render the popup in a portal. Useful if the anchor element has overflow hidden and similar cases */
    renderInPortal: PropTypes.bool,
    /** a function to be called when the popup closes */
    onClose: PropTypes.func,
};

PopupBase.defaultProps = {
    anchorRef: null,
    popupRef: null,
    placement: 'bottom-start',
    renderInPortal: false,
    onClose: null,
    popperOptions: {},
};
