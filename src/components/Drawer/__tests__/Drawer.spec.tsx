import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Drawer } from '../Drawer';

jest.mock('react-transition-group', () => {
    const FakeTransition = jest.fn(({ children }) => children({ state: 'entered' }));
    return { Transition: FakeTransition };
});

describe('Drawer', () => {
    let view;

    it('should render correctly', () => {
        view = render(<Drawer title="some title">some text</Drawer>);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('heading', { name: 'some title' })).toBeInTheDocument();
    });

    it('should pass initial expand status', () => {
        const onClickMock = jest.fn();
        view = render(
            <Drawer onClick={onClickMock} initialIsExpanded title="some title">
                some text
            </Drawer>
        );
        const expandButton = screen.getByRole('button', { name: '' });

        expect(view.container).toMatchSnapshot();
        expect(expandButton).toBeInTheDocument();
        expect(onClickMock).not.toHaveBeenCalled();
    });

    it('should pass initial close status', () => {
        const onClickMock = jest.fn();
        render(
            <Drawer onClick={onClickMock} title="some title">
                some text
            </Drawer>
        );

        expect(onClickMock).not.toHaveBeenCalled();
    });

    it('should expand and close correctly', async () => {
        const onClickMock = jest.fn();
        const user = userEvent.setup();
        render(
            <Drawer onClick={onClickMock} title="some title">
                some text
            </Drawer>
        );
        const expandButton = screen.getByRole('button', { name: '' });
        // Expand Drawer
        await user.click(expandButton);

        // Close Drawer
        await user.click(expandButton);

        expect(onClickMock).toHaveBeenCalledTimes(2);
        expect(screen.getByRole('group')).toHaveAttribute('aria-hidden', 'false');
    });

    it('should be hidden when isShown is false', () => {
        render(
            <Drawer isShown={false} title="some title">
                some text
            </Drawer>
        );

        expect(screen.getByRole('group', { hidden: true })).toHaveAttribute('aria-hidden', 'true');
    });

    it('should be still hidden when drawer expanded and isShown is false', () => {
        render(
            <Drawer isShown={false} isExpanded title="some title">
                some text
            </Drawer>
        );

        expect(screen.getByRole('group', { hidden: true })).toHaveAttribute('aria-hidden', 'true');
    });

    it('should be expand then isExpanded is true', () => {
        render(
            <Drawer isExpanded title="some title">
                some text
            </Drawer>
        );

        expect(screen.getByRole('group')).toHaveAttribute('aria-hidden', 'false');
    });

    it('should fire callback function correctly on click expand/close button', async () => {
        const onClickMock = jest.fn();
        const user = userEvent.setup();
        render(
            <Drawer onClick={onClickMock} title="some title">
                some text
            </Drawer>
        );
        const expandButton = screen.getByRole('button', { name: '' });
        await user.click(expandButton);

        expect(onClickMock).toHaveBeenCalledTimes(1);
        expect(screen.getByRole('group')).toHaveAttribute('aria-hidden', 'false');
    });
});
