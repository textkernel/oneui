import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { useOuterClick } from '../useOuterClick';
import { useDocumentEvent } from '../../utils/testUtils';

describe('useOuterClick', () => {
    const mockCB = jest.fn();
    const TestComponent = () => {
        const ref = useOuterClick(mockCB);
        return <button ref={ref}>click here</button>;
    };
    const clickDocument = useDocumentEvent('click');

    const wrapper = mount(<TestComponent />);

    it('should not call callback when target was clicked', () => {
        wrapper.find('button').simulate('click');
        expect(mockCB).toHaveBeenCalledTimes(0);
    });
    it('should call callback when document was clicked outside of target', () => {
        act(() => {
            clickDocument();
        });
        wrapper.update();

        expect(mockCB).toHaveBeenCalledTimes(1);
    });
});
