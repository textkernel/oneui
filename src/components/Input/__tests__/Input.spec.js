import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from '../Input';

describe('<Input> that renders an input field', () => {
    const changeOptions = {
        target: {
            value: 'test',
        },
    };

    const onChangeMock = jest.fn();

    it('should render default input correctly', () => {
        const inputValue = 'Some value';
        const { container } = render(<Input value={inputValue} onChange={onChangeMock} />);
        expect(container.querySelector('input').value).toBe(inputValue);
        expect(container).toMatchSnapshot();
    });

    it('should add classes when props are changed', () => {
        const { container } = render(<Input context="bad" size="large" isBlock disabled />);
        expect(container.querySelector('input')).toHaveAttribute('disabled', '');
        expect(container).toMatchSnapshot();
    });

    // it('should call change callback correctly', () => {
    //     const { container, debug } = render(<Input onChange={onChangeMock} />);
    //     debug(container.querySelector('input'));
    //     fireEvent.change(container.querySelector('input'), changeOptions);
    //     expect(onChangeMock).toHaveBeenCalledWith(changeOptions);
    // });

    // it('should add string html attributes correctly', () => {
    //     const wrapper = shallow(<Input data-test="something" />);
    //     expect(wrapper.find('input').prop('data-test')).toEqual('something');
    // });
});
