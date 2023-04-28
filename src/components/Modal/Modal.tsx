import * as React from 'react';
import ReactModal from 'react-modal';
import { bem } from '../../utils';
import styles from './Modal.scss';

interface Props extends ReactModal.Props {
    /** elements to be rendered within the modal */
    children: React.ReactNode;
    /** The state of the modal */
    isOpen: boolean;
    /** A title for the modal that will be used by screenreaders */
    contentLabel: string;
    /** A function to be called when the modal is closed */
    onRequestClose?: (
        event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
    ) => void;
    /** When true the content of the modal will be scrollable, but the modal itself will stayed fixed inside the viewport */
    isPositionFixed?: boolean;
    /** Additional class to be applied to the content part */
    className?: string;
    /** Additional class to be applied to the overlay */
    overlayClassName?: string;
    /** Additional class to be applied to the portal */
    portalClassName?: string;
}

interface Modal<P> extends React.FunctionComponent<P> {
    setAppElement: (appElement: string | HTMLElement) => void;
}

const { block, elem } = bem('Modal', styles);

/**
 * ## Usage information
 * This component is a wrapper around [react-modal](http://reactcommunity.org/react-modal/#usage).
 *
 * * You can pass other props according to their definition, apart from classes.
 * * For accessibility reasons you need to __initialize__ modal use in your app.
 *
 * For more info see [app element](http://reactcommunity.org/react-modal/accessibility/#app-element)
 * in their documentation. To do this call the following function once:
 *
 *      `__Modal.setAppElement__(appElementSelector);`
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare
const Modal: Modal<Props> = ({
    children,
    isOpen,
    contentLabel,
    onRequestClose,
    className,
    portalClassName,
    overlayClassName,
    isPositionFixed = false,
    ...rest
}) => {
    const overlayRef = React.useRef<HTMLDivElement | null>(null);

    const { className: portalClass } = block({ className: portalClassName, ...rest });
    const { className: bodyOpenClass } = elem('body');
    const { className: overlayClass } = elem('overlay', {
        elemClassName: overlayClassName,
    });
    const { className: overlayEnteredClass } = elem('overlay--entered');
    const { className: overlayExitedClass } = elem('overlay--exited');
    const { className: contentClass } = elem('content', {
        isPositionFixed,
        elemClassName: className,
    });
    const { className: contentEnteredClass } = elem('content--entered');
    const { className: contentExitedClass } = elem('content--exited');

    const setOverlayRef = (node) => {
        overlayRef.current = node;
    };

    // Make sure overlay is scrolled at top after opening
    const onAfterOpen = () => {
        if (overlayRef.current) {
            overlayRef.current.scrollTop = 0;
        }
    };

    return (
        <ReactModal
            isOpen={isOpen}
            contentLabel={contentLabel}
            onRequestClose={onRequestClose}
            closeTimeoutMS={300}
            bodyOpenClassName={bodyOpenClass}
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
            overlayRef={setOverlayRef}
            onAfterOpen={onAfterOpen}
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

export { Modal, Props };
