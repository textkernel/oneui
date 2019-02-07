import React from 'react';
import toJson from 'enzyme-to-json';
import IconHarvester from '../IconHarvester';

describe('<IconHarvester>', () => {
    it('should render an Harvester icon', () => {
        const wrapper = shallow(<IconHarvester />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
