import { ThemerollerConfig } from './themerollerConfigType';

export const THEMEROLLER_CONFIG: ThemerollerConfig = [
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
                value: '#4d4d4d',
            },
            {
                label: 'Brand color',
                type: 'color',
                var: '--color-brand-50',
                value: '#0097d1',
            },
            {
                label: 'Accent color',
                type: 'color',
                var: '--color-accent-50',
                value: '#F88D2B',
            },
            {
                label: 'AI color',
                type: 'color',
                var: '--color-ai-50',
                value: '#5856D6',
            },
            {
                label: 'Neutral color',
                type: 'color',
                var: '--color-neutral-50',
                value: '#808080',
            },
            {
                label: 'Info color',
                type: 'color',
                var: 'color-info-50',
                value: '#007AFF',
            },
            {
                label: 'Success color',
                type: 'color',
                var: '--color-success-50',
                value: '#34C759',
            },
            {
                label: 'Cautious color',
                type: 'color',
                var: '--color-cautious-50',
                value: '#FFCC01',
            },
            {
                label: 'Critical color',
                type: 'color',
                var: '--color-critical-50',
                value: '#FF3B2F',
            },
        ],
    },
    {
        fieldsetName: 'Sizing',
        items: [
            {
                label: 'Border radius',
                type: 'unit',
                var: '--border-radius',
                value: '3',
                unit: 'px',
            },
            {
                label: 'Border width',
                type: 'unit',
                var: '--line-normal',
                value: '3',
                unit: 'px',
            },
            {
                label: 'Space regular',
                type: 'unit',
                var: '--space-25',
                value: '3',
                unit: 'px',
            },
            {
                label: 'Site min-width',
                type: 'unit',
                var: '--site-container-min-size',
                value: '1150',
                unit: 'px',
            },
            {
                label: 'Site max-width',
                type: 'unit',
                var: '--site-container-max-size',
                value: '1400',
                unit: 'px',
            },
            {
                label: 'Left pane width',
                type: 'unit',
                var: '--two-pane-left-width',
                value: '550',
                unit: 'px',
            },
            {
                label: 'Search button size',
                type: 'unit',
                var: '--search-button-size',
                value: '36',
                unit: 'px',
            },
            {
                label: 'Stepper button size',
                type: 'unit',
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
                type: 'unit',
                var: '--font-size-normal',
                value: '16',
                unit: 'px',
            },
            {
                label: 'X small font size',
                type: 'unit',
                var: '--font-size-x-small',
                value: '12',
                unit: 'px',
            },
            {
                label: 'Small font size',
                type: 'unit',
                var: '--font-size-small',
                value: '14',
                unit: 'px',
            },
            {
                label: 'Font size base',
                type: 'unit',
                var: '--font-size-base',
                value: '16',
                unit: 'px',
            },
            {
                label: 'Large font size',
                type: 'unit',
                var: '--font-size-large',
                value: '18',
                unit: 'px',
            },
            {
                label: 'H1 font size',
                type: 'unit',
                var: '--h1-font-size',
                value: '28',
                unit: 'px',
            },
            {
                label: 'H2 font size',
                type: 'unit',
                var: '--h2-font-size',
                value: '24',
                unit: 'px',
            },
            {
                label: 'H3 font size',
                type: 'unit',
                var: '--h3-font-size',
                value: '20',
                unit: 'px',
            },
            {
                label: 'H4 font size',
                type: 'unit',
                var: '--h4-font-size',
                value: '18',
                unit: 'px',
            },
            {
                label: 'H5 font size',
                type: 'unit',
                var: '--h5-font-size',
                value: '16',
                unit: 'px',
            },
            {
                label: 'H6 font size',
                type: 'unit',
                var: '--h6-font-size',
                value: '14',
                unit: 'px',
            },
            {
                label: 'Primary font family',
                type: 'string',
                var: '--font-family-primary',
                value: 'Noto Sans, Noto Sans JP, Noto Sans SC, Noto Sans Hebrew, sans-serif',
            },
            {
                label: 'Font weight normal',
                type: 'number',
                var: '--font-weight-normal',
                value: '400',
            },
            {
                label: 'Font weight bold',
                type: 'number',
                var: '--font-weight-bold',
                value: '600',
            },
            {
                label: 'Link decoration',
                type: 'string',
                var: '--link-decoration-normal',
                value: 'underline',
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
                type: 'unit',
                var: '--transition-duration-quick',
                value: '0.1',
                unit: 's',
            },
            {
                label: 'Transition duration',
                type: 'unit',
                var: '--transition-duration',
                value: '0.3',
                unit: 's',
            },
            {
                label: 'Drawer width',
                type: 'unit',
                var: '--drawer-width',
                value: '400',
                unit: 'px',
            },
            {
                label: 'Drawer z-index',
                type: 'number',
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
                type: 'unit',
                var: '--header-height',
                value: '50',
                unit: 'px',
            },
            {
                label: 'Footer height',
                type: 'unit',
                var: '--footer-height',
                value: '100',
                unit: 'px',
            },
            {
                label: 'Navigation height',
                type: 'unit',
                var: '--navigation-height',
                value: '48',
                unit: 'px',
            },
        ],
    },
];
