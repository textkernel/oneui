import React from 'react';
import toJson from 'enzyme-to-json';
import IconTextkernel from '../IconTextkernel';

describe('<IconTextkernel>', () => {
    it('should render an Textkernel icon', () => {
        const wrapper = shallow(<IconTextkernel />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
