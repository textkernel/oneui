import React from 'react';
import toJson from 'enzyme-to-json';
import { ThemeActions } from '../ThemeActions';

describe('ThemeActions component', () => {
    const onResetMock = jest.fn();
    const onDownloadMock = jest.fn();
    const onFileChangeMock = jest.fn();

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render component correctly without any actions', () => {
        const wrapper = mount(<ThemeActions />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render component correctly with all actions', () => {
        const wrapper = mount(
            <ThemeActions
                downloadDisabled
                resetLabel="Reset"
                fileLabel="Choose file"
                downloadLabel="Download"
                onReset={onResetMock}
                onDownload={onDownloadMock}
                onFileChange={onFileChangeMock}
            />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should invoke onReset callback when reset button is clicked', () => {
        const wrapper = mount(<ThemeActions resetLabel="Reset" onReset={onResetMock} />);
        wrapper.find('button').simulate('click');
        expect(onResetMock).toHaveBeenCalledTimes(1);
    });

    it('should invoke onDownload callback when download button is clicked', () => {
        const wrapper = mount(
            <ThemeActions downloadLabel="Download" onDownload={onDownloadMock} />
        );
        wrapper.find('button').simulate('click');
        expect(onDownloadMock).toHaveBeenCalledTimes(1);
    });
});
