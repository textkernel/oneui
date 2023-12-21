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
    let user;

    describe('rendering', () => {
        beforeEach(() => {
            view = render(
                <PopupBase anchorRenderer={anchorRendererMock} popupRenderer={popupRendererMock} />
            );
            user = userEvent.setup();
        });

        it('should render with minimal props correctly', () => {
            expect(view.container).toMatchSnapshot();
            expect(screen.queryByRole('group')).not.toBeInTheDocument();
        });

        it('should render popup when requested', async () => {
            // trigger setPopupVisibility(true) through our dummy component
            await user.click(screen.getByRole('button'));

            expect(view.baseElement).toMatchSnapshot();
            expect(screen.getByRole('group')).toBeInTheDocument();
        });

        it('should render popup in portal when requested', async () => {
            view.rerender(
                <PopupBase
                    anchorRenderer={anchorRendererMock}
                    popupRenderer={popupRendererMock}
                    renderInPortal
                />
            );

            // trigger setPopupVisibility(true) through our dummy component
            await user.click(screen.getAllByRole('button', { name: 'Toggle popup' })[0]);

            expect(view.baseElement).toMatchSnapshot();
            expect(screen.getByRole('group')).toBeInTheDocument();
        });

        it('should support no popup content from renderer', async () => {
            view.rerender(
                <PopupBase anchorRenderer={anchorRendererMock} popupRenderer={() => null} />
            );

            // trigger setPopupVisibility(true) through our dummy component
            await user.click(screen.getAllByRole('button')[1]);

            expect(view.container).toMatchSnapshot();
            expect(screen.queryByRole('group')).not.toBeInTheDocument();
        });

        it('should close popup when requested', async () => {
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
        const togglePopup = async () => {
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
            user = userEvent.setup();
        });

        it('should close open popup if outside is clicked', async () => {
            await togglePopup();

            expect(screen.queryByRole('group')).toBeInTheDocument();

            await togglePopup();

            expect(screen.queryByRole('group')).not.toBeInTheDocument();
        });

        it('should call onClose if outside is clicked', async () => {
            await togglePopup();
            await user.click(document.body);

            expect(onCloseMock).toHaveBeenCalled();
        });

        it('should close open popup on Escape press', async () => {
            await togglePopup();

            expect(screen.getByRole('group')).toBeInTheDocument();

            await user.keyboard(`[${ESCAPE_KEY}]`);

            expect(screen.queryByRole('group')).not.toBeInTheDocument();
        });

        it('should call onClose on Escape press', async () => {
            await togglePopup();

            await user.keyboard(`[${ESCAPE_KEY}]`);

            expect(onCloseMock).toHaveBeenCalled();
        });

        it('should not close open popup if popup is clicked', async () => {
            const clickDocument = useDocumentEvent('click');

            await togglePopup();

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
            await togglePopup();

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
