/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { bem } from '../../utils';
import { Context } from '../../constants';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Short and descriptive title */
    title: string;
    /** Body content */
    content?: string;
    /** The Toast context (e.g. info, critical, success or cautious - defaults to info) */
    context?: Context;
    /** If there are actions (links or buttons) in the toast */
    actionable?: boolean;
    /** Action object, containing item text and href to action */
    actionOne?: { text: string; href: string };
    /** Action object, containing item text and href to action */
    actionTwo?: { text: string; href: string };
}

// const { block } = bem('Toast', styles);

export const Toast: React.FC<Props> = (props) => <div />;

Toast.displayName = 'Toast';
