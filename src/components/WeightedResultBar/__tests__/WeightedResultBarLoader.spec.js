import React from 'react';
import { WeightedResultBarLoader } from '../WeightedResultBarLoader';

describe('WeightedResultBarLoader', () => {
    it('should render correctly in loading state', () => {
        const wrapper = mount(
            <div>
                <WeightedResultBarLoader />
            </div>
        );
        // We cannot test for snapshot match because of the random length of the placeholder
        expect(wrapper.find('ContentPlaceholder')).toHaveLength(1);
        expect(wrapper.find('ProgressBar')).toHaveLength(1);
    });
});
