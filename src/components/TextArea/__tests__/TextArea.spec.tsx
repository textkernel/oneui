import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { TextArea } from '../TextArea';

describe('<TextArea> that renders a textarea', () => {
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
        expect(textarea).toHaveAttribute('disabled');
        expect(textarea).toHaveClass('TextArea TextArea--size_large TextArea--isBlock');
    });

    it.skip('should call change callback correctly', async () => {
        const data = 'test';
        const user = userEvent.setup();
        const onChange = jest.fn();
        view = render(<TextArea onChange={onChange} />);
        expect(view.container).toMatchSnapshot();

        const textarea = screen.getByRole('textbox', { hidden: true });
        expect(textarea).toBeInTheDocument();

        await user.type(textarea, 'test'); // check

        expect(onChange).toHaveBeenCalledWith(data);
    });

    it('should add string html attributes correctly', () => {
        view = render(<TextArea data-test="something" />);

        const textarea = screen.getByRole('textbox');

        expect(textarea).toBeInTheDocument();
        expect(textarea).toHaveAttribute('data-test', 'something');
    });
});
