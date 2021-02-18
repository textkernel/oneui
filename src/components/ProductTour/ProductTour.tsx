import * as React from 'react';
import { bem } from '../../utils';
import styles from './ProductTour.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Should the tour be shown */
    isOpen: boolean;
    /** An array of ReactElement where each element is one slide */
    children: React.ReactElement[];
    /** The label for the checkbox. If undefined or empty, checkbox will not be shown */
    checkboxLabel?: string;
    /** Cancel button label - required if there are is then 1 slide */
    cancelLabel?: string;
    /** Continue button label - required if there are is then 1 slide */
    continueLabel?: string;
    /** Finish button label */
    finishLabel: string;
    /** A callback if the user clicked the Cancel button without finishing the tour */
    onCancel?: (isChecked?: boolean) => void;
    /** A callback if the user clicked the Finish button */
    onFinished: (isChecked?: boolean) => void;
}

const { block, elem } = bem('ProductTour', styles);

export const ProductTour: React.FC<Props> = (props) => {
    return null;
};

ProductTour.displayName = 'ProductTour';

ProductTour.defaultProps = {
    isOpen: false,
};
