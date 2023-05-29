/* eslint-disable react/display-name, react/prop-types */
import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Button } from '../../..';
import { PopupBase } from '../PopupBase';
import { PopoverDummy } from '../__mocks__/PopoverDummy';

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

            expect(view.container).toMatchSnapshot();
            expect(screen.getByRole('group')).toBeInTheDocument();
        });

        it('should render popup in portal when requested', async () => {
            const user = userEvent.setup();
            view = render(
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
            // expect(wrapper.find('Popover')).toHaveLength(1);
        });

        it('should support no popup content from renderer', async () => {
            const user = userEvent.setup();
            view = render(
                <PopupBase anchorRenderer={anchorRendererMock} popupRenderer={() => null} />
            );

            // trigger setPopupVisibility(true) through our dummy component
            await user.click(screen.getAllByRole('button')[0]);

            expect(view.container).toMatchSnapshot();
            // expect(screen.queryByRole('group')).not.toBeInTheDocument();
            // expect(wrapper.find('Popover')).toHaveLength(0);
        });

        it('should close popup when requested', async () => {
            const user = userEvent.setup();
            // trigger setPopupVisibility(true) through our dummy component
            const triggerButton = screen.getByRole('button');
            await user.click(triggerButton);
            // expect(wrapper.find('Popover')).toHaveLength(1);

            await user.click(triggerButton);
            // expect(wrapper.find('Popover')).toHaveLength(0);
        });
    });
    //
    // describe('click and keydown event handling', () => {
    //     let togglePopup;
    //     const onCloseMock = jest.fn();
    //
    //     const clickDocument = useDocumentEvent('click');
    //     const keydownDocument = useDocumentEvent('keydown');
    //
    //     beforeEach(() => {
    //         view = render(
    //             <PopupBase
    //                 anchorRenderer={anchorRendererMock}
    //                 popupRenderer={popupRendererMock}
    //                 onClose={onCloseMock}
    //             />
    //         );
    //
    //         // togglePopup = () => {
    //         //     wrapper.find('button').at(0).simulate('click');
    //         // };
    //     });

    // afterEach(() => {
    //     onCloseMock.mockReset();
    // });

    // it('should close open popup if outside is clicked', () => {
    //     // togglePopup();
    //     // expect(wrapper.find('Popover')).toHaveLength(1);
    //
    //     // @ts-ignore
    //     clickDocument();
    //
    //     // expect(wrapper.find('Popover')).toHaveLength(0);
    // });

    //     it('should call onClose if outside is clicked', () => {
    //         togglePopup();
    //
    //         // @ts-ignore
    //         clickDocument();
    //         wrapper.update();
    //
    //         expect(onCloseMock).toHaveBeenCalled();
    //     });
    //     it('should not close open popup if popup is clicked', () => {
    //         togglePopup();
    //         expect(wrapper.find('Popover')).toHaveLength(1);
    //
    //         // clicking directly in the element won't trigger global listener, hence we use our magic mock
    //         clickDocument({
    //             composedPath: () => [wrapper.find('Popover').find('p').at(0).getDOMNode()],
    //         });
    //         wrapper.update();
    //
    //         expect(wrapper.find('Popover')).toHaveLength(1);
    //     });
    //     it('should not close open popup if button is clicked (ignoring functionality added by the renderer)', () => {
    //         togglePopup();
    //         expect(wrapper.find('Popover')).toHaveLength(1);
    //
    //         // clicking directly in the element won't trigger global listener, hence we use our magic mock
    //         // this also ensures that event handlers defined by the renderer prop are not triggered.
    //         clickDocument({
    //             target: wrapper.find('button').at(0).getDOMNode(),
    //         });
    //         wrapper.update();
    //
    //         expect(wrapper.find('Popover')).toHaveLength(1);
    //     });
    //     it('should close open popup on Escape press', () => {
    //         togglePopup();
    //         expect(wrapper.find('Popover')).toHaveLength(1);
    //
    //         keydownDocument({ key: ESCAPE_KEY });
    //         wrapper.update();
    //
    //         expect(wrapper.find('Popover')).toHaveLength(0);
    //     });
    //     it('should call onClose on Escape press', () => {
    //         togglePopup();
    //
    //         keydownDocument({ key: ESCAPE_KEY });
    //         wrapper.update();
    //
    //         expect(onCloseMock).toHaveBeenCalled();
    //     });
    // });
});
