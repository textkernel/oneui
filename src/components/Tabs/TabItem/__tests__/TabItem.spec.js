import React from 'react';
import toJson from 'enzyme-to-json';
import { TabItem } from '../TabItem';

describe('<TabItem>', () => {
    const onSelectMock = jest.fn();

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render a tab item correctly with minimum props', () => {
        const wrapper = shallow(<TabItem tabId="1">Tab label</TabItem>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render correctly with all props', () => {
        const wrapper = shallow(
            <TabItem tabId="1" isBlock isActive onSelect={onSelectMock}>
                Tab label <span style={{ color: 'grey' }}>(3)</span>
            </TabItem>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    describe('callbacks', () => {
        it('should call onSelect on simple tab', () => {
            const wrapper = shallow(
                <TabItem tabId="1" onSelect={onSelectMock}>
                    Tab label
                </TabItem>
            );
            wrapper.find('div').simulate('click');
            expect(onSelectMock).toHaveBeenCalledTimes(1);
        });
        it('should not call onSelect on active tab', () => {
            const wrapper = shallow(
                <TabItem tabId="1" isActive onSelect={onSelectMock}>
                    Tab label
                </TabItem>
            );
            wrapper.find('div').simulate('click');
            expect(onSelectMock).toHaveBeenCalledTimes(0);
        });
        it('should not call onSelect on disabled tab', () => {
            const wrapper = shallow(
                <TabItem tabId="1" disabled onSelect={onSelectMock}>
                    Tab label
                </TabItem>
            );
            wrapper.find('div').simulate('click');
            expect(onSelectMock).toHaveBeenCalledTimes(0);
        });
    });
});
