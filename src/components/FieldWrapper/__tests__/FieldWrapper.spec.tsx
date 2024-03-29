import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FieldWrapper } from '../FieldWrapper';

describe('FieldWrapper', () => {
    it('should render nothing if no children are provided', () => {
        const { container } = render(<FieldWrapper>{}</FieldWrapper>);

        expect(container).toBeEmptyDOMElement();
    });

    it('should render correctly', () => {
        const { container } = render(<FieldWrapper>some children</FieldWrapper>);

        expect(container).toMatchSnapshot();
    });

    it('should add clear button if showClearButton is true', () => {
        const { container } = render(
            <FieldWrapper showClearButton clearTooltipLabel="Clear">
                some children
            </FieldWrapper>
        );

        expect(container).toMatchSnapshot();
        const button = screen.getByRole('button', { name: 'Clear' });
        expect(button).toBeInTheDocument();
    });

    it('should render arrow icon pointing down', () => {
        const openLabel = 'open';
        const { container } = render(
            <FieldWrapper downArrowLabel={openLabel} showArrow>
                some children
            </FieldWrapper>
        );

        expect(container).toMatchSnapshot();
        expect(screen.getByLabelText(openLabel)).toBeInTheDocument();
    });

    it('should render arrow icon pointing up', () => {
        const closeLabel = 'close';
        const { container } = render(
            <FieldWrapper upArrowLabel={closeLabel} showArrow isArrowUp>
                some children
            </FieldWrapper>
        );

        expect(container).toMatchSnapshot();
        expect(screen.getByLabelText(closeLabel)).toBeInTheDocument();
    });

    it('should call onArrowClick when arrow is clicked', async () => {
        const user = userEvent.setup();
        const onArrowClickMock = jest.fn();
        const { rerender, container } = render(
            <FieldWrapper showArrow onArrowClick={onArrowClickMock}>
                some children
            </FieldWrapper>
        );

        expect(container).toMatchSnapshot();

        const svg = screen.getByRole('button');

        expect(svg).toBeInTheDocument();

        await user.click(svg);

        expect(onArrowClickMock).toHaveBeenCalled();
        rerender(
            <FieldWrapper showArrow isArrowUp onArrowClick={onArrowClickMock}>
                some children
            </FieldWrapper>
        );
        const svgAfterRerender = screen.getByRole('button');
        await user.click(svgAfterRerender);

        expect(onArrowClickMock).toHaveBeenCalledTimes(2);
    });

    it('should call onArrowClick when arrow is accessed by keyboard', async () => {
        const user = userEvent.setup();
        const onArrowClickMock = jest.fn();
        const { rerender, container } = render(
            <FieldWrapper showArrow onArrowClick={onArrowClickMock}>
                some children
            </FieldWrapper>
        );

        expect(container).toMatchSnapshot();
        const svg = screen.getByRole('button');

        expect(svg).toBeInTheDocument();
        await user.keyboard('S');

        expect(onArrowClickMock).toHaveBeenCalledTimes(0);
        // TODO: this doesn't test what the test suit claim to test
        await user.click(svg);

        expect(onArrowClickMock).toHaveBeenCalledTimes(1);
        rerender(
            <FieldWrapper showArrow isArrowUp onArrowClick={onArrowClickMock}>
                some children
            </FieldWrapper>
        );

        const svgRerender = screen.getByRole('button');
        await user.click(svgRerender);

        expect(onArrowClickMock).toHaveBeenCalledTimes(2);
    });

    it('should call onClear callback correctly', async () => {
        const user = userEvent.setup();
        const onClearMock = jest.fn();
        const { container } = render(
            <FieldWrapper showClearButton clearTooltipLabel="Clear" onClear={onClearMock}>
                tag
            </FieldWrapper>
        );

        expect(container).toMatchSnapshot();

        const button = screen.getByRole('button', { name: 'Clear' });
        await user.click(button);

        expect(onClearMock).toHaveBeenCalled();
    });
});
