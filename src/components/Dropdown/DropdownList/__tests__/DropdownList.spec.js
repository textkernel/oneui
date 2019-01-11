import React from 'react';
import toJson from 'enzyme-to-json';
import DropdownList from '../DropdownList';

describe('<DropdownList> that renders a dropdown list', () => {
    it('should render a default list correctly', () => {
        const wrapper = shallow(<DropdownList shown>Some content</DropdownList>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render props correctly', () => {
        const wrapper = shallow(
            <DropdownList animated fromRight shown>
                Some content
            </DropdownList>
        );
        expect(wrapper.hasClass('DropdownList--animated')).toBe(true);
        expect(wrapper.hasClass('DropdownList--fromRight')).toBe(true);
        expect(wrapper.hasClass('DropdownList--shown')).toBe(true);
    });

    it('should render nothing when hidden', () => {
        const wrapper = shallow(<DropdownList>Some content</DropdownList>);
        expect(wrapper.type()).toEqual(null);
    });
});
