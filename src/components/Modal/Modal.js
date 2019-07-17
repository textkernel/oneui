import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import ReactModal from 'react-modal';
import styles from './Modal.scss';

const { block, elem } = bem({
    name: 'Modal',
    classnames: styles
});

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
    const { className: overlayEnterClass } = elem('overlayEnter', props);
    const { className: overlayExitClass } = elem('overlayExit', props);
    const { className: contentClass } = elem('content', props);
    const { className: contentEnterClass } = elem('contentEnter', props);
    const { className: contentExitClass } = elem('contentExit', props);

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
                afterOpen: overlayEnterClass,
                beforeClose: overlayExitClass
            }}
            className={{
                base: contentClassJoined,
                afterOpen: contentEnterClass,
                beforeClose: contentExitClass
            }}
            {...rest}
        >
            {children}
        </ReactModal>
    );
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
    className: PropTypes.string
};

Modal.defaultProps = {
    onRequestClose: null,
    className: ''
};

export default Modal;
