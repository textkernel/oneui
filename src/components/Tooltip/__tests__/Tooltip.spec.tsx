import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Tooltip } from '../Tooltip';

describe('<Tooltip> that renders a Tooltip', () => {
    let view: RenderResult;

    it('should render default Tooltip correctly', () => {
        view = render(
            <Tooltip placement="bottom" content="content">
                <>Hover me</>
            </Tooltip>
        );

        expect(view.container).toMatchSnapshot();
        expect(view.container).toBeInTheDocument();
    });

    it('should render Tooltip in disabled mode if content is empty', () => {
        view = render(
            <Tooltip content="foo">
                <>Hover me</>
            </Tooltip>
        );

        expect(view.container).toBeInTheDocument();
        expect(view.container).toHaveTextContent('Hover me');
    });
});
