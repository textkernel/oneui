import * as React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { bem } from '../../utils';
import styles from './Modal.scss';

const { block, elem } = bem('Modal', styles);

export const Modal = (props) => {
    const {
        children,
        isOpen,
        contentLabel,
        onRequestClose,
        className,
        portalClassName,
        overlayClassName,
        ...rest
    } = props;

    const { className: portalClass } = block({ className: portalClassName, ...rest });
    const { className: overlayClass } = elem('overlay', {
        ...props,
        elemClassName: overlayClassName,
    });
    const { className: overlayEnteredClass } = elem('overlay--entered', props);
    const { className: overlayExitedClass } = elem('overlay--exited', props);
    const { className: contentClass } = elem('content', { ...props, elemClassName: className });
    const { className: contentEnteredClass } = elem('content--entered', props);
    const { className: contentExitedClass } = elem('content--exited', props);

    return (
        <ReactModal
            isOpen={isOpen}
            contentLabel={contentLabel}
            onRequestClose={onRequestClose}
            closeTimeoutMS={300}
            portalClassName={portalClass}
            overlayClassName={{
                base: overlayClass,
                afterOpen: overlayEnteredClass,
                beforeClose: overlayExitedClass,
            }}
            className={{
                base: contentClass,
                afterOpen: contentEnteredClass,
                beforeClose: contentExitedClass,
            }}
            {...rest}
        >
            {children}
        </ReactModal>
    );
};

/**
 * Inits ReactModal and sets global params for it.
 * @param {string} selector - css selector for the app element
 */
Modal.setAppElement = (selector) => {
    ReactModal.setAppElement(selector);
};

Modal.displayName = 'Modal';

Modal.propTypes = {
    /** elements to be rendered within the modal */
    children: PropTypes.node.isRequired,
    /** The state of the modal */
    isOpen: PropTypes.bool.isRequired,
    /** A title for the modal that will be used by screenreaders */
    contentLabel: PropTypes.string.isRequired,
    /** A function to be called when the modal is closed */
    onRequestClose: PropTypes.func,
    /** Additional class to be applied to the content part */
    className: PropTypes.string,
    /** Additional class to be applied to the overlay */
    overlayClassName: PropTypes.string,
    /** Additional class to be applied to the portal */
    portalClassName: PropTypes.string,
};

Modal.defaultProps = {
    onRequestClose: null,
    className: '',
    overlayClassName: null,
    portalClassName: null,
};
