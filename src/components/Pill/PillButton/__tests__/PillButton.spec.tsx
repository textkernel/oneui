import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { PillButton } from '../PillButton';
import { ENTER_KEY } from '../../../../constants';

describe('<PillButton> component', () => {
    const toggleDropdownMock = jest.fn();
    const onClearMock = jest.fn();
    const name = 'Pill name';
    const content = 'This pill is in use';

    let view: RenderResult;

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('in inactive, collapsed state (with minimal props)', () => {
        beforeEach(() => {
            view = render(
                <PillButton toggleDropdown={toggleDropdownMock} onClear={onClearMock} name={name} />
            );
        });

        it('should render correctly', () => {
            expect(view.container).toMatchSnapshot();
            expect(screen.getByRole('button', { name: '' })).not.toHaveClass(
                'PillButton__button PillButton__button--isOpen'
            );
            expect(screen.getByRole('button', { name: `${name}` })).not.toHaveClass(
                'PillButton__pill PillButton__pill--isOpen PillButton__pill--isActive'
            );
        });

        it('should trigger toggle state once when clicked', async () => {
            const user = userEvent.setup();
            await user.click(screen.getByRole('button', { name: `${name}` }));

            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });

        it('should trigger toggle state once on keyboard interaction', async () => {
            const user = userEvent.setup();
            const button = screen.getByRole('button', { name: `${name}` });
            button.focus();
            await user.keyboard(`[${ENTER_KEY}]`);

            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });

        it('should have arrow down label', () => {
            expect(screen.getByRole('img')).toBeInTheDocument();
            expect(screen.getByRole('img')).toHaveClass('PillButton__arrowIcon');
        });

        it('should trigger toggle state once when button is clicked', async () => {
            const user = userEvent.setup();
            const button = screen.getByRole('button', { name: `${name}` });
            await user.click(button);

            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });

        it('should trigger toggle state once on keyboard interaction with button', async () => {
            const user = userEvent.setup();
            const button = screen.getByRole('button', { name: `${name}` });
            button.focus();
            await user.keyboard(`[${ENTER_KEY}]`);

            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });
    });

    describe('in inactive, open state (isOpen prop)', () => {
        beforeEach(() => {
            view = render(
                <PillButton
                    toggleDropdown={toggleDropdownMock}
                    onClear={onClearMock}
                    name={name}
                    isOpen
                />
            );
        });

        it('should render correctly', () => {
            expect(view.container).toMatchSnapshot();
            expect(screen.getByRole('button', { name: '' })).toHaveClass(
                'PillButton__button PillButton__button--isOpen'
            );
            expect(screen.getByRole('button', { name: `${name}` })).not.toHaveClass(
                'PillButton__pill PillButton__pill--isOpen PillButton__pill--isActive'
            );
        });

        it('should have arrow up label', () => {
            expect(screen.getByRole('img')).toHaveClass('PillButton__arrowIcon--isOpen');
        });

        it('should trigger toggle state once when button is clicked', async () => {
            const user = userEvent.setup();
            const button = screen.getByRole('button', { name: `${name}` });
            await user.click(button);

            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });

        it('should trigger toggle state once on keyboard interaction with button', async () => {
            const user = userEvent.setup();
            const button = screen.getByRole('button', { name: `${name}` });
            button.focus();
            await user.keyboard(`[${ENTER_KEY}]`);

            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });
    });

    describe('in active, collapsed state (with content prop)', () => {
        beforeEach(() => {
            view = render(
                <PillButton
                    toggleDropdown={toggleDropdownMock}
                    onClear={onClearMock}
                    name={name}
                    content={content}
                />
            );
        });

        it('should render correctly', () => {
            expect(view.container).toMatchSnapshot();
            expect(screen.getByRole('button', { name: '' })).not.toHaveClass(
                'PillButton__button PillButton__button--isOpen'
            );
            expect(screen.getByRole('button', { name: 'This pill is in use' })).toHaveClass(
                'PillButton__pill PillButton__pill--isActive'
            );
        });

        it('should not trigger toggle state but onClear only when button is clicked', async () => {
            const user = userEvent.setup();
            const button = screen.getByRole('button', { name: '' });
            await user.click(button);

            expect(onClearMock).toHaveBeenCalledTimes(1);
            expect(toggleDropdownMock).toHaveBeenCalledTimes(0);
        });

        it('should not trigger toggle state but onClear only on keyboard interaction with button', async () => {
            const user = userEvent.setup();
            const button = screen.getByRole('button', { name: '' });
            button.focus();
            await user.keyboard(`[${ENTER_KEY}]`);

            expect(onClearMock).toHaveBeenCalledTimes(1);
            expect(toggleDropdownMock).toHaveBeenCalledTimes(0);
        });
    });

    describe('in active, open state (content and isOpen prop)', () => {
        beforeEach(() => {
            view = render(
                <PillButton
                    toggleDropdown={toggleDropdownMock}
                    onClear={onClearMock}
                    name={name}
                    content={content}
                    isOpen
                />
            );
        });

        it('should render correctly', () => {
            expect(view.container).toMatchSnapshot();
            expect(screen.getByRole('button', { name: '' })).toHaveClass(
                'PillButton__button PillButton__button--isOpen'
            );
            expect(screen.getByRole('button', { name: 'This pill is in use' })).toHaveClass(
                'PillButton__pill PillButton__pill--isOpen PillButton__pill--isActive'
            );
        });

        it('should have arrow up label', () => {
            expect(screen.getByRole('img')).toHaveClass('PillButton__arrowIcon--isOpen');
        });

        it('should trigger toggle state once when button is clicked', async () => {
            const user = userEvent.setup();
            const button = screen.getByRole('button', { name: '' });
            await user.click(button);

            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });

        it('should trigger toggle state once on keyboard interaction with button', async () => {
            const user = userEvent.setup();
            const button = screen.getByRole('button', { name: '' });
            button.focus();
            await user.keyboard(`[${ENTER_KEY}]`);

            expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
        });
    });
});
