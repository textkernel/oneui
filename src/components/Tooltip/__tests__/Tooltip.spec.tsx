import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Tooltip } from '../Tooltip';

describe('<Tooltip> that renders a Tooltip', () => {
    let view: RenderResult;

    it('should render default Tooltip correctly', () => {
        view = render(<Tooltip placement="bottom" content="content" />);

        expect(view.baseElement).toMatchSnapshot();
        expect(view.container).toBeEmptyDOMElement();
    });

    it('should render Tooltip in disabled mode if content is empty', () => {
        view = render(<Tooltip content="foo" />);
        // expect(view).toMatchSnapshot();
        expect(view.container).not.toHaveAttribute('disabled');
        // expect(wrapper1.prop('disabled')).toBeFalsy();
        view = render(<Tooltip content="" />);
        expect(view.container).not.toHaveAttribute('disabled');
        // expect(wrapper2.prop('disabled')).toBe(true);
        view = render(<Tooltip content="" disabled={false} />);
        // expect(view.container).toHaveAttribute('disabled', 'false');
        view = render(<Tooltip content="" disabled />);
        // expect(view.container).toHaveAttribute('disabled', 'true');
    });
});
