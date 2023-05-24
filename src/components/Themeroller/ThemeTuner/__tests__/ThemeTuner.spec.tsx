// import React from 'react';
// import toJson from 'enzyme-to-json';
// import { ThemeTuner } from '../ThemeTuner';
// import { ThemerollerConfig } from '../../themes/themerollerConfig';
//
// export const ThemerollerConfig = [
//     {
//         fieldsetName: 'Colors',
//         items: [
//             {
//                 label: 'Background color',
//                 type: 'color',
//                 var: '--color-background',
//                 value: '#ffffff',
//             },
//             {
//                 label: 'Foreground color',
//                 type: 'color',
//                 var: '--color-neutral',
//                 value: '#1d1d1b',
//             },
//             {
//                 label: 'Border radius',
//                 type: 'unit',
//                 var: '--border-radius',
//                 value: '3',
//                 unit: 'px',
//             },
//             {
//                 label: 'Link decoration',
//                 type: 'string',
//                 var: '--link-decoration-normal',
//                 value: 'none',
//             },
//         ],
//     },
//     {
//         fieldsetName: 'Sizing',
//         items: [],
//     },
// ] as ThemerollerConfig;
//
// describe('ThemeTuner component', () => {
//     const onChangeMock = jest.fn();
//
//     afterEach(() => {
//         jest.resetAllMocks();
//     });
//
//     it('should render component correctly', () => {
//         const wrapper = mount(
//             <ThemeTuner
//                 config={ThemerollerConfig}
//                 cssVars={{
//                     '--color-neutral': '#000000',
//                 }}
//                 onChange={onChangeMock}
//             />
//         );
//         expect(wrapper.find('.TabItem').at(0).text()).toEqual('Colors');
//         expect(wrapper.find('.TabItem').at(1).text()).toEqual('Sizing');
//
//         expect(wrapper.find('ul li p').at(0).text()).toEqual('Background color');
//         expect(wrapper.find('ul li').at(0).find('input').prop('value')).toEqual('#ffffff');
//         expect(wrapper.find('ul li').at(0).find('.ColorValue__value').at(0).text()).toEqual(
//             '#ffffff'
//         );
//
//         expect(wrapper.find('ul li p').at(1).text()).toEqual('Foreground color');
//         expect(wrapper.find('ul li').at(1).find('input').prop('value')).toEqual('#000000');
//         expect(wrapper.find('ul li').at(1).find('.ColorValue__value').at(0).text()).toEqual(
//             '#000000'
//         );
//
//         expect(wrapper.find('ul li p').at(2).text()).toEqual('Border radius');
//         expect(wrapper.find('ul li').at(2).find('input').prop('value')).toEqual('3');
//         expect(wrapper.find('ul li').at(2).find('.UnitValue__value').at(0).text()).toEqual('3px');
//
//         expect(wrapper.find('ul li p').at(3).text()).toEqual('Link decoration');
//         expect(wrapper.find('ul li').at(3).find('input').prop('value')).toEqual('none');
//         expect(toJson(wrapper)).toMatchSnapshot();
//     });
//
//     it('should invoke onChange callback when first input was changed', () => {
//         const wrapper = mount(
//             <ThemeTuner config={ThemerollerConfig} cssVars={{}} onChange={onChangeMock} />
//         );
//         wrapper
//             .find('ul li input')
//             .at(0)
//             .simulate('change', {
//                 target: {
//                     value: '#00000',
//                 },
//             });
//         expect(onChangeMock).toHaveBeenCalledWith({
//             '--color-background': '#00000',
//         });
//     });
// });
