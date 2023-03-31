import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FieldWrapper } from '../FieldWrapper';
import { ENTER_KEY } from '../../../constants';
import '@testing-library/jest-dom';

describe('FieldWrapper', () => {
    it('should render correctly', () => {
        const { container, asFragment } = render(<FieldWrapper>some children</FieldWrapper>);

        expect(asFragment()).toMatchSnapshot();
        const button = container.querySelector('button') as Element;
        const svg = container.querySelector('svg') as Element;
        expect(button).not.toBeInTheDocument();
        expect(svg).not.toBeInTheDocument();
    });
    it('should add clear button if showClearButton is true', () => {
        const { asFragment } = render(
            <FieldWrapper showClearButton clearTooltipLabel="Clear">
                some children
            </FieldWrapper>
        );

        expect(asFragment()).toMatchSnapshot();
        const button = screen.getByRole('button', { name: 'Clear' });
        expect(button).toBeInTheDocument();
    });
    it('should render arrow icon pointing down', () => {
        const { asFragment } = render(<FieldWrapper showArrow>some children</FieldWrapper>);

        expect(asFragment()).toMatchSnapshot();
    });
    it('should render arrow icon pointing up', () => {
        const { asFragment } = render(
            <FieldWrapper showArrow isArrowUp>
                some children
            </FieldWrapper>
        );

        expect(asFragment()).toMatchSnapshot();
    });
    it('should call onArrowClick when arrow is clicked', () => {
        const onArrowClickMock = jest.fn();
        const { container, rerender, asFragment } = render(
            <FieldWrapper showArrow onArrowClick={onArrowClickMock}>
                some children
            </FieldWrapper>
        );

        expect(asFragment()).toMatchSnapshot();
        const svg = container.querySelector('svg') as Element;
        expect(svg).toBeInTheDocument();
        fireEvent.click(svg);
        expect(onArrowClickMock).toHaveBeenCalled();
        rerender(
            <FieldWrapper showArrow isArrowUp onArrowClick={onArrowClickMock}>
                some children
            </FieldWrapper>
        );
        const svgAfterRerender = container.querySelector('svg') as Element;
        fireEvent.click(svgAfterRerender);
        expect(onArrowClickMock).toHaveBeenCalledTimes(2);
    });
    it('should call onArrowClick when arrow is accessed by keyboard', () => {
        const onArrowClickMock = jest.fn();
        const { container, rerender, asFragment } = render(
            <FieldWrapper showArrow onArrowClick={onArrowClickMock}>
                some children
            </FieldWrapper>
        );

        expect(asFragment()).toMatchSnapshot();
        const svg = container.querySelector('svg') as Element;
        expect(svg).toBeInTheDocument();
        fireEvent.keyDown(svg, { key: 'S' });
        expect(onArrowClickMock).toHaveBeenCalledTimes(0);
        fireEvent.keyDown(svg, { key: ENTER_KEY });
        expect(onArrowClickMock).toHaveBeenCalledTimes(1);
        rerender(
            <FieldWrapper showArrow isArrowUp onArrowClick={onArrowClickMock}>
                some children
            </FieldWrapper>
        );
        const svgRerender = container.querySelector('svg') as Element;
        fireEvent.keyDown(svgRerender, { key: ENTER_KEY });
        expect(onArrowClickMock).toHaveBeenCalledTimes(2);
    });
    it('should call onClear callback correctly', () => {
        const onClearMock = jest.fn();
        const { asFragment } = render(
            <FieldWrapper showClearButton clearTooltipLabel="Clear" onClear={onClearMock}>
                tag
            </FieldWrapper>
        );

        expect(asFragment()).toMatchSnapshot();
        const button = screen.getByRole('button', { name: 'Clear' });
        fireEvent.click(button);
        expect(onClearMock).toHaveBeenCalled();
    });
});
