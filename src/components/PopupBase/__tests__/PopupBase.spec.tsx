/* eslint-disable react/display-name, react/prop-types */
import React from 'react';
import toJson from 'enzyme-to-json';
import { Button } from '../../..';
import { ESCAPE_KEY } from '../../../constants';
import { PopupBase } from '../PopupBase';
import { useDocumentEvent } from '../../../utils/testUtils';
import { PopoverDummy } from '../__mocks__/PopoverDummy';

describe('<PopupBase> that adds basic anchor/popup functionality to rendered components', () => {
    const anchorRendererMock = ({ setPopupVisibility, isOpen }) => (
        <Button onClick={() => setPopupVisibility(!isOpen)}>Toggle popup</Button>
    );
    const popupRendererMock = ({ setPopupVisibility }) => (
        <PopoverDummy setPopupVisibility={setPopupVisibility} />
    );
    let wrapper;

    describe('rendering', () => {
        beforeEach(() => {
            wrapper = mount(
                <PopupBase anchorRenderer={anchorRendererMock} popupRenderer={popupRendererMock} />
            );
        });

        it('should render with minimal props correctly', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('Popover')).toHaveLength(0);
        });
        it('should render popup when requested', () => {
            // trigger setPopupVisibility(true) through our dummy component
            wrapper.find('button').simulate('click');

            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('Popover')).toHaveLength(1);
        });
        it('should render popup in portal when requested', () => {
            wrapper = mount(
                <PopupBase
                    anchorRenderer={anchorRendererMock}
                    popupRenderer={popupRendererMock}
                    renderInPortal
                />
            );

            // trigger setPopupVisibility(true) through our dummy component
            wrapper.find('button').simulate('click');

            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('Popover')).toHaveLength(1);
            expect(wrapper.find('Portal')).toHaveLength(1);
        });
        it('should support no popup content from renderer', () => {
            wrapper = mount(
                <PopupBase anchorRenderer={anchorRendererMock} popupRenderer={() => null} />
            );

            // trigger setPopupVisibility(true) through our dummy component
            wrapper.find('button').simulate('click');

            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('Popover')).toHaveLength(0);
        });
        it('should close popup when requested', () => {
            // trigger setPopupVisibility(true) through our dummy component
            const triggerButton = wrapper.find('button');
            triggerButton.simulate('click');
            expect(wrapper.find('Popover')).toHaveLength(1);

            triggerButton.simulate('click');
            expect(wrapper.find('Popover')).toHaveLength(0);
        });
    });

    describe('click and keydown event handling', () => {
        let togglePopup;
        const onCloseMock = jest.fn();

        const clickDocument = useDocumentEvent('click');
        const keydownDocument = useDocumentEvent('keydown');

        beforeEach(() => {
            wrapper = mount(
                <PopupBase
                    anchorRenderer={anchorRendererMock}
                    popupRenderer={popupRendererMock}
                    onClose={onCloseMock}
                />
            );

            togglePopup = () => {
                wrapper.find('button').at(0).simulate('click');
            };
        });

        afterEach(() => {
            onCloseMock.mockReset();
        });

        it('should close open popup if outside is clicked', () => {
            togglePopup();
            expect(wrapper.find('Popover')).toHaveLength(1);

            // @ts-ignore
            clickDocument();
            wrapper.update();

            expect(wrapper.find('Popover')).toHaveLength(0);
        });
        it('should call onClose if outside is clicked', () => {
            togglePopup();

            // @ts-ignore
            clickDocument();
            wrapper.update();

            expect(onCloseMock).toHaveBeenCalled();
        });
        it('should not close open popup if popup is clicked', () => {
            togglePopup();
            expect(wrapper.find('Popover')).toHaveLength(1);

            // clicking directly in the element won't trigger global listener, hence we use our magic mock
            clickDocument({
                composedPath: () => [wrapper.find('Popover').find('p').at(0).getDOMNode()],
            });
            wrapper.update();

            expect(wrapper.find('Popover')).toHaveLength(1);
        });
        it('should not close open popup if button is clicked (ignoring functionality added by the renderer)', () => {
            togglePopup();
            expect(wrapper.find('Popover')).toHaveLength(1);

            // clicking directly in the element won't trigger global listener, hence we use our magic mock
            // this also ensures that event handlers defined by the renderer prop are not triggered.
            clickDocument({
                target: wrapper.find('button').at(0).getDOMNode(),
            });
            wrapper.update();

            expect(wrapper.find('Popover')).toHaveLength(1);
        });
        it('should close open popup on Escape press', () => {
            togglePopup();
            expect(wrapper.find('Popover')).toHaveLength(1);

            keydownDocument({ key: ESCAPE_KEY });
            wrapper.update();

            expect(wrapper.find('Popover')).toHaveLength(0);
        });
        it('should call onClose on Escape press', () => {
            togglePopup();

            keydownDocument({ key: ESCAPE_KEY });
            wrapper.update();

            expect(onCloseMock).toHaveBeenCalled();
        });
    });
});
