import React from 'react';
import toJson from 'enzyme-to-json';
import { ThemerollerActions } from '../ThemerollerActions';

describe('ThemerollerActions component', () => {
    const onResetMock = jest.fn();
    const onDownloadMock = jest.fn();
    const onApplyMock = jest.fn();

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render component correctly without any actions', () => {
        const wrapper = mount(<ThemerollerActions />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component correctly with all actions', () => {
        const wrapper = mount(
            <ThemerollerActions
                resetLabel="Reset"
                applyLabel="Apply"
                downloadLabel="Download"
                onReset={onResetMock}
                onDownload={onDownloadMock}
                onApply={onApplyMock}
            />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should invoke onReset callback when reset button is clicked', () => {
        const wrapper = mount(<ThemerollerActions resetLabel="Reset" onReset={onResetMock} />);
        wrapper.find('button').simulate('click');
        expect(onResetMock).toHaveBeenCalledTimes(1);
    });

    it('should invoke onDownload callback when download button is clicked', () => {
        const wrapper = mount(
            <ThemerollerActions downloadLabel="Download" onDownload={onDownloadMock} />
        );
        wrapper.find('button').simulate('click');
        expect(onDownloadMock).toHaveBeenCalledTimes(1);
    });

    it('should invoke onApply callback when apply button is clicked', () => {
        const wrapper = mount(<ThemerollerActions applyLabel="Download" onApply={onApplyMock} />);
        wrapper.find('button').simulate('click');
        expect(onApplyMock).toHaveBeenCalledTimes(1);
    });
});
