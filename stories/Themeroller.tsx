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
} from '@textkernel/oneui';

storiesOf('Theme|Themeroller', module)
    .addDecorator(withKnobs)
    .add('Theme builder', () => {
        const oneUITheme = new ThemeGenerator(OneUITheme);

        const handleGenerate = (cssVars) => {
            console.log(`onGenerate was called with CSSVars: ${JSON.stringify(cssVars)}}`);
        };

        const handleReset = (resetThemeroller: () => void) => {
            resetThemeroller();
            OneUI.removeThemeStyle();
        };

        const handleDownload = (cssVars) => {
            const oneUICssDiff = oneUITheme.generateJSONDiff(cssVars);
            ThemeGenerator.saveAsJson(JSON.stringify(oneUICssDiff, undefined, 2));
        };

        const handleApply = (cssVars) => {
            const oneUIJsonDiff = oneUITheme.generateJSONDiff(cssVars);
            const css = ThemeGenerator.generateStylesFromThemeJSON(oneUIJsonDiff);
            OneUI.applyThemeStyle(css);
        };

        return (
            <Themeroller themeConfig={themeConfig} onGenerate={handleGenerate}>
                {({ cssVars, reset }) => (
                    <>
                        <TextArea
                            readOnly
                            style={{ width: '350px', height: '100px', margin: '10px' }}
                            value={JSON.stringify(
                                oneUITheme.generateJSONDiff(cssVars),
                                undefined,
                                2
                            )}
                        />
                        <ThemerollerActions
                            resetLabel="Reset"
                            downloadLabel="Download"
                            applyLabel="Apply"
                            onReset={() => handleReset(reset)}
                            onDownload={() => handleDownload(cssVars)}
                            onApply={() => handleApply(cssVars)}
                        />
                    </>
                )}
            </Themeroller>
        );
    });
