import * as React from 'react';
import { ReactElement, useEffect, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { createPopper, Instance } from '@popperjs/core';
import { ESCAPE_KEY, PopupPlacement } from '../../constants';

export type PopupBaseRendererArgs = {
    setPopupVisibility: (isOpen: boolean) => void;
    isOpen: boolean;
};

export type PopupBaseRenderer = ({
    setPopupVisibility,
    isOpen,
}: PopupBaseRendererArgs) => ReactElement | null;

export interface Props {
    /**
     * Function, that returns an element that triggers popup.
     * It will be called with a single object as argument that contains:
     *      * setPopupVisibility {function} - can be called with true/false to show/hide the popup
     *      * isOpen {boolean} - the current state of the popup
     * NOTE: The returned element should support refForward, but should not have it set.
     *     If you need to access the ref, pass the ref with anchorRef prop (see below)
     */
    anchorRenderer: PopupBaseRenderer;
    /**
     * Function, that returns popup element.
     * It will be called with a single object as argument that contains:
     *      * setPopupVisibility {function} - can be called with true/false to show/hide the popup
     *      * isOpen {boolean} - the current state of the popup
     * NOTE: The returned element should support refForward, but should not have it set.
     *     If you need to access the ref, pass the ref with popupRef prop (see below)
     */
    popupRenderer: PopupBaseRenderer;
    /** ref object for anchor */
    anchorRef?: React.RefObject<HTMLElement>;
    /** ref object for popup */
    popupRef?: React.RefObject<HTMLElement>;
    /** placement of the popup dialog relative to anchor */
    placement?: PopupPlacement;
    /** additional Popper options. See https://popper.js.org/docs/v2/constructors/#options */
    popperOptions?: object;
    /** To render the popup in a portal. Useful if the anchor element has overflow hidden and similar cases */
    renderInPortal?: boolean;
    /** a function to be called when the popup closes */
    onClose?: () => void;
}

export const PopupBase: React.FC<Props> = ({
    anchorRenderer,
    popupRenderer,
    anchorRef,
    popupRef,
    placement = 'bottom-start',
    renderInPortal = false,
    onClose,
    popperOptions = {},
}) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const anchorRefInit = anchorRef ?? React.createRef<HTMLElement>();
    const popupRefInit = popupRef ?? React.createRef<HTMLElement>();
    let popper: Instance | undefined;

    const close = () => {
        if (isOpen) {
            if (onClose) {
                onClose();
            }
            setIsOpen(false);
        }
    };

    const wasPopupClicked = (event) => {
        if (event.composedPath && anchorRefInit.current && popupRefInit.current) {
            return Array.from(event.composedPath()).some((node) => {
                // Must be Element node
                if ((node as Element).nodeType === 1) {
                    return popupRefInit.current && popupRefInit.current.contains(node as Element);
                }
                return false;
            });
        }
        return false;
    };

    const wasAnchorClicked = (event) => {
        if (anchorRefInit.current) {
            return anchorRefInit.current.contains(event.target);
        }
        return false;
    };

    const handleWindowClick = (event) => {
        if (isOpen) {
            if (!wasPopupClicked(event) && !wasAnchorClicked(event)) {
                close();
            }
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === ESCAPE_KEY) {
            close();
        }
    };

    const destroyPopperInstance = () => {
        if (popper) {
            popper.destroy();
            popper = undefined;
        }
    };

    const createPopperInstance = () => {
        if (anchorRefInit.current && popupRefInit.current) {
            destroyPopperInstance();
            popper = createPopper(anchorRefInit.current, popupRefInit.current, {
                placement,
                ...popperOptions,
            });
        }
    };

    useLayoutEffect(() => {
        if (isOpen) {
            createPopperInstance();
        } else {
            destroyPopperInstance();
        }
    });

    useEffect(() => {
        document.addEventListener('click', handleWindowClick);
        document.addEventListener('keydown', handleKeyPress, false);

        return () => {
            document.removeEventListener('click', handleWindowClick);
            document.removeEventListener('keydown', handleKeyPress, false);
        };
    });

    const setPopupVisibility = (shouldBeOpen) => {
        if (shouldBeOpen !== isOpen) {
            setIsOpen(shouldBeOpen);
        }
    };

    const getArgs = () => ({
        setPopupVisibility,
        isOpen,
    });

    const renderAnchor = () => {
        const anchorElem = anchorRenderer(getArgs());
        // @ts-ignore
        return anchorRefInit && React.cloneElement(anchorElem, { ref: anchorRefInit });
    };

    const renderPopup = () => {
        if (isOpen) {
            const popupElem = popupRenderer(getArgs());
            if (!popupElem) {
                return null;
            }

            const popupElemWithProps = React.cloneElement(popupElem, {
                ref: popupRefInit,
                'data-popup': 'true',
            });

            return renderInPortal
                ? ReactDOM.createPortal(popupElemWithProps, document.body)
                : popupElemWithProps;
        }

        return null;
    };

    return (
        <>
            {renderAnchor()}
            {renderPopup()}
        </>
    );
};

PopupBase.displayName = 'PopupBase';
