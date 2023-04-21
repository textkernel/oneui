import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchButton } from '../SearchButton';

describe('<SearchButton> that renders a search button', () => {
    it('should render default button correctly', () => {
        const view = render(<SearchButton />);

        expect(view.asFragment()).toMatchSnapshot();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
    it('should call click callback correctly', async () => {
        const onClickMock = jest.fn();
        const user = userEvent.setup();
        render(<SearchButton onClick={onClickMock} />);

        await user.click(screen.getByRole('button'));

        expect(onClickMock).toHaveBeenCalled();
    });
    it('should render a button with a label correctly', () => {
        const label = 'Search';
        const view = render(<SearchButton>{label}</SearchButton>);

        expect(view.asFragment()).toMatchSnapshot();
        expect(screen.getByText(label)).toBeInTheDocument();
    });
});
