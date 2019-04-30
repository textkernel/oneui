import React from 'react';
import toJson from 'enzyme-to-json';
import IconSearch from '../IconSearch';

describe('<IconSearch>', () => {
    it('should render a Search! icon', () => {
        const wrapper = shallow(<IconSearch />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
