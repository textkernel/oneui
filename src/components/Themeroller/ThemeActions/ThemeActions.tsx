import * as React from 'react';
import { FaDownload, FaUpload, FaUndo } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { bem } from '../../../utils';
import { Button, FileButton } from '../../Buttons';
import { Tooltip } from '../../Tooltip';
import styles from './ThemeActions.scss';

interface Props {
    /** label for reset button */
    resetLabel?: string;
    /** label for default reset button */
    resetDefaultLabel?: string;
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
    /** callback is called when default reset was called */
    onDefaultReset?: () => void;
    /** callback is called when download was called */
    onDownload?: () => void;
    /** callback is called when choose file was called */
    onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, content: string) => void;
}

const { block, elem } = bem('ThemeActions', styles);

export const ThemeActions: React.FC<Props> = ({
    resetLabel,
    resetDefaultLabel,
    downloadLabel,
    fileLabel,
    downloadTooltipLabel,
    downloadDisabled,
    onReset,
    onDefaultReset,
    onDownload,
    onFileChange,
}) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onFileChange && e.target.files && e?.target?.files?.[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (r) => {
                if (r?.target?.result) {
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
                        <MdClose {...elem('closeIcon')} />
                        {resetLabel}
                    </>
                </Button>
            )}
            {resetDefaultLabel && onDefaultReset && (
                <Button
                    {...elem('button')}
                    type="reset"
                    size="small"
                    context="warning"
                    onClick={onDefaultReset}
                >
                    <>
                        <FaUndo {...elem('icon')} />
                        {resetDefaultLabel}
                    </>
                </Button>
            )}
            {fileLabel && onFileChange && (
                <div {...elem('button')}>
                    <FileButton
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
                </div>
            )}
            {downloadLabel && onDownload && (
                <Tooltip
                    content={downloadTooltipLabel}
                    placement="bottom"
                    disabled={!downloadDisabled}
                >
                    <span>
                        {/**
                         * Tooltip doesn't work when button is disabled,
                         * thus we need to wrapp button in any tag.
                         */}
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