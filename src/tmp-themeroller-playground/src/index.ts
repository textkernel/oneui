import { OneUITheme } from './OneUITheme';
import { ThemeRollerReactComponent } from './ThemeRollerReactComponent';
import { ThemeGenerator } from './ThemeGenerator';

const themeRollerConfig = [
    {
        fieldsetName: 'Colors',
        items: [
            {
                label: 'Background color',
                type: 'color',
                var: '--color-background',
                value: '#654321',
            },
            {
                label: 'Foreground color',
                type: 'color',
                var: '--color-foreground',
                value: '#123456',
            },
        ],
    },
    {
        fieldsetName: 'Offsets',
        items: [
            {
                label: 'Base offset',
                type: 'size',
                var: '--offset-base',
                value: '10',
                units: 'px',
            },
        ],
    },
];

const themeGenerator = new ThemeGenerator(OneUITheme);

const themeRoller = new ThemeRollerReactComponent(themeRollerConfig, {
    themeGenerator,
});

const customTheme = themeRoller.getTheme();

console.log('\n\nCustom base variables (an output of `ThemeRollerReactComponent` component)\n');
console.log(customTheme);
