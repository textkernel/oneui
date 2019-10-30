import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import Slider from '../Slider';

describe('Slider component', () => {
    it('should render component correctly', () => {
        const { container } = render(<Slider />);
        expect(container).toMatchSnapshot();
    });
    it('should render correctly with ref', () => {
        const ref = React.createRef();
        render(<Slider ref={ref} />);

        expect(ref.current.props.Component.displayName).toEqual('Slider');
    });
});
