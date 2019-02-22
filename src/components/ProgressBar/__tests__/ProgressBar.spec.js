import React from 'react';
import toJson from 'enzyme-to-json';
import ProgressBar from '../ProgressBar';

describe('<ProgressBar> that renders a horizontal progress bar', () => {
    it('should render a default progress bar correctly', () => {
        const wrapper = shallow(<ProgressBar percentage={25} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render a progress bar with label', () => {
        const wrapper = shallow(<ProgressBar percentage={25}>Loading...</ProgressBar>);

        // Check that label is shown
        expect(wrapper.childAt(0).text()).toBe('Loading...');
    });

    it('should add classes when props are changed', () => {
        const wrapper = shallow(
            <ProgressBar percentage={25} context="primary" animated hidden small />
        );

        // Check that bar is animated
        expect(wrapper.hasClass('ProgressBar--animated')).toBe(true);
        expect(wrapper.childAt(0).hasClass('ProgressBar__fill--animated')).toBe(true);

        // Check that bar is hidden
        expect(wrapper.hasClass('ProgressBar--hidden')).toBe(true);
        expect(wrapper.childAt(0).hasClass('ProgressBar__fill--hidden')).toBe(true);

        // Check that bar is small
        expect(wrapper.hasClass('ProgressBar--small')).toBe(true);
        expect(wrapper.childAt(0).hasClass('ProgressBar__fill--small')).toBe(true);

        // Check that context is primary
        expect(wrapper.hasClass('ProgressBar--context_primary')).toBe(true);
        expect(wrapper.childAt(0).hasClass('ProgressBar__fill--context_primary')).toBe(true);
    });
});
