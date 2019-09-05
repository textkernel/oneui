import React from 'react';
import toJson from 'enzyme-to-json';
import Popup from '../Popup';

describe('<Popup> that renders a button', () => {
    it('should render default button correctly', () => {
        const wrapper = mount(<Popup>Yo! Pop me up!</Popup>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
