import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { RadioButton } from '../RadioButton';
import { RadioButtonGroup } from '../RadioButtonGroup';

describe('<RadioButtonGroup> that renders a group of radio buttons', () => {
    let view: RenderResult;

    const onChangeChildMock = jest.fn();
    const namePropValue = 'group_name';

    beforeEach(() => {
        view = render(
            <RadioButtonGroup name="group_name">
                <RadioButton onChange={onChangeChildMock} id="o1">
                    Option 1
                </RadioButton>
                <RadioButton id="o2">Option 2</RadioButton>
            </RadioButtonGroup>
        );
    });

    it('should render correctly', () => {
        expect(view.container).toMatchSnapshot();
        expect(screen.getAllByRole('radio')).toHaveLength(2);
    });

    it('should pass name prop to children', () => {
        const buttons = screen.getAllByRole('radio');

        expect(buttons).toHaveLength(2);
        expect(buttons[0]).toHaveAttribute('name', namePropValue);
        expect(buttons[1]).toHaveAttribute('name', namePropValue);
    });

    it('should not modify onChange prop of children if they are no defined on the group level', async () => {
        const user = userEvent.setup();
        const buttons = screen.getAllByRole('radio');

        expect(buttons).toHaveLength(2);

        await user.click(buttons[0]);

        expect(onChangeChildMock).toHaveBeenCalled();
        expect(buttons[1]).not.toHaveAttribute('onChange');
    });

    it('should onChange should called for all children', async () => {
        const user = userEvent.setup();
        const onChangeGlobalMock = jest.fn();
        view.rerender(
            <RadioButtonGroup name={namePropValue} onChange={onChangeGlobalMock}>
                <RadioButton id="o1">Option 1</RadioButton>
                <RadioButton id="o2">Option 2</RadioButton>
            </RadioButtonGroup>
        );

        const buttons = screen.getAllByRole('radio');

        expect(buttons).toHaveLength(2);

        await user.click(buttons[0]);

        expect(onChangeGlobalMock).toBeCalledTimes(1);

        await user.click(buttons[1]);

        expect(onChangeGlobalMock).toBeCalledTimes(2);
    });
});
