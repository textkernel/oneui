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

export type CssVars = {
    [key: string]: string;
};

export type ThemerollerChildrenProps = {
    cssVars: CssVars;
    reset: () => void;
};
export interface Props {
    /** Themeroller config */
    config: ThemerollerConfig;
    /** label for theme name input */
    inputLabel?: string;
    /** label for reset button */
    resetLabel?: string;
    /** label for active reset button */
    resetActiveLabel?: string;
    /** label for download button */
    downloadLabel?: string;
    /** label for tooltip download button */
    downloadTooltipLabel?: string;
    /** label for choose file button */
    fileLabel?: string;
    /** if the download button should be disabled */
    downloadDisabled?: boolean;
    /** Active theme result data */
    activeTheme?: unknown;
    /** function to be called when styles were modified */
    onChange?: (themeResult: ThemeJsonResult) => void;
}

const { block, elem } = bem('Themeroller', styles);

export const Themeroller: React.FC<Props> = ({
    config,
    activeTheme = undefined,
    inputLabel = '',
    resetLabel = '',
    resetActiveLabel = '',
    downloadLabel = '',
    fileLabel = '',
    downloadTooltipLabel = '',
    onChange = undefined,
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

    const setTheme = (name: string, cssVars: CssVars) => {
        oneUITheme.setTheme(name, cssVars);
        setThemeResultStore(oneUITheme.result);
    };

    const handleNameChange = (e) => {
        setTheme(e.target.value, themeResultStore.theme.cssVariables);
    };

    const handleGenerate = (cssVars) => {
        setTheme(themeResultStore.name, cssVars);
    };

    const handleReset = () => {
        setTheme('', {});
    };

    const handleActiveReset = () => {
        if (activeTheme) {
            validateAndUseThemeResult(activeTheme);
        }
    };

    const handleDownload = () => {
        oneUITheme.saveAsJson();
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleDownload();
    };

    React.useEffect(
        () => {
            if (activeTheme) {
                validateAndUseThemeResult(activeTheme);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [activeTheme]
    );

    React.useEffect(
        () => {
            const css = oneUITheme.getStyles();
            OneUI.applyThemeStyle(css);
            if (onChange) {
                onChange(themeResultStore.toJSON());
            }
            setError('');
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [themeResultStore.theme]
    );

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
                        <Text {...elem('themeName')} inline context="neutral">
                            {themeResultStore.fileName}
                        </Text>
                    )}
                </Field>
                <ThemeActions
                    resetLabel={resetLabel}
                    resetActiveLabel={resetActiveLabel}
                    downloadLabel={downloadLabel}
                    fileLabel={fileLabel}
                    downloadTooltipLabel={downloadTooltipLabel}
                    downloadDisabled={!themeResultStore.name}
                    onReset={handleReset}
                    onActiveReset={handleActiveReset}
                    onDownload={handleDownload}
                    onFileChange={handleFileChange}
                />
                {error && (
                    <Callout {...elem('error')} context="critical">
                        {error}
                    </Callout>
                )}
            </form>
        </ThemeTuner>
    );
};

Themeroller.displayName = 'Themeroller';
