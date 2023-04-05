import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FieldWithValidation } from '../FieldWithValidation';
import { Input } from '../../Input';
import '@testing-library/jest-dom';

describe('FieldWithValidation', () => {
    describe('when rendering message as text', () => {
        describe('with no error message passed', () => {
            it('should simply render the child as it is', () => {
                const { asFragment } = render(
                    <FieldWithValidation>
                        <Input />
                    </FieldWithValidation>
                );
                expect(asFragment()).toMatchSnapshot();
                expect(screen.getByRole('textbox')).toBeInTheDocument();
            });
        });
    });

    describe('with error message passed', () => {
        const message = 'invalid field';
        it('should set context to bad on child', () => {
            const { asFragment } = render(
                <FieldWithValidation errorMessage={message}>
                    <Input />
                </FieldWithValidation>
            );
            expect(asFragment()).toMatchSnapshot();
            const input = screen.getByRole('textbox');
            expect(input).toHaveAttribute('class', 'Input Input--context_danger');
            expect(input).toBeInTheDocument();
        });

        it('should render the message as text', () => {
            expect(screen.queryByText(message)).toBeDefined();
        });
    });
    describe('when using tooltip', () => {
        describe('with no error message passed', () => {
            it('should not render a tooltip with no error message', () => {
                const { asFragment } = render(
                    <FieldWithValidation useTooltip>
                        <Input />
                    </FieldWithValidation>
                );
                expect(asFragment()).toMatchSnapshot();
                userEvent.click(screen.getByDisplayValue(''));
            });
        });
        describe('when error message is defined', () => {
            let view;
            const message = 'invalid field';
            beforeEach(() => {
                view = render(
                    <FieldWithValidation errorMessage={message} useTooltip>
                        <Input />
                    </FieldWithValidation>
                );
            });

            it('should set context to bad on child', () => {
                expect(view.asFragment()).toMatchSnapshot();
                const input = screen.getByRole('textbox');
                expect(input).toHaveAttribute('class', 'Input Input--context_danger');
            });
            it('should render the message when field is focused', () => {
                expect(view.asFragment()).toMatchSnapshot();
                expect(screen.queryByText(message)).toBeDefined();
            });
            it('should remove the message when field is blurred', () => {
                expect(view.asFragment()).toMatchSnapshot();
                expect(screen.queryByText(message)).toBeDefined();
            });
        });
    });
});
