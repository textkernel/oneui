import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FieldWrapper } from '../FieldWrapper';
import '@testing-library/jest-dom';

describe('FieldWrapper', () => {
    it('should render correctly', () => {
        const { asFragment } = render(<FieldWrapper>some children</FieldWrapper>);

        expect(asFragment()).toMatchSnapshot();
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
    it('should call onArrowClick when arrow is clicked', async () => {
        const onArrowClickMock = jest.fn();
        const { rerender, asFragment } = render(
            <FieldWrapper showArrow onArrowClick={onArrowClickMock}>
                some children
            </FieldWrapper>
        );

        expect(asFragment()).toMatchSnapshot();
        const svg = screen.getByRole('img');
        expect(svg).toBeInTheDocument();
        await userEvent.click(svg);
        expect(onArrowClickMock).toHaveBeenCalled();
        rerender(
            <FieldWrapper showArrow isArrowUp onArrowClick={onArrowClickMock}>
                some children
            </FieldWrapper>
        );
        const svgAfterRerender = screen.getByRole('img');
        await userEvent.click(svgAfterRerender);
        expect(onArrowClickMock).toHaveBeenCalledTimes(2);
    });
    it('should call onArrowClick when arrow is accessed by keyboard', async () => {
        const onArrowClickMock = jest.fn();
        const { rerender, asFragment } = render(
            <FieldWrapper showArrow onArrowClick={onArrowClickMock}>
                some children
            </FieldWrapper>
        );

        expect(asFragment()).toMatchSnapshot();
        const svg = screen.getByRole('img');
        expect(svg).toBeInTheDocument();
        await userEvent.keyboard('S');
        expect(onArrowClickMock).toHaveBeenCalledTimes(0);
        await userEvent.click(svg);
        expect(onArrowClickMock).toHaveBeenCalledTimes(1);
        rerender(
            <FieldWrapper showArrow isArrowUp onArrowClick={onArrowClickMock}>
                some children
            </FieldWrapper>
        );
        const svgRerender = screen.getByRole('img');
        await userEvent.click(svgRerender);
        expect(onArrowClickMock).toHaveBeenCalledTimes(2);
    });
    it('should call onClear callback correctly', async () => {
        const onClearMock = jest.fn();
        const { asFragment } = render(
            <FieldWrapper showClearButton clearTooltipLabel="Clear" onClear={onClearMock}>
                tag
            </FieldWrapper>
        );

        expect(asFragment()).toMatchSnapshot();
        const button = screen.getByRole('button', { name: 'Clear' });
        await userEvent.click(button);
        expect(onClearMock).toHaveBeenCalled();
    });
});
