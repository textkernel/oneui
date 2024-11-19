import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PillDropdown } from '../PillDropdown';

describe('<PillDropdown> component', () => {
    let view: RenderResult;

    beforeEach(() => {
        view = render(<PillDropdown>Pill dropdown content</PillDropdown>);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render correctly', () => {
        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should render correctly without padding', () => {
        view.rerender(<PillDropdown noPadding>Pill dropdown content</PillDropdown>);

        const contentInfo = screen.getByRole('group');

        expect(contentInfo).toBeInTheDocument();
        expect(contentInfo).toHaveClass('PillDropdown__content');
    });
});
