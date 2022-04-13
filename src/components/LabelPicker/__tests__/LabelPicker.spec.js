import React from 'react';
import toJson from 'enzyme-to-json';
import { LabelPicker } from '../LabelPicker';

describe('<LabelPicker> that renders a dropdown type component to apply/remove/add labels', () => {
    it.todo('should render trigger button correctly');
    it.todo('should toggle dialog when trigger button is clicked');

    it.todo('should render dialog with empty labels list');
    it.todo('should render dialog with labels');
    it.todo('should render count when it is passed');
    it.todo('should not render 0 count');
    it.todo('should set label selection state according to props passed');

    it.todo('should call onChange when label is clicked');
    it.todo('should call onChange with updated selection state once label was clicked');
    it.todo(
        'should call onChange with with full label object (e.g. include id even if it is not included in the type)'
    );

    it.todo('should call onAdd when add button is clicked');
    it.todo('should call onAdd when add ENTER is pressed');

    it.todo('should call onDone when add Done button is clicked');
    it.todo('should call onCancel on outer click');
});
