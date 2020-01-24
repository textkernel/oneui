import React from 'react';
import toJson from 'enzyme-to-json';
import { LoadingSpinner } from '../LoadingSpinner';

describe('<LoadingSpinner> that renders a circular loading spinner', () => {
    it('should render a default spinner correctly', () => {
        const wrapper = shallow(<LoadingSpinner />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render a spinner with label', () => {
        const wrapper = shallow(<LoadingSpinner>Loading...</LoadingSpinner>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should add classes when props are changed', () => {
        const wrapper = shallow(
            <LoadingSpinner centerIn="viewport" context="primary" size={12} hidden />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
