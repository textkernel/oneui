import React from 'react';
import toJson from 'enzyme-to-json';
import { Themeroller } from '../Themeroller';

export const ThemerollerConfig = [
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
                label: 'Border radius',
                type: 'unit',
                var: '--border-radius',
                value: '3',
                unit: 'px',
            },
            {
                label: 'Link decoration',
                type: 'string',
                var: '--link-decoration-normal',
                value: 'none',
            },
        ],
    },
    {
        fieldsetName: 'Sizing',
        items: [],
    },
];

describe('Themeroller component', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render component correctly', () => {
        const wrapper = mount(
            <Themeroller
                config={ThemerollerConfig}
                cssVars={{
                    '--color-foreground': '#000000',
                }}
                onChange={() => {}}
            />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
