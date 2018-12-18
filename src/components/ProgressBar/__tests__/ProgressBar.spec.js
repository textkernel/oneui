import React from 'react';
import toJson from 'enzyme-to-json';
import ProgressBar from '../ProgressBar';

describe('<ProgressBar> that renders a horizontal progress bar', () => {
    it('should render a default progress bar correctly', () => {
        const wrapper = shallow(<ProgressBar percentage={25} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render a progress bar with label', () => {
        const wrapper = shallow(<ProgressBar percentage={25} label="Loading..." />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should add classes when props are changed', () => {
        const wrapper = shallow(
            <ProgressBar percentage={25} context="primary" animated hidden small />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
