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

            it('should set context to danger on child', () => {
                expect(wrapper.find('Input').prop('context')).toBe('danger');
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

            it('should not render a tooltip with no error message', () => {
                wrapper.update();

                expect(wrapper.find('Input')).toHaveLength(1);
                wrapper.find('input').simulate('mouseover');
                expect(wrapper.find('Tooltip')).toHaveLength(0);
                expect(wrapper.find('Text')).toHaveLength(0);

                wrapper.find('input').simulate('mouseover');
                expect(wrapper.find('Tooltip')).toHaveLength(0);
            });
        });
        describe('when error message is defined', () => {
            const message = 'invalid field';
            beforeEach(() => {
                wrapper = shallow(
                    <FieldWithValidation errorMessage={message} useTooltip>
                        <Input />
                    </FieldWithValidation>
                );
            });

            it('should set context to danger on child', () => {
                expect(wrapper.find('Input').prop('context')).toBe('danger');
            });
            it('should render the message when field is focused', () => {
                expect(wrapper.find('Tooltip').props().visible).toBeFalsy();

                wrapper.find('Input').simulate('focus');
                expect(wrapper.find('Tooltip').props().visible).toBeTruthy();
                expect(wrapper.find('Tooltip').props().content).toBe(message);
            });
            it('should remove the message when field is blurred', () => {
                wrapper.find('Input').simulate('focus');
                expect(wrapper.find('Tooltip').props().content).toBe(message);

                wrapper.find('Input').simulate('blur');
                expect(wrapper.find('Tooltip').props().visible).toBeFalsy();
            });
        });
    });
});
