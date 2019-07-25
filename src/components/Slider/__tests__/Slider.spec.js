import React from 'react';
import toJson from 'enzyme-to-json';
import Slider from '../Slider';

describe('Slider component', () => {
    it('should render component correctly', () => {
        const wrapper = mount(<Slider />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render correctly with ref', () => {
        const ref = React.createRef();
        mount(<Slider ref={ref} />);

        expect(ref.current.props.Component.displayName).toEqual('Slider');
    });
});
