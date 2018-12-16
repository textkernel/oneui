import React from 'react';
import toJson from 'enzyme-to-json';
import DropdownCaret from '../DropdownCaret';

describe('<DropdownCaret> that renders an SVG icon', () => {
    it('should render default icon', () => {
        const wrapper = shallow(<DropdownCaret />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should append classes to top level element', () => {
        const wrapper = shallow(<DropdownCaret className="some__class" />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
