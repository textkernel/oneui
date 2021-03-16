import React from 'react';
import toJson from 'enzyme-to-json';
import { Gauge } from '../Gauge';

describe('Gauge', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <Gauge percentage={33} value="Value" metric="Metric">
                Some content
            </Gauge>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render with loading state correctly', () => {
        const wrapper = shallow(
            <Gauge percentage={33} value="Value" metric="Metric" isContentLoading isProgressLoading>
                Some content
            </Gauge>
        );
        expect(wrapper.find('ContentPlaceholder').exists()).toBeTruthy();
    });
});
