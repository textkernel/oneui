import React from 'react';
import toJson from 'enzyme-to-json';
import { WeightedResultBarLoader } from '../WeightedResultBarLoader';

describe('WeightedResultBarLoader', () => {
    it('should render correctly in loading state', () => {
        const wrapper = mount(
            <div>
                <WeightedResultBarLoader />
                <WeightedResultBarLoader />
            </div>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
