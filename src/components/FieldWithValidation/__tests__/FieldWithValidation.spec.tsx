import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { FieldWithValidation } from '../FieldWithValidation';
import { Input } from '../../Input';

describe('FieldWithValidation', () => {
    describe('when rendering message as text', () => {
        describe('with no error message passed', () => {
            it('should simply render the child as it is', () => {
                const { container } = render(
                    <FieldWithValidation>
                        <Input />
                    </FieldWithValidation>
                );
                expect(container).toMatchSnapshot();
                expect(screen.getByRole('textbox')).toBeInTheDocument();
            });
        });
    });

    describe('with error message passed', () => {
        const message = 'invalid field';
        it('should set context to bad on child', () => {
            const { container } = render(
                <FieldWithValidation errorMessage={message}>
                    <Input />
                </FieldWithValidation>
            );
            expect(container).toMatchSnapshot();
            const input = screen.getByRole('textbox');
            expect(input).toHaveAttribute('class', 'Input Input--context_danger');
            expect(input).toBeInTheDocument();
            expect(screen.getByText(message)).toBeInTheDocument();
        });

        it('should render the message as text', () => {
            const { container } = render(
                <FieldWithValidation errorMessage={message}>
                    <Input />
                </FieldWithValidation>
            );
            expect(container).toMatchSnapshot();
            expect(screen.getByText(message)).toBeInTheDocument();
        });
    });
    describe('when using tooltip', () => {
        describe('with no error message passed', () => {
            it('should not render a tooltip with no error message', () => {
                const user = userEvent.setup();
                const { container } = render(
                    <FieldWithValidation useTooltip>
                        <Input />
                    </FieldWithValidation>
                );

                expect(container).toMatchSnapshot();

                user.click(screen.getByDisplayValue(''));
            });
        });

        describe('when error message is defined', () => {
            const message = 'invalid field';

            it('should set context to bad on child', () => {
                const { container } = render(
                    <FieldWithValidation errorMessage={message}>
                        <Input />
                    </FieldWithValidation>
                );

                expect(container).toMatchSnapshot();

                const input = screen.getByRole('textbox');

                expect(input).toHaveAttribute('class', 'Input Input--context_danger');
            });

            it('should render the message when field is focused', () => {
                const { container } = render(
                    <FieldWithValidation errorMessage={message}>
                        <Input />
                    </FieldWithValidation>
                );

                expect(container).toMatchSnapshot();
                expect(screen.queryByText(message)).toBeDefined();
            });

            it('should remove the message when field is blurred', () => {
                const { container } = render(
                    <FieldWithValidation errorMessage={message}>
                        <Input />
                    </FieldWithValidation>
                );

                expect(container).toMatchSnapshot();
                expect(screen.queryByText(message)).toBeDefined();
            });
        });
    });
});
