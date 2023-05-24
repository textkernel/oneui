import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Tooltip } from '../Tooltip';

describe('<Tooltip> that renders a Tooltip', () => {
    it('should render default Tooltip correctly', () => {
        const view = render(<Tooltip placement="bottom" content="content" />);

        expect(view.container).toMatchSnapshot();
    });

    it.skip('should render Tooltip in disabled mode if content is empty', () => {
        const wrapper1 = shallow(<Tooltip content="foo" />);
        expect(wrapper1.prop('disabled')).toBeFalsy();
        const wrapper2 = shallow(<Tooltip content="" />);
        expect(wrapper2.prop('disabled')).toBe(true);
        const wrapper3 = shallow(<Tooltip content="" disabled={false} />);
        expect(wrapper3.prop('disabled')).toBe(false);
        const wrapper4 = shallow(<Tooltip content="" disabled />);
        expect(wrapper4.prop('disabled')).toBe(true);
    });
});
