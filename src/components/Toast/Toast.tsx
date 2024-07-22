/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { bem } from '../../utils';
import { Context } from '../../constants';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Short and descriptive title */
    title?: string;
    /** Body content */
    content: string;
    /** The Toast context (e.g. info, critical, success or cautious - defaults to info) */
    context?: Context;
    /** Action array, each containing item text, callback and href to action. Max 2 */
    actions?: { text: string; callback?: () => void; href?: string }[];
    /** The state of the toast */
    isVisible: boolean;
    /** a function that is called when the toast closes via close-button-click */
    onClose?: () => void;
}

// const { block } = bem('Toast', styles);

export const Toast: React.FC<Props> = (props) => <div />;

Toast.displayName = 'Toast';
