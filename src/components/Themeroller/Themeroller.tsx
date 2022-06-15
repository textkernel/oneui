import * as React from 'react';
import { bem } from '../../utils';
import OneUI from '../../utils/OneUI';
import { OneUITheme } from '../../themes/OneUITheme';
import { ThemeGenerator } from '../../packages/ThemeGenerator';
import { ThemeJsonResult } from '../../packages/ThemeGenerator/ThemeResult';
import { ThemerollerConfig } from '../../themes/themerollerConfig';
import { Text } from '../Text';
import { Field } from '../Field';
import { Input } from '../Input';
import { Callout } from '../Callout';
import { ThemeTuner } from './ThemeTuner';
import { ThemeActions } from './ThemeActions';
import styles from './Themeroller.scss';

type CssVars = {
    [key: string]: string;
};

export type ThemerollerChildrenProps = {
    cssVars: CssVars;
    reset: () => void;
};
interface Props {
    /** Themeroller config */
    config: ThemerollerConfig;
    /** label for theme name input */
    inputLabel?: string;
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
    /** Theme result data */
    themeResultData?: unknown;
    /** function to be called when styles were modified */
    onChange?: (themeResult: ThemeJsonResult) => void;
}

const { block, elem } = bem('Themeroller', styles);

export const Themeroller: React.FC<Props> = ({
    config,
    themeResultData,
    inputLabel = '',
    resetLabel,
    downloadLabel,
    fileLabel,
    downloadTooltipLabel,
    onChange,
}) => {
    const oneUITheme = React.useMemo(() => new ThemeGenerator(OneUITheme), []);
    const [themeResultStore, setThemeResultStore] = React.useState(oneUITheme.result);
    const [error, setError] = React.useState('');

    const validateAndUseThemeResult = (data: unknown) => {
        try {
            oneUITheme.replaceTheme(data);
            setThemeResultStore(oneUITheme.result);
        } catch (err) {
            setError(JSON.stringify(err));
        }
    };

    const handleFileChange = (e, content: string) => {
        try {
            const fileTheme = JSON.parse(content);
            validateAndUseThemeResult(fileTheme);
        } catch (err) {
            setError(JSON.stringify(err));
        }
    };

    const handleNameChange = (e) => {
        oneUITheme.setTheme(e.target.value, themeResultStore.theme.cssVariables);
        setThemeResultStore(oneUITheme.result);
    };

    const handleGenerate = (cssVars) => {
        oneUITheme.setTheme(themeResultStore.name, cssVars);
        setThemeResultStore(oneUITheme.result);
    };

    const handleReset = () => {
        oneUITheme.setTheme('', {});
        setThemeResultStore(oneUITheme.result);
    };

    const handleDownload = () => {
        oneUITheme.saveAsJson();
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleDownload();
    };

    React.useEffect(() => {
        if (themeResultData) {
            validateAndUseThemeResult(themeResultData);
        }
    }, []);

    React.useEffect(() => {
        const css = oneUITheme.getStyles();
        OneUI.applyThemeStyle(css);
        if (onChange) {
            onChange(themeResultStore.toJSON());
        }
        setError('');
    }, [themeResultStore.theme]);

    return (
        <ThemeTuner
            {...block()}
            config={config}
            cssVars={themeResultStore.theme.cssVariables}
            onChange={handleGenerate}
        >
            <form onSubmit={handleFormSubmit}>
                <Field labelText={inputLabel}>
                    <Input
                        size="small"
                        type="text"
                        value={themeResultStore.name}
                        onChange={handleNameChange}
                    />
                    {Boolean(themeResultStore.fileName) && (
                        <Text {...elem('themeName')} inline context="muted">
                            {themeResultStore.fileName}
                        </Text>
                    )}
                </Field>
                <ThemeActions
                    resetLabel={resetLabel}
                    downloadLabel={downloadLabel}
                    fileLabel={fileLabel}
                    downloadTooltipLabel={downloadTooltipLabel}
                    downloadDisabled={!themeResultStore.name}
                    onReset={handleReset}
                    onDownload={handleDownload}
                    onFileChange={handleFileChange}
                />
                {error && (
                    <Callout {...elem('error')} context="bad">
                        {error}
                    </Callout>
                )}
            </form>
        </ThemeTuner>
    );
};

Themeroller.displayName = 'Themeroller';

Themeroller.defaultProps = {
    inputLabel: '',
    resetLabel: '',
    downloadLabel: '',
    downloadTooltipLabel: '',
    fileLabel: '',
    themeResultData: undefined,
    onChange: undefined,
};
