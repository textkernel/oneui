import React from 'react';
import toJson from 'enzyme-to-json';
import Button from '../Button';

describe('<Button> that renders a button', () => {
    it('should render default button correctly', () => {
        const wrapper = mount(<Button>Click me</Button>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

});
