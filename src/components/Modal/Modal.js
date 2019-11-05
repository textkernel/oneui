import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import bem from '../../utils/bem';
import styles from './Modal.scss';

const { block, elem } = bem('Modal', styles);

const Modal = props => {
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

    const { className: portalClass } = block(props);
    const { className: overlayClass } = elem('overlay', props);
    const { className: overlayEnteredClass } = elem('overlay--entered', props);
    const { className: overlayExitedClass } = elem('overlay--exited', props);
    const { className: contentClass } = elem('content', props);
    const { className: contentEnteredClass } = elem('content--entered', props);
    const { className: contentExitedClass } = elem('content--exited', props);

    const contentClassJoined = [contentClass, className].join(' ');

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
                base: contentClassJoined,
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
Modal.setAppElement = selector => {
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
};

Modal.defaultProps = {
    onRequestClose: null,
    className: '',
};

export default Modal;
