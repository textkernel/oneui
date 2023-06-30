import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeActions } from '../ThemeActions';

describe('ThemeActions component', () => {
    let view: RenderResult;

    const getButtonByName = (inputName) => screen.getByRole('button', { name: `${inputName}` });

    it('should render component correctly without any actions', () => {
        view = render(<ThemeActions />);

        expect(view.container).toMatchSnapshot();
        expect(screen.queryAllByRole('button')).toHaveLength(0);
    });

    it('should render component correctly with all actions', () => {
        const onResetMock = jest.fn();
        const onDownloadMock = jest.fn();
        const onFileChangeMock = jest.fn();
        view = render(
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

        expect(view.container).toMatchSnapshot();
        expect(getButtonByName('Reset')).toBeVisible();
        expect(getButtonByName('Download')).toBeVisible();
    });

    it('should invoke onReset callback when reset button is clicked', async () => {
        const onResetMock = jest.fn();
        const user = userEvent.setup();
        view = render(<ThemeActions resetLabel="Reset" onReset={onResetMock} />);

        await user.click(getButtonByName('Reset'));

        expect(onResetMock).toHaveBeenCalledTimes(1);
    });

    it('should invoke onDownload callback when download button is clicked', async () => {
        const onDownloadMock = jest.fn();
        const user = userEvent.setup();
        view = render(<ThemeActions downloadLabel="Download" onDownload={onDownloadMock} />);

        await user.click(getButtonByName('Download'));

        expect(onDownloadMock).toHaveBeenCalledTimes(1);
    });
});
