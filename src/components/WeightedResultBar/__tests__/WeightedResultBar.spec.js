import React from 'react';
import toJson from 'enzyme-to-json';
import { WeightedResultBar } from '../WeightedResultBar';

describe('WeightedResultBar', () => {
    it('should render correctly in loading state', () => {
        const wrapper = mount(<WeightedResultBar>Result</WeightedResultBar>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
