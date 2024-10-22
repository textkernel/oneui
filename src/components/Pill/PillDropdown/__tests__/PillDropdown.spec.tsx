import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PillDropdown } from '../PillDropdown';

describe('<PillDropdown> component', () => {
    const dropdownContent = <p>This is some content for the pill</p>;
    const closeMock = jest.fn();
    const doneLabel = 'Done';

    let view: RenderResult;

    beforeEach(() => {
        view = render(
            <PillDropdown close={closeMock} doneLabel={doneLabel}>
                {dropdownContent}
            </PillDropdown>
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render correctly', () => {
        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('button', { name: doneLabel }));
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should render correctly without padding', () => {
        view.rerender(
            <PillDropdown close={closeMock} doneLabel={doneLabel} noPadding>
                {dropdownContent}
            </PillDropdown>
        );

        const contentInfo = screen.getByRole('group');

        expect(contentInfo).toBeInTheDocument();
        expect(contentInfo).toHaveClass('PillDropdown__content');
    });
});
