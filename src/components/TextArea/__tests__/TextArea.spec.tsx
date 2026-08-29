import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { TextArea } from '../TextArea';

describe('<TextArea> that renders a textarea', () => {
    const data = 'test';

    let view: RenderResult;

    it('should render textarea correctly', () => {
        view = render(
            <TextArea
                defaultValue="Some value"
                label="label"
                labelStatus="required"
                helperText="helper"
            />
        );

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByText('label')).toBeInTheDocument();
        expect(screen.getByText('(required)')).toBeInTheDocument();
        expect(screen.getByText('helper')).toBeInTheDocument();
    });

    it('should render error message', () => {
        view = render(
            <TextArea
                defaultValue="Some value"
                label="label"
                labelStatus="required"
                errorText="It should contain a number"
            />
        );

        expect(screen.getByTestId('default-icon')).toBeInTheDocument();
        expect(screen.getByText('It should contain a number')).toBeInTheDocument();
    });

    it('should render letter count correctly', () => {
        view = render(<TextArea label="label" defaultValue="12345" maxLength={250} />);

        expect(screen.getByText('5 / 250')).toBeInTheDocument();
    });

    it('should call change callback correctly', async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        view = render(<TextArea label="label" onChange={onChange} />);

        const textarea = screen.getByRole('textbox');

        expect(textarea).toBeInTheDocument();

        await user.type(textarea, data);

        expect(onChange).toHaveBeenCalledTimes(data.length);
    });

    it('should add string html attributes correctly', () => {
        view = render(<TextArea label="label" data-test="something" />);

        const textarea = screen.getByRole('textbox');

        expect(textarea).toBeInTheDocument();
        expect(textarea).toHaveAttribute('data-test', 'something');
    });
});
