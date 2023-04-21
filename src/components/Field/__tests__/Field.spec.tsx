import React from 'react';
import { render, screen } from '@testing-library/react';
import { Field } from '../Field';
import '@testing-library/jest-dom';

describe('<Field> that renders an input field', () => {
    it('should render a component with a label properly', () => {
        const labelText = 'labelText';
        const view = render(
            <Field labelText={labelText} className="customClass">
                <input />
            </Field>
        );
        const button = screen.getByRole('textbox', { name: labelText });

        expect(button).toBeInTheDocument();
        expect(view.asFragment()).toMatchSnapshot();
    });
});
