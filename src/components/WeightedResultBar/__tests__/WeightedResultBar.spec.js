import React from 'react';
import toJson from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';
import { WeightedResultBar } from '../WeightedResultBar';

jest.useFakeTimers();

describe('WeightedResultBar', () => {
    it('should render correctly', () => {
        const wrapper = mount(
            <WeightedResultBar percentage={67} count={123}>
                Result
            </WeightedResultBar>
        );
        act(() => {
            jest.runAllTimers();
            wrapper.update();
        });

        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render correctly with a custom count', () => {
        const wrapper = mount(
            <WeightedResultBar percentage={67} count={<p>456</p>}>
                Result
            </WeightedResultBar>
        );
        act(() => {
            jest.runAllTimers();
            wrapper.update();
        });

        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render correctly in loading state', () => {
        const wrapper = shallow(<WeightedResultBar isLoading />);

        expect(wrapper.find('ContentPlaceholder').length).toBe(1);
        expect(wrapper.find('ProgressBar').prop('percentage')).toBe(100);
    });
    it('should have consistent width of ContentPlaceholder in loading state, even when the component re-renders', () => {
        const wrapper = mount(<WeightedResultBar isLoading />);
        const width = wrapper.find('ContentPlaceholder').prop('width');

        wrapper.setProps({ count: 45 });
        wrapper.update();

        expect(wrapper.find('ContentPlaceholder').prop('width')).toBe(width);
    });
});
