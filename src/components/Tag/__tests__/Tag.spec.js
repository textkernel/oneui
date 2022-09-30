import React from 'react';
import toJson from 'enzyme-to-json';
import { Tag } from '../Tag';

describe('<Tag> component', () => {
    let wrapper;
    const onTagClick = jest.fn();
    const onDeleteClick = jest.fn();

    const deleteButtonSelector = 'Tag .Tag__deleteButton';

    const text = 'Tag text';
    const bgColor = '#ccc';
    const maxWidth = '30px';
    const textSize = 'large';

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render correctly with minimum amount of props', () => {
        wrapper = mount(<Tag>{text}</Tag>);

        expect(wrapper.find('p.Tag__text').text()).toEqual(text);

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render correctly with full list of props', () => {
        wrapper = mount(
            <Tag
                isSelected
                bgColor={bgColor}
                maxWidth={maxWidth}
                size={textSize}
                onClick={onTagClick}
                onDelete={onDeleteClick}
                contentClassName="my-class"
                contentStyle={{ color: 'red' }}
            >
                {text}
            </Tag>
        );

        expect(wrapper.find('.Tag').prop('className')).toContain('isSelected');
        expect(wrapper.find('.Tag').prop('style').backgroundColor).toEqual(bgColor);
        expect(wrapper.find('.Tag').prop('style').maxWidth).toEqual(maxWidth);
        expect(wrapper.find('Text').prop('size')).toEqual(textSize);
        expect(wrapper.find('Tag .Tag__deleteButton MdClose').exists()).toBeTruthy();
        expect(wrapper.find('.my-class')).toHaveLength(2);

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should invoke callback when onClick event is called', () => {
        wrapper = mount(<Tag onClick={onTagClick}>{text}</Tag>);

        wrapper.find('Tag').simulate('click');
        expect(onTagClick).toHaveBeenCalledTimes(1);
    });

    it('should invoke onClick when user interacts with tag by pressing Enter', () => {
        wrapper = mount(<Tag onClick={onTagClick}>{text}</Tag>);

        wrapper.find('Tag').simulate('focus');
        wrapper.find('Tag').simulate('keypress', { key: 'Enter' });

        expect(onTagClick).toHaveBeenCalledTimes(1);
    });

    it('should invoke callback when onDelete event is called', () => {
        wrapper = mount(
            <Tag onClick={onTagClick} onDelete={onDeleteClick}>
                {text}
            </Tag>
        );

        wrapper.find(deleteButtonSelector).simulate('click');
        expect(onTagClick).toHaveBeenCalledTimes(0);
        expect(onDeleteClick).toHaveBeenCalledTimes(1);
    });

    it('should invoke onDelete when user interacts with delete button by pressing Enter', () => {
        wrapper = mount(
            <Tag onClick={onTagClick} onDelete={onDeleteClick}>
                {text}
            </Tag>
        );

        wrapper.find(deleteButtonSelector).simulate('focus');
        wrapper.find(deleteButtonSelector).simulate('keydown', { key: 'Enter' });

        expect(onTagClick).toHaveBeenCalledTimes(0);
        expect(onDeleteClick).toHaveBeenCalledTimes(1);
    });
});
