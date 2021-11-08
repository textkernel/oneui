import React from 'react';
import toJson from 'enzyme-to-json';
import { Tag } from '../Tag';

describe('<Tag> component', () => {
    let wrapper;
    const onTagClick = jest.fn();
    const onDeleteClick = jest.fn();

    const text = 'Tag text';
    const bgColor = '#ccc';
    const maxWidth = '30px';
    const textSize = 'large';

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render correctly with minimum amount of props', () => {
        wrapper = mount(<Tag>{text}</Tag>);

        expect(wrapper.find('p.tagText').text()).toEqual(text);

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
            >
                {text}
            </Tag>
        );

        expect(wrapper.find('.Tag').prop('className')).toContain('selected');
        expect(wrapper.find('.Tag').prop('style').backgroundColor).toEqual(bgColor);
        expect(wrapper.find('.Tag').prop('style').maxWidth).toEqual(maxWidth);
        expect(wrapper.find('Text').prop('size')).toEqual(textSize);
        expect(wrapper.find('Tag button.deleteButton MdClose').exists()).toBeTruthy();

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should invoke callback when onClick event is called', () => {
        wrapper = mount(<Tag onClick={onTagClick}>{text}</Tag>);

        wrapper.find('Tag').simulate('click');
        expect(onTagClick).toHaveBeenCalled();
    });

    it('should invoke callback when onDelete event is called', () => {
        wrapper = mount(
            <Tag onClick={onTagClick} onDelete={onDeleteClick}>
                {text}
            </Tag>
        );

        wrapper.find('Tag').simulate('click');

        wrapper.find('Tag button.deleteButton').simulate('click');
        expect(onDeleteClick).toHaveBeenCalled();
    });
});
