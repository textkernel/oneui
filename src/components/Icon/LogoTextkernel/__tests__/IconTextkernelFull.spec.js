import React from 'react';
import toJson from 'enzyme-to-json';
import { LogoTextkernel } from '../LogoTextkernel';

describe('<LogoTextkernel>', () => {
    it('should render an Textkernel icon', () => {
        const wrapper = shallow(<LogoTextkernel />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
