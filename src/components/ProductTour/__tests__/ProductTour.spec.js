import * as React from 'react';
import toJson from 'enzyme-to-json';
import { ProductTour } from '../ProductTour';
import { slides } from '../__mocks__/slides';
import { ENTER_KEY } from '../../../constants';

describe('ProductTour', () => {
    const checkboxLabel = 'Hide';
    const cancelLabel = 'Cancel';
    const continueLabel = 'Continue';
    const finishLabel = 'Finish';
    const onCancel = jest.fn();
    const onFinished = jest.fn();

    describe('general rendering of first slide', () => {
        it('should render correctly with 1 slide and minimal prop', () => {
            const wrapper = mount(
                <ProductTour
                    ariaHideApp={false} // suppress consol warnings from Modal
                    isOpen
                    finishLabel={finishLabel}
                    onFinished={onFinished}
                >
                    <div>My single slide</div>
                </ProductTour>
            );
            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('Checkbox')).toHaveLength(0);
            expect(wrapper.find('.ProductTour__dot')).toHaveLength(0);
            expect(wrapper.find('Button')).toHaveLength(1);
            expect(wrapper.find('Button').text()).toBe(finishLabel);
        });
        it('should render correctly with multiple slides all props', () => {
            const wrapper = mount(
                <ProductTour
                    ariaHideApp={false} // suppress consol warnings from Modal
                    isOpen
                    checkboxLabel={checkboxLabel}
                    cancelLabel={cancelLabel}
                    continueLabel={continueLabel}
                    finishLabel={finishLabel}
                    onCancel={onCancel}
                    onFinished={onFinished}
                >
                    {slides}
                </ProductTour>
            );
            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('Checkbox')).toHaveLength(1);
            expect(wrapper.find('.ProductTour__dot')).toHaveLength(slides.length);
            expect(wrapper.find('Button')).toHaveLength(2);
            expect(wrapper.find('Button').at(0).text()).toBe(cancelLabel);
            expect(wrapper.find('Button').at(1).text()).toBe(continueLabel);
        });
    });
    describe('navigation', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = mount(
                <ProductTour
                    ariaHideApp={false} // suppress consol warnings from Modal
                    isOpen
                    checkboxLabel={checkboxLabel}
                    cancelLabel={cancelLabel}
                    continueLabel={continueLabel}
                    finishLabel={finishLabel}
                    onCancel={onCancel}
                    onFinished={onFinished}
                >
                    {slides}
                </ProductTour>
            );
        });

        it('should be on the first slide when first rendered', () => {
            expect(wrapper.find('h1').text()).toMatch('Slide 1');
            expect(
                wrapper.find('.ProductTour__dot').at(0).hasClass('ProductTour__dot--isActive')
            ).toBeTruthy();
            expect(
                wrapper.find('.ProductTour__dot').at(1).hasClass('ProductTour__dot--isActive')
            ).toBeFalsy();
        });
        it('should move to next slide when continue is clicked', () => {
            wrapper.find('Button').at(1).simulate('click');
            expect(wrapper.find('h1').text()).toMatch('Slide 2');
            expect(
                wrapper.find('.ProductTour__dot').at(0).hasClass('ProductTour__dot--isActive')
            ).toBeFalsy();
            expect(
                wrapper.find('.ProductTour__dot').at(1).hasClass('ProductTour__dot--isActive')
            ).toBeTruthy();
        });
        it('should move to slide x when xth dot is clicked', () => {
            // move to 3rd slide
            wrapper.find('.ProductTour__dot').at(2).simulate('click');
            expect(wrapper.find('h1').text()).toMatch('Slide 3');
            expect(
                wrapper.find('.ProductTour__dot').at(2).hasClass('ProductTour__dot--isActive')
            ).toBeTruthy();

            // move to 2nd slide
            wrapper.find('.ProductTour__dot').at(1).simulate('click');
            expect(wrapper.find('h1').text()).toMatch('Slide 2');
            expect(
                wrapper.find('.ProductTour__dot').at(1).hasClass('ProductTour__dot--isActive')
            ).toBeTruthy();
        });
        it('should move to slide x when xth dot is clicked via keyboard navigation', () => {
            // move to 3rd slide
            wrapper.find('.ProductTour__dot').at(2).simulate('keyDown', { key: ENTER_KEY });
            expect(wrapper.find('h1').text()).toMatch('Slide 3');
            expect(
                wrapper.find('.ProductTour__dot').at(2).hasClass('ProductTour__dot--isActive')
            ).toBeTruthy();
        });
        it('should display only Finish button on last slide', () => {
            wrapper.find('.ProductTour__dot').at(3).simulate('click');
            expect(wrapper.find('Button')).toHaveLength(1);
            expect(wrapper.find('Button').text()).toBe(finishLabel);
        });
    });
    describe('callbacks', () => {
        describe('without checkbox', () => {
            let wrapper;
            beforeEach(() => {
                wrapper = mount(
                    <ProductTour
                        ariaHideApp={false} // suppress consol warnings from Modal
                        isOpen
                        cancelLabel={cancelLabel}
                        continueLabel={continueLabel}
                        finishLabel={finishLabel}
                        onCancel={onCancel}
                        onFinished={onFinished}
                    >
                        {slides}
                    </ProductTour>
                );
            });

            it('should call onCancel if button is clicked', () => {
                wrapper.find('Button').at(0).simulate('click');
                expect(onCancel).toHaveBeenCalledTimes(1);
            });
            it('should call onCancel if overlay is clicked while not on last slide', () => {
                wrapper.find('.Modal__overlay').simulate('click');
                expect(onCancel).toHaveBeenCalledTimes(1);
            });
            it('should call onFinish if button is clicked', () => {
                wrapper.find('.ProductTour__dot').at(3).simulate('click');
                wrapper.find('Button').at(0).simulate('click');
                expect(onFinished).toHaveBeenCalledTimes(1);
            });
            it('should call onFinish if overlay is clicked while on last slide', () => {
                wrapper.find('.ProductTour__dot').at(3).simulate('click');
                wrapper.find('.Modal__overlay').simulate('click');
                expect(onFinished).toHaveBeenCalledTimes(1);
            });
        });
        describe('with checkbox', () => {
            let wrapper;
            beforeEach(() => {
                wrapper = mount(
                    <ProductTour
                        ariaHideApp={false} // suppress consol warnings from Modal
                        isOpen
                        checkboxLabel={checkboxLabel}
                        cancelLabel={cancelLabel}
                        continueLabel={continueLabel}
                        finishLabel={finishLabel}
                        onCancel={onCancel}
                        onFinished={onFinished}
                    >
                        {slides}
                    </ProductTour>
                );
            });

            it('should call onCancel with false if checkbox is not clicked', () => {
                wrapper.find('Button').at(0).simulate('click');
                expect(onCancel).toHaveBeenCalledWith(false);
            });
            it('should call onCancel with true if checkbox is clicked', () => {
                wrapper.find('input').simulate('change');
                wrapper.find('Button').at(0).simulate('click');
                expect(onCancel).toHaveBeenCalledWith(true);
            });
            it('should call onFinish with false if checkbox is not clicked', () => {
                wrapper.find('.ProductTour__dot').at(3).simulate('click');
                wrapper.find('Button').at(0).simulate('click');
                expect(onFinished).toHaveBeenCalledWith(false);
            });
            it('should call onFinish with true if checkbox is clicked', () => {
                wrapper.find('input').simulate('change');
                wrapper.find('.ProductTour__dot').at(3).simulate('click');
                wrapper.find('Button').at(0).simulate('click');
                expect(onFinished).toHaveBeenCalledWith(true);
            });
        });
    });
});
