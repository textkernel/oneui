import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('<Button> that renders a button', () => {
    it('should not render any HTML if no children are provided', () => {
        const view = render(<Button>{null}</Button>);

        expect(view.container.firstChild).toBeNull();
    });
    it('should render default button correctly', () => {
        const view = render(<Button>Click me</Button>);

        expect(view.container).toMatchSnapshot();
        expect(screen.queryByRole('button')).toBeInTheDocument();
    });
    it('should add classes when props are changed', () => {
        const view = render(
            <Button isPrimary size="large" isBlock isLoading>
                <span>Click me</span>
            </Button>
        );

        expect(view.container).toMatchSnapshot();
        const button = screen.getByRole('button');
        expect(button).toHaveClass('Button--isPrimary');
        expect(button).toHaveClass('Button--size_large');
        expect(button).toHaveClass('Button--isBlock');
        expect(button).toHaveClass('Button--isLoading');
    });
    it('should call click callback correctly', async () => {
        const onClickMock = jest.fn();
        const user = userEvent.setup();
        render(<Button onClick={onClickMock}>Click me</Button>);

        await user.click(screen.getByRole('button'));

        expect(onClickMock).toHaveBeenCalled();
    });
    it('should add string html attributes correctly', () => {
        render(<Button data-test="something">Click me</Button>);

        expect(screen.getByRole('button')).toHaveAttribute('data-test', 'something');
    });
    it('should add functional html attributes correctly', async () => {
        const onMouseOverMock = jest.fn();
        const user = userEvent.setup();
        render(
            // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
            <Button onMouseOver={onMouseOverMock}>Click me</Button>
        );

        await user.hover(screen.getByRole('button'));

        expect(onMouseOverMock).toHaveBeenCalled();
    });
    it('should render an ancor element if href is defined', () => {
        const view = render(<Button href="/">Click me</Button>);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('link')).toBeInTheDocument();
    });
});
