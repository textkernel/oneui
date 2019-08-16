import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('<Button> that renders a button', () => {
    const buttonTitle = 'Click me';

    it('should render default button correctly', () => {
        const { container } = render(<Button>{buttonTitle}</Button>);
        expect(container).toMatchSnapshot();
    });
    it('should add classes when props are changed', () => {
        const { container } = render(
            <Button context="primary" size="large" isBlock>
                {buttonTitle}
            </Button>
        );
        expect(container).toMatchSnapshot();
    });
    it('should call click callback correctly', () => {
        const onClickMock = jest.fn();
        const { getByText } = render(<Button onClick={onClickMock}>{buttonTitle}</Button>);
        fireEvent.click(getByText(buttonTitle));
        expect(onClickMock).toHaveBeenCalled();
    });
    it('should add string html attributes correctly', () => {
        const { container } = render(<Button data-test="something">{buttonTitle}</Button>);
        expect(container.querySelector('button')).toHaveAttribute('data-test', 'something');
    });
    it('should add functional html attributes correctly', () => {
        const onMouseOverMock = jest.fn();
        const { container } = render(
            // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
            <Button onMouseOver={onMouseOverMock}>{buttonTitle}</Button>
        );
        fireEvent.mouseOver(container.querySelector('button'));
        expect(onMouseOverMock).toHaveBeenCalled();
    });
    it('should render an ancor element if href is defined', () => {
        const { container } = render(<Button href="/">{buttonTitle}</Button>);
        expect(container).toMatchSnapshot();
        expect(container.querySelector('a')).toBeVisible();
    });
});
