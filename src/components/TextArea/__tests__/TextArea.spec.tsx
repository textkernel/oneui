import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { TextArea } from '../TextArea';

describe('<TextArea> that renders a textarea', () => {
    const data = 'test';

    let view: RenderResult;

    it('should render default textarea correctly', () => {
        view = render(<TextArea defaultValue="Some value" />);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should add classes when props are changed', () => {
        view = render(<TextArea size="large" isBlock disabled />);

        const textarea = screen.getByRole('textbox');

        expect(view.container).toMatchSnapshot();
        expect(textarea).toBeInTheDocument();
        expect(textarea).toBeDisabled();
        expect(textarea).toHaveClass('TextArea TextArea--size_large TextArea--isBlock');
    });

    it('should call change callback correctly', async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        view = render(<TextArea onChange={onChange} />);

        const textarea = screen.getByRole('textbox');

        expect(textarea).toBeInTheDocument();

        await user.type(textarea, data);

        expect(onChange).toHaveBeenCalledTimes(data.length);
    });

    it('should add string html attributes correctly', () => {
        view = render(<TextArea data-test="something" />);

        const textarea = screen.getByRole('textbox');

        expect(textarea).toBeInTheDocument();
        expect(textarea).toHaveAttribute('data-test', 'something');
    });
});
