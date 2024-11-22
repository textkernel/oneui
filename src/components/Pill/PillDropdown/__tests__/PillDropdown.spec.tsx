import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { PillDropdown } from '../PillDropdown';

describe('<PillDropdown> component', () => {
    let view: RenderResult;

    beforeEach(() => {
        view = render(
            <DropdownMenu open>
                <PillDropdown>Pill dropdown content</PillDropdown>
            </DropdownMenu>
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render correctly', () => {
        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('should render correctly without padding', () => {
        view.rerender(
            <DropdownMenu open>
                <PillDropdown noPadding>Pill dropdown content</PillDropdown>
            </DropdownMenu>
        );

        const content = screen.getByRole('menu');

        expect(content).toBeInTheDocument();
        expect(content).toHaveClass('PillDropdown--noPadding');
    });
});
