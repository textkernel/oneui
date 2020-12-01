import React from 'react';
import toJson from 'enzyme-to-json';
import { WeightedResultBar } from '../WeightedResultBar';

describe('WeightedResultBar', () => {
    it('should render correctly', () => {
        const wrapper = mount(
            <WeightedResultBar percentage={67} count={123}>
                Result
            </WeightedResultBar>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
