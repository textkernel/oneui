/* eslint-disable react/display-name, react/prop-types */
import React from 'react';
import { render, RenderResult, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useDocumentEvent } from '../../../utils/testUtils';
import { Button } from '../../..';
import { PopupBase } from '../PopupBase';
import { PopoverDummy } from '../__mocks__/PopoverDummy';
import { ESCAPE_KEY } from '../../../constants';

describe('<PopupBase> that adds basic anchor/popup functionality to rendered components', () => {
    const anchorRendererMock = ({ setPopupVisibility, isOpen }) => (
        <Button onClick={() => setPopupVisibility(!isOpen)}>Toggle popup</Button>
    );
    const popupRendererMock = ({ setPopupVisibility }) => (
        <PopoverDummy setPopupVisibility={setPopupVisibility} />
    );
    let view: RenderResult;

    describe('rendering', () => {
        beforeEach(() => {
            view = render(
                <PopupBase anchorRenderer={anchorRendererMock} popupRenderer={popupRendererMock} />
            );
        });

        it('should render with minimal props correctly', () => {
            expect(view.container).toMatchSnapshot();
            expect(screen.queryByRole('group')).not.toBeInTheDocument();
        });

        it('should render popup when requested', async () => {
            const user = userEvent.setup();
            // trigger setPopupVisibility(true) through our dummy component
            await user.click(screen.getByRole('button'));

            expect(screen.getByRole('group')).toBeInTheDocument();
        });

        it('should render popup in portal when requested', async () => {
            const user = userEvent.setup();
            view.rerender(
                <PopupBase
                    anchorRenderer={anchorRendererMock}
                    popupRenderer={popupRendererMock}
                    renderInPortal
                />
            );

            // trigger setPopupVisibility(true) through our dummy component
            await user.click(screen.getAllByRole('button', { name: 'Toggle popup' })[0]);

            expect(view.container).toMatchSnapshot();
            expect(screen.getByRole('group')).toBeInTheDocument();
        });

        it('should support no popup content from renderer', async () => {
            const user = userEvent.setup();
            view.rerender(
                <PopupBase anchorRenderer={anchorRendererMock} popupRenderer={() => null} />
            );

            // trigger setPopupVisibility(true) through our dummy component
            await user.click(screen.getAllByRole('button')[1]);

            expect(view.container).toMatchSnapshot();
            expect(screen.queryByRole('group')).not.toBeInTheDocument();
        });

        it('should close popup when requested', async () => {
            const user = userEvent.setup();
            // trigger setPopupVisibility(true) through our dummy component
            const triggerButton = screen.getByRole('button');
            await user.click(triggerButton);

            expect(screen.queryByRole('group')).toBeInTheDocument();

            await user.click(triggerButton);

            expect(screen.queryByRole('group')).not.toBeInTheDocument();
        });
    });

    describe('click and keydown event handling', () => {
        const onCloseMock = jest.fn();
        const togglePopup = async (user) => {
            await user.click(screen.getAllByRole('button')[0]);
        };

        beforeEach(() => {
            view = render(
                <PopupBase
                    anchorRenderer={anchorRendererMock}
                    popupRenderer={popupRendererMock}
                    onClose={onCloseMock}
                />
            );
        });

        it('should close open popup if outside is clicked', async () => {
            const user = userEvent.setup();
            await togglePopup(user);

            expect(screen.queryByRole('group')).toBeInTheDocument();

            await togglePopup(user);

            expect(screen.queryByRole('group')).not.toBeInTheDocument();
        });

        it('should call onClose if outside is clicked', async () => {
            const user = userEvent.setup();
            await togglePopup(user);
            await user.click(document.body);

            expect(onCloseMock).toHaveBeenCalled();
        });

        it('should close open popup on Escape press', async () => {
            const user = userEvent.setup();
            await togglePopup(user);

            expect(screen.getByRole('group')).toBeInTheDocument();

            await user.keyboard(`[${ESCAPE_KEY}]`);

            expect(screen.queryByRole('group')).not.toBeInTheDocument();
        });

        it('should call onClose on Escape press', async () => {
            const user = userEvent.setup();
            await togglePopup(user);

            await user.keyboard(`[${ESCAPE_KEY}]`);

            expect(onCloseMock).toHaveBeenCalled();
        });

        it('should not close open popup if popup is clicked', async () => {
            const user = userEvent.setup();
            const clickDocument = useDocumentEvent('click');

            await togglePopup(user);

            expect(screen.getByRole('group')).toBeInTheDocument();

            await waitFor(() => {
                clickDocument({
                    composedPath: () => [screen.queryByRole('group')],
                });
            });

            expect(screen.queryByRole('group')).toBeInTheDocument();
        });

        it('should not close open popup if button is clicked (ignoring functionality added by the renderer)', async () => {
            const clickDocument = useDocumentEvent('click');
            const user = userEvent.setup();
            await togglePopup(user);

            expect(screen.getByRole('group')).toBeInTheDocument();

            // clicking directly in the element won't trigger global listener, hence we use our magic mock
            // this also ensures that event handlers defined by the renderer prop are not triggered.
            await waitFor(() => {
                clickDocument({
                    composedPath: () => [screen.queryByRole('group')],
                });
            });

            expect(screen.queryByRole('group')).toBeInTheDocument();
        });
    });
});
