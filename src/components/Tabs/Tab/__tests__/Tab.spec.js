import React from 'react';
import toJson from 'enzyme-to-json';
import Tab from '../Tab';

describe('<Tab> that renders tab content', () => {
    it('should render a tab', () => {
        const wrapper = mount(
            <Tab label="My tab" id="myTab">
                Some content
            </Tab>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
