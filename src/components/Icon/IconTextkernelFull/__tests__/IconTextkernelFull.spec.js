import React from 'react';
import toJson from 'enzyme-to-json';
import IconTextkernelFull from '../IconTextkernelFull';

describe('<IconTextkernelFull>', () => {
    it('should render an Textkernel icon', () => {
        const wrapper = shallow(<IconTextkernelFull />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
