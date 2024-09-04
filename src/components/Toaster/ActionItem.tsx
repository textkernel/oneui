import * as React from 'react';
import { ENTER_KEY } from '../../constants';
import styles from './Toaster.scss';
import { bem } from '../../utils';

export interface ActionProps {
    /** Action object, containing text, callback and/or href to action  */
    text: string;
    callback?: () => void;
    href?: string;
}

const { elem } = bem('Toast', styles);

export const ActionItem = (props: { action: ActionProps; dismissToast: () => void }) => {
    const { action, dismissToast } = props;
    if (action.callback) {
        const handleOnClick = () => {
            action.callback!();
            dismissToast();
        };
        const handleKeyDown = (e) => {
            if (e.key === ENTER_KEY) {
                handleOnClick();
            }
        };
        return (
            <div
                onClick={handleOnClick}
                onKeyDown={handleKeyDown}
                {...elem('toastAction')}
                tabIndex="0"
                role="button"
            >
                {action.text}
            </div>
        );
    }
    if (action.href) {
        return (
            <a
                onClick={dismissToast}
                href={action.href}
                target="_blank"
                rel="noreferrer"
                {...elem('toastAction')}
            >
                {action.text}
            </a>
        );
    }
    return null;
};

ActionItem.displayName = 'ActionItem';
