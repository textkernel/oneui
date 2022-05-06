import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import OneUI, {
    OneUITheme,
    ThemeGenerator,
    Themeroller,
    ThemerollerActions,
    ThemeConfig,
    TextArea,
} from '@textkernel/oneui';

const themeConfig: ThemeConfig = [
    {
        fieldsetName: 'Colors',
        items: [
            {
                label: 'Background color',
                type: 'color',
                var: '--color-background',
                value: '#ffffff',
            },
            {
                label: 'Foreground color',
                type: 'color',
                var: '--color-foreground',
                value: '#1d1d1b',
            },
            {
                label: 'Brand color',
                type: 'color',
                var: '--color-brand',
                value: '#0097d1',
            },
            {
                label: 'Primary color',
                type: 'color',
                var: '--color-primary',
                value: '#f18700',
            },
            {
                label: 'Accent color',
                type: 'color',
                var: '--color-accent',
                value: '#182642',
            },
            {
                label: 'Info color',
                type: 'color',
                var: '--color-info',
                value: '#60c4de',
            },
            {
                label: 'Warning color',
                type: 'color',
                var: '--color-warning',
                value: '#ffb819',
            },
            {
                label: 'Bad color',
                type: 'color',
                var: '--color-bad',
                value: '#f42534',
            },
            {
                label: 'Neutral color',
                type: 'color',
                var: '--color-neutral',
                value: '#d0d1d5',
            },
            {
                label: 'Muted color',
                type: 'color',
                var: '--color-muted',
                value: '#b3b2b2',
            },
            {
                label: 'Good color',
                type: 'color',
                var: '--color-good',
                value: '#5cb85c',
            },
        ],
    },
    {
        fieldsetName: 'Sizing',
        items: [
            {
                label: 'Border radius',
                type: 'size',
                var: '--border-radius',
                value: '3',
                unit: 'px',
            },
            {
                label: 'Border width',
                type: 'size',
                var: '--line-normal',
                value: '3',
                unit: 'px',
            },
            {
                label: 'Box shadow outline',
                type: 'size',
                var: '--outline-size',
                value: '3',
                unit: 'px',
            },
            {
                label: 'Spacing regular',
                type: 'size',
                var: '--spacing-normal',
                value: '3',
                unit: 'px',
            },
            {
                label: 'Site min-width',
                type: 'size',
                var: '--site-container-min-size',
                value: '1150',
                unit: 'px',
            },
            {
                label: 'Site max-width',
                type: 'size',
                var: '--site-container-max-size',
                value: '1400',
                unit: 'px',
            },
            {
                label: 'Left pane width',
                type: 'size',
                var: '--two-pane-left-width',
                value: '550',
                unit: 'px',
            },
            {
                label: 'Search button size',
                type: 'size',
                var: '--search-button-size',
                value: '36',
                unit: 'px',
            },
            {
                label: 'Stepper button size',
                type: 'size',
                var: '--stepper-button-size',
                value: '24',
                unit: 'px',
            },
        ],
    },
    {
        fieldsetName: 'Typography',
        items: [
            {
                label: 'Font size',
                type: 'size',
                var: '--font-size-base',
                value: '14',
                unit: 'px',
            },
            {
                label: 'X small font size',
                type: 'size',
                var: '--font-size-x-small',
                value: '10',
                unit: 'px',
            },
            {
                label: 'Small font size',
                type: 'size',
                var: '--font-size-small',
                value: '12',
                unit: 'px',
            },
            {
                label: 'Normal font size',
                type: 'size',
                var: '--font-size-normal',
                value: '14',
                unit: 'px',
            },
            {
                label: 'Large font size',
                type: 'size',
                var: '--font-size-large',
                value: '16.8',
                unit: 'px',
            },
            {
                label: 'H1 font size',
                type: 'size',
                var: '--h1-font-size',
                value: '24',
                unit: 'px',
            },
            {
                label: 'H2 font size',
                type: 'size',
                var: '--h2-font-size',
                value: '18',
                unit: 'px',
            },
            {
                label: 'H3 font size',
                type: 'size',
                var: '--h3-font-size',
                value: '16',
                unit: 'px',
            },
            {
                label: 'H4 font size',
                type: 'size',
                var: '--h4-font-size',
                value: '14',
                unit: 'px',
            },
            {
                label: 'H5 font size',
                type: 'size',
                var: '--h5-font-size',
                value: '12',
                unit: 'px',
            },
            {
                label: 'H6 font size',
                type: 'size',
                var: '--h6-font-size',
                value: '10',
                unit: 'px',
            },
            {
                label: 'Primary font family',
                type: 'string',
                var: '--font-family-primary',
                value: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Droid Sans, Helvetica Neue, sans-serif',
            },
            {
                label: 'Secondary font family',
                type: 'string',
                var: '--font-family-secondary',
                value: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Droid Sans, Helvetica Neue, sans-serif',
            },
            {
                label: 'Font weight light',
                type: 'string',
                var: '--font-weight-light',
                value: '200',
            },
            {
                label: 'Font weight normal',
                type: 'string',
                var: '--font-weight-normal',
                value: '400',
            },
            {
                label: 'Font weight medium',
                type: 'string',
                var: '--font-weight-medium',
                value: '500',
            },
            {
                label: 'Font weight bold',
                type: 'string', // Change to number
                var: '--font-weight-bold',
                value: '600',
            },
            {
                label: 'Link decoration',
                type: 'string',
                var: '--link-decoration-normal',
                value: 'none',
            },
            {
                label: 'Link hover decoration',
                type: 'string',
                var: '--link-decoration-hover',
                value: 'underline',
            },
        ],
    },
    {
        fieldsetName: 'Misc',
        items: [
            {
                label: 'Quick transition duration',
                type: 'size', // Change to unit
                var: '--transition-duration-quick',
                value: '0.1',
                unit: 's',
            },
            {
                label: 'Transition duration',
                type: 'size',
                var: '--transition-duration',
                value: '0.3',
                unit: 's',
            },
            {
                label: 'Drawer width',
                type: 'size',
                var: '--drawer-width',
                value: '400',
                unit: 'px',
            },
            {
                label: 'Drawer z-index',
                type: 'string',
                var: '--drawer-z-index',
                value: '800',
            },
            {
                label: 'Drawer head bg-color',
                type: 'color',
                var: '--drawer-head-background-color',
                value: '#333333',
            },
            {
                label: 'Drawer arrow active bg-color',
                type: 'color',
                var: '--drawer-expand-active-background-color',
                value: '#797777',
            },
            {
                label: 'Drawer arrow hover bg-color',
                type: 'color',
                var: '--drawer-expand-hover-background-color',
                value: '#565656',
            },
            {
                label: 'Header height',
                type: 'size',
                var: '--header-height',
                value: '50',
                unit: 'px',
            },
            {
                label: 'Footer height',
                type: 'size',
                var: '--footer-height',
                value: '100',
                unit: 'px',
            },
            {
                label: 'Navigation height',
                type: 'size',
                var: '--navigation-height',
                value: '48',
                unit: 'px',
            },
        ],
    },
];

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
            const oneUIDiffCssVariables = oneUITheme.generateDiff(cssVars);
            ThemeGenerator.saveAsCss(oneUIDiffCssVariables);
        };

        const handleApply = (cssVars) => {
            const oneUIDiffCssVariables = oneUITheme.generateDiff(cssVars);
            OneUI.applyThemeStyle(ThemeGenerator.wrapInRoot(oneUIDiffCssVariables));
        };

        return (
            <Themeroller themeConfig={themeConfig} onGenerate={handleGenerate}>
                {({ cssVars, reset }) => (
                    <>
                        <TextArea
                            readOnly
                            style={{ width: '350px', height: '100px', margin: '10px' }}
                            value={ThemeGenerator.wrapInRoot(oneUITheme.generateDiff(cssVars))}
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
