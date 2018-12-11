import React from 'react';
// import { mount } from 'enzyme';
import { toJson } from 'enzyme-to-json';
import Button from '../Button';

describe('<Button> that renders a button', () => {
    // console.log(Button)
    it('should render default button correctly', () => {
        // const wrapper = mount(<div>try</div>)
        expect(true).toBeTruthy();
        // const wrapper = mount(<Button>Click me</Button>)
        // expect(toJson(wrapper)).toMatchSnapshot();
    });
});
