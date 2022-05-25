import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import OneUI, {
    OneUITheme,
    ThemeGenerator,
    Themeroller,
    ThemerollerActions,
    themeConfig,
    TextArea,
    Field,
    Input,
    Callout,
} from '@textkernel/oneui';

storiesOf('Theme|Themeroller', module)
    .addDecorator(withKnobs)
    .add('Theme builder', () => {
        const [themeName, setThemeName] = React.useState('');
        const oneUITheme = new ThemeGenerator(OneUITheme);

        const handleGenerate = (cssVars) => {
            console.log(`onGenerate was called with CSSVars: ${JSON.stringify(cssVars)}}`);
        };

        const handleReset = (resetThemeroller: () => void) => {
            resetThemeroller();
            setThemeName('');
            OneUI.removeThemeStyle();
        };

        const handleDownload = (cssVars) => {
            const theme = oneUITheme.generateTheme(themeName, cssVars);
            ThemeGenerator.saveAsJson(JSON.stringify(theme, undefined, 2), themeName);
        };

        const handleApply = (cssVars) => {
            const theme = oneUITheme.generateTheme(themeName, cssVars);
            const css = ThemeGenerator.getStylesFromTheme(theme);
            OneUI.applyThemeStyle(css);
        };

        return (
            <div>
                <Field labelText="Theme name">
                    <Input
                        size="small"
                        type="text"
                        value={themeName}
                        onChange={(e) => setThemeName(e.target.value)}
                    />
                </Field>
                <br />
                <br />
                <Themeroller themeConfig={themeConfig} onGenerate={handleGenerate}>
                    {({ cssVars, reset }) => (
                        <>
                            <TextArea
                                readOnly
                                style={{ width: '350px', height: '100px', margin: '10px' }}
                                value={JSON.stringify(
                                    oneUITheme.generateTheme(themeName, cssVars),
                                    undefined,
                                    2
                                )}
                            />
                            {!themeName && (
                                <Callout context="warning">
                                    For activating download button please specify the theme name
                                </Callout>
                            )}
                            <ThemerollerActions
                                resetLabel="Reset"
                                downloadLabel="Download"
                                applyLabel="Apply"
                                downloadDisabled={!themeName}
                                onReset={() => handleReset(reset)}
                                onDownload={() => handleDownload(cssVars)}
                                onApply={() => handleApply(cssVars)}
                            />
                        </>
                    )}
                </Themeroller>
            </div>
        );
    });
