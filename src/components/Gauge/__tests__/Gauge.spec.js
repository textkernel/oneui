import React from 'react';
import toJson from 'enzyme-to-json';
import { Gauge } from '../Gauge';

describe('Gauge', () => {
    const mathRandomSpy = jest.spyOn(Math, 'random');
    mathRandomSpy.mockImplementation(() => 0.42);

    it('should render nothing if no children are provided', () => {
        const wrapper = shallow(<Gauge />);
        expect(wrapper.html()).toBeNull();
    });
    it('should render correctly', () => {
        const wrapper = shallow(
            <Gauge percentage={33} note="Value" metric="Metric">
                Some content
            </Gauge>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render with loading state correctly', () => {
        const wrapper = shallow(
            <Gauge metric="Metric" isContentLoading isProgressLoading>
                Some content
            </Gauge>
        );
        expect(wrapper.find('ContentPlaceholder').exists()).toBeTruthy();
    });
});
