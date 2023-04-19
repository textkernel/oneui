import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FileButton } from '../FileButton';

describe('<FileButton> that renders a button', () => {
    it('should render default button correctly', () => {
        const view = render(<FileButton>Choose file</FileButton>);
        expect(view.asFragment()).toMatchSnapshot();
        expect(screen.getByLabelText('Choose file')).toBeInTheDocument();
    });
    it('should add classes when props are changed', () => {
        const view = render(
            <FileButton size="large" isBlock>
                Click me
            </FileButton>
        );
        expect(view.asFragment()).toMatchSnapshot();
    });
    it('should call click callback correctly', async () => {
        const onChangeMock = jest.fn();
        const user = userEvent.setup();
        render(<FileButton onChange={onChangeMock}>Click me</FileButton>);
        await user.upload(screen.getByLabelText('Click me'), new File(['test'], 'test.txt'));
        expect(onChangeMock).toHaveBeenCalled();
    });
});
