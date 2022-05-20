import * as React from 'react';
import { FaDownload, FaPlay, FaStop } from 'react-icons/fa';
import { bem } from '../../../utils';
import { Button } from '../../Buttons';
import styles from './ThemerollerActions.scss';

type Props = {
    /** label for reset button */
    resetLabel?: string;
    /** label for download button */
    downloadLabel?: string;
    /** label for apply button */
    applyLabel?: string;
    /** callback is called when reset was called */
    onReset?: () => void;
    /** callback is called when download was called */
    onDownload?: () => void;
    /** callback is called when apply was called */
    onApply?: () => void;
};

const { block, elem } = bem('ThemerollerActions', styles);

export const ThemerollerActions: React.FC<Props> = ({
    resetLabel,
    downloadLabel,
    applyLabel,
    onReset,
    onDownload,
    onApply,
}) => {
    return (
        <div {...block()}>
            {resetLabel && onReset && (
                <Button {...elem('button')} size="small" context="bad" onClick={onReset}>
                    <>
                        <FaStop {...elem('icon')} />
                        {resetLabel}
                    </>
                </Button>
            )}
            {downloadLabel && onDownload && (
                <Button {...elem('button')} size="small" onClick={onDownload}>
                    <>
                        <FaDownload {...elem('icon')} />
                        {downloadLabel}
                    </>
                </Button>
            )}
            {applyLabel && onApply && (
                <Button {...elem('button')} size="small" onClick={onApply}>
                    <>
                        <FaPlay {...elem('icon')} />
                        {applyLabel}
                    </>
                </Button>
            )}
        </div>
    );
};

ThemerollerActions.displayName = 'ThemerollerActions';

ThemerollerActions.defaultProps = {
    resetLabel: '',
    downloadLabel: '',
    applyLabel: '',
    onReset: undefined,
    onDownload: undefined,
    onApply: undefined,
};
