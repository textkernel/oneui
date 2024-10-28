import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PillDropdown } from '../PillDropdown';

describe('<PillDropdown> component', () => {
    const childrenMock = jest.fn();
    const closeMock = jest.fn();

    let view: RenderResult;

    beforeEach(() => {
        view = render(<PillDropdown close={closeMock}>{childrenMock}</PillDropdown>);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render correctly', () => {
        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should render correctly without padding', () => {
        view.rerender(
            <PillDropdown close={closeMock} noPadding>
                {childrenMock}
            </PillDropdown>
        );

        const contentInfo = screen.getByRole('group');

        expect(contentInfo).toBeInTheDocument();
        expect(contentInfo).toHaveClass('PillDropdown__content');
    });

    it('should call children function with close as arguments', () => {
        expect(childrenMock).toHaveBeenCalledWith({
            close: closeMock,
        });
    });
});
