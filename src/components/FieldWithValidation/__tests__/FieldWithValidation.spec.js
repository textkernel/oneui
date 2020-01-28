import * as React from 'react';
import toJson from 'enzyme-to-json';
import { FieldWithValidation } from '../FieldWithValidation';
import { Input } from '../../Input';

describe('FieldWithValidation', () => {
    let wrapper;

    describe('when error message is not defined', () => {
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
        it('should simply render the child as it is, even if useTooltip is set to true', () => {
            wrapper.setProps({ useTooltip: true });
            wrapper.update();

            expect(wrapper.find('Input')).toHaveLength(1);
            expect(wrapper.find('Tooltip')).toHaveLength(0);
            expect(wrapper.find('Text')).toHaveLength(0);
        });
    });
    describe('when error message is defined', () => {
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
        it('should render the message as tooltip when useTooltip is set to true', () => {
            wrapper.setProps({ useTooltip: true });
            wrapper.update();

            expect(wrapper.find('Text')).toHaveLength(0);
            expect(wrapper.find('Tooltip')).toHaveLength(1);
            expect(wrapper.find('Tooltip').prop('content')).toBe(message);
        });
    });
});
