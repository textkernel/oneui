import * as React from 'react';
import toJson from 'enzyme-to-json';
import { FieldWithValidation } from '../FieldWithValidation';
import { Input } from '../../Input';

describe('FieldWithValidation', () => {
    let wrapper;

    describe('when rendering message as text', () => {
        describe('with no error message passed', () => {
            beforeEach(() => {
                wrapper = mount(
                    <FieldWithValidation>
                        <Input />
                    </FieldWithValidation>
                );
            });

            it('should simply render the child as it is', () => {
                expect(wrapper.find('Input')).toHaveLength(1);
                expect(wrapper.find('Tooltip')).toHaveLength(0);
                expect(wrapper.find('Text')).toHaveLength(0);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });
        describe('with error message passed', () => {
            const message = 'invalid field';
            beforeEach(() => {
                wrapper = mount(
                    <FieldWithValidation errorMessage={message}>
                        <Input />
                    </FieldWithValidation>
                );
            });

            it('should set context to bad on child', () => {
                expect(wrapper.find('Input').prop('context')).toBe('bad');
            });
            it('should render the message as text', () => {
                expect(wrapper.find('Tooltip')).toHaveLength(0);
                expect(wrapper.find('Text')).toHaveLength(1);
                expect(wrapper.find('Text').text()).toBe(message);
            });
        });
    });
    describe('when using tooltip', () => {
        describe('with no error message passed', () => {
            beforeEach(() => {
                wrapper = mount(
                    <FieldWithValidation useTooltip>
                        <Input />
                    </FieldWithValidation>
                );
            });

            it('should render the tooltip, but without content', () => {
                wrapper.update();

                expect(wrapper.find('Input')).toHaveLength(1);
                expect(wrapper.find('Tooltip')).toHaveLength(1);
                expect(wrapper.find('Text')).toHaveLength(0);

                wrapper.find('input').simulate('mouseover');
                expect(wrapper.find('div[data-popup="true"]')).toHaveLength(0);
            });
        });
        describe('when error message is defined', () => {
            const message = 'invalid field';
            beforeEach(() => {
                wrapper = mount(
                    <FieldWithValidation errorMessage={message} useTooltip>
                        <Input />
                    </FieldWithValidation>
                );
            });

            it('should set context to bad on child', () => {
                expect(wrapper.find('Input').prop('context')).toBe('bad');
            });
            it('should render the message on mouse over', () => {
                expect(wrapper.find('Text')).toHaveLength(0);
                expect(wrapper.find('Tooltip')).toHaveLength(1);
                expect(wrapper.find('Tooltip').prop('content')).toBe(message);

                wrapper.find('input').simulate('mouseover');
                expect(wrapper.find('div[data-popup="true"]')).toHaveLength(1);
                expect(wrapper.find('div[data-popup="true"]').text()).toBe(message);
            });
            it('should remove the message on mouse leave', () => {
                wrapper.find('input').simulate('mouseover');
                expect(wrapper.find('div[data-popup="true"]').text()).toBe(message);

                wrapper.find('input').simulate('mouseleave');
                expect(wrapper.find('div[data-popup="true"]')).toHaveLength(0);
            });
            it('should render the message when field is focused', () => {
                expect(wrapper.find('div[data-popup="true"]')).toHaveLength(0);

                wrapper.find('input').simulate('focus');
                expect(wrapper.find('div[data-popup="true"]')).toHaveLength(1);
                expect(wrapper.find('div[data-popup="true"]').text()).toBe(message);
            });
            it('should remove the message when field is blurred', () => {
                wrapper.find('input').simulate('focus');
                expect(wrapper.find('div[data-popup="true"]').text()).toBe(message);

                wrapper.find('input').simulate('blur');
                expect(wrapper.find('div[data-popup="true"]')).toHaveLength(0);
            });
        });
    });
});
