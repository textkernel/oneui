import * as React from 'react';
import { FaDownload, FaUpload, FaStop } from 'react-icons/fa';
import { bem } from '../../../utils';
import { Button, FileButton } from '../../Buttons';
import { Tooltip } from '../../Tooltip';
import styles from './ThemeActions.scss';

type Props = {
    /** label for reset button */
    resetLabel?: string;
    /** label for download button */
    downloadLabel?: string;
    /** label for tooltip download button */
    downloadTooltipLabel?: string;
    /** label for choose file button */
    fileLabel?: string;
    /** if the download button should be disabled */
    downloadDisabled?: boolean;
    /** callback is called when reset was called */
    onReset?: () => void;
    /** callback is called when download was called */
    onDownload?: () => void;
    /** callback is called when choose file was called */
    onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, content: string) => void;
};

const { block, elem } = bem('ThemeActions', styles);

export const ThemeActions: React.FC<Props> = ({
    resetLabel,
    downloadLabel,
    fileLabel,
    downloadTooltipLabel,
    downloadDisabled,
    onReset,
    onDownload,
    onFileChange,
}) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onFileChange && e.target && e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (r) => {
                if (r.target && r.target.result) {
                    if (typeof r.target.result === 'string') {
                        onFileChange(e, r.target.result);
                    }
                }
            };
            reader.readAsText(file);
        }
    };
    return (
        <div {...block()}>
            {resetLabel && onReset && (
                <Button
                    {...elem('button')}
                    type="reset"
                    size="small"
                    context="bad"
                    onClick={onReset}
                >
                    <>
                        <FaStop {...elem('icon')} />
                        {resetLabel}
                    </>
                </Button>
            )}
            {fileLabel && onFileChange && (
                <FileButton
                    {...elem('button')}
                    size="small"
                    context="good"
                    accept="application/JSON"
                    onChange={handleFileChange}
                >
                    <>
                        <FaUpload {...elem('icon')} />
                        {fileLabel}
                    </>
                </FileButton>
            )}
            {downloadLabel && onDownload && (
                <Tooltip
                    content={downloadTooltipLabel}
                    placement="bottom"
                    disabled={!downloadDisabled}
                >
                    <span>
                        <Button
                            {...elem('button')}
                            disabled={downloadDisabled}
                            size="small"
                            onClick={onDownload}
                        >
                            <>
                                <FaDownload {...elem('icon')} />
                                {downloadLabel}
                            </>
                        </Button>
                    </span>
                </Tooltip>
            )}
        </div>
    );
};

ThemeActions.displayName = 'ThemeActions';

ThemeActions.defaultProps = {
    resetLabel: '',
    downloadLabel: '',
    fileLabel: '',
    downloadDisabled: false,
    onReset: undefined,
    onDownload: undefined,
    onFileChange: undefined,
};
