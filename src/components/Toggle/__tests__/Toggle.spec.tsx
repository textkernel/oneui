import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Toggle } from '../Toggle';

describe('<Toggle> that renders a toggle', () => {
    let view: RenderResult;

    it('should render Toggle correctly with label', () => {
        view = render(<Toggle id="1">Title is here</Toggle>);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('checkbox', { name: 'Title is here' })).toBeInTheDocument();
    });

    it('should render Toggle correctly without label', () => {
        view = render(<Toggle id="1-2" />);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('checkbox', { name: '' })).toBeInTheDocument();
    });

    it('should rendered disabled toggle correctly', () => {
        view = render(
            <Toggle id="4" disabled>
                Cannot do anything =(
            </Toggle>
        );

        const checkbox = screen.getByRole('checkbox', { name: 'Cannot do anything =(' });

        expect(view.container).toMatchSnapshot();
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toHaveAttribute('disabled');
    });
});
