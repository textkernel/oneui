import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FieldWithValidation } from '../FieldWithValidation';
import { Input } from '../../Input';
import '@testing-library/jest-dom';

describe('FieldWithValidation', () => {
    let wrapper;

    describe('when rendering message as text', () => {
        describe('with no error message passed', () => {
            beforeEach(() => {
                wrapper = render(
                    <FieldWithValidation>
                        <Input />
                    </FieldWithValidation>
                );
            });

            it('should simply render the child as it is', () => {
                expect(wrapper.asFragment()).toMatchSnapshot();
                expect(screen.getByRole('textbox')).toBeInTheDocument();
            });
        });
    });

    describe('with error message passed', () => {
        const message = 'invalid field';
        beforeEach(() => {
            wrapper = render(
                <FieldWithValidation errorMessage={message}>
                    <Input />
                </FieldWithValidation>
            );
        });

        it('should set context to bad on child', () => {
            expect(wrapper.asFragment()).toMatchSnapshot();
            const input = screen.getByRole('textbox');
            expect(input).toHaveAttribute('class', 'Input Input--context_bad');
            expect(input).toBeInTheDocument();
        });

        it('should render the message as text', () => {
            expect(screen.queryByText(message)).toBeDefined();
        });
    });
    describe('when using tooltip', () => {
        describe('with no error message passed', () => {
            beforeEach(() => {
                wrapper = render(
                    <FieldWithValidation useTooltip>
                        <Input />
                    </FieldWithValidation>
                );
            });

            it('should not render a tooltip with no error message', () => {
                expect(wrapper.asFragment()).toMatchSnapshot();
                fireEvent.change(screen.getByDisplayValue(''), { target: { value: 'Utrecht' } });
            });
        });
        describe('when error message is defined', () => {
            const message = 'invalid field';
            beforeEach(() => {
                wrapper = render(
                    <FieldWithValidation errorMessage={message} useTooltip>
                        <Input />
                    </FieldWithValidation>
                );
            });

            it('should set context to bad on child', () => {
                expect(wrapper.asFragment()).toMatchSnapshot();
                const input = screen.getByRole('textbox');
                expect(input).toHaveAttribute('class', 'Input Input--context_bad');
            });
            it('should render the message when field is focused', () => {
                expect(wrapper.asFragment()).toMatchSnapshot();
                expect(screen.queryByText(message)).toBeDefined();
            });
            it('should remove the message when field is blurred', () => {
                expect(wrapper.asFragment()).toMatchSnapshot();
                expect(screen.queryByText(message)).toBeDefined();
            });
        });
    });
});
