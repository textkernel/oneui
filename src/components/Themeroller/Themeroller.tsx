import * as React from 'react';
import { bem } from '../../utils';
import styles from './Themeroller.scss';

export type CssVars = {
    [index: string]: string;
};

interface Props {
    /**
     * onChange(cssVars) called when the OneUI CSS properties is modified.
     * The function only returns modified OneUI CSS properties.
     * */
    onChange: (cssVars: CssVars) => void;
    /** the OneUI modified CSS properties that will be used as for initial state */
    cssVars?: CssVars;
}

const { block } = bem('Themeroller', styles);

export const Themeroller: React.FC<Props> = (props) => {
    const { cssVars } = props;

    return (
        <div {...block()}>
            <pre>{JSON.stringify(cssVars, null, 2)}</pre>
        </div>
    );
};

Themeroller.displayName = 'Themeroller';
