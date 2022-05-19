import React from 'react';
import toJson from 'enzyme-to-json';
import { Themeroller } from '../Themeroller';

export const themeConfig = [
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
    const onGenerateMock = jest.fn();
    const onRenderPropsMock = jest.fn();

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render component correctly', () => {
        const wrapper = mount(
            <Themeroller themeConfig={themeConfig} onGenerate={onGenerateMock} />
        );
        expect(wrapper.find('.TabItem').at(0).text()).toEqual('Colors');
        expect(wrapper.find('.TabItem').at(1).text()).toEqual('Sizing');

        expect(wrapper.find('ul li p').at(0).text()).toEqual('Background color');
        expect(wrapper.find('ul li').at(0).find('input').prop('value')).toEqual('#ffffff');
        expect(wrapper.find('ul li').at(0).find('.ColorValue__value').at(0).text()).toEqual(
            '#ffffff'
        );

        expect(wrapper.find('ul li p').at(1).text()).toEqual('Foreground color');
        expect(wrapper.find('ul li').at(1).find('input').prop('value')).toEqual('#1d1d1b');
        expect(wrapper.find('ul li').at(1).find('.ColorValue__value').at(0).text()).toEqual(
            '#1d1d1b'
        );

        expect(wrapper.find('ul li p').at(2).text()).toEqual('Border radius');
        expect(wrapper.find('ul li').at(2).find('input').prop('value')).toEqual('3');
        expect(wrapper.find('ul li').at(2).find('.UnitValue__value').at(0).text()).toEqual('3px');

        expect(wrapper.find('ul li p').at(3).text()).toEqual('Link decoration');
        expect(wrapper.find('ul li').at(3).find('input').prop('value')).toEqual('none');
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should invoke onGenerate callback when first input was changed', () => {
        const wrapper = mount(
            <Themeroller themeConfig={themeConfig} onGenerate={onGenerateMock} />
        );
        wrapper
            .find('ul li input')
            .at(0)
            .simulate('change', {
                target: {
                    value: '#00000',
                },
            });
        expect(wrapper.find('ul li').at(0).find('.ColorValue__value').at(0).text()).toEqual(
            '#00000'
        );
        expect(onGenerateMock).toHaveBeenCalledWith({
            '--border-radius': '3px',
            '--color-background': '#00000',
            '--color-foreground': '#1d1d1b',
            '--link-decoration-normal': 'none',
        });
    });

    it('should pass correct arguments to render props component', () => {
        const wrapper = mount(
            <Themeroller themeConfig={themeConfig} onGenerate={onGenerateMock}>
                {onRenderPropsMock}
            </Themeroller>
        );
        wrapper
            .find('ul li input')
            .at(2)
            .simulate('change', {
                target: {
                    value: '18',
                },
            });
        expect(wrapper.find('ul li').at(2).find('.UnitValue__value').at(0).text()).toEqual('18px');
        expect(onRenderPropsMock).toHaveBeenCalledWith({
            cssVars: {
                '--border-radius': '18px',
                '--color-background': '#ffffff',
                '--color-foreground': '#1d1d1b',
                '--link-decoration-normal': 'none',
            },
            reset: expect.any(Function),
        });
    });

    it('should reset config to initial state after fire reset function', () => {
        const wrapper = mount(
            <Themeroller themeConfig={themeConfig} onGenerate={onGenerateMock}>
                {({ reset }) => (
                    <button id="reset" onClick={reset}>
                        Reset
                    </button>
                )}
            </Themeroller>
        );
        wrapper
            .find('ul li input')
            .at(0)
            .simulate('change', {
                target: {
                    value: '#00000',
                },
            });
        wrapper
            .find('ul li input')
            .at(2)
            .simulate('change', {
                target: {
                    value: '18',
                },
            });
        expect(wrapper.find('ul li').at(0).find('.ColorValue__value').at(0).text()).toEqual(
            '#00000'
        );
        expect(wrapper.find('ul li').at(2).find('.UnitValue__value').at(0).text()).toEqual('18px');

        wrapper.find('#reset').simulate('click');

        expect(wrapper.find('ul li').at(0).find('.ColorValue__value').at(0).text()).toEqual(
            '#ffffff'
        );
        expect(wrapper.find('ul li').at(2).find('.UnitValue__value').at(0).text()).toEqual('3px');
    });
});
