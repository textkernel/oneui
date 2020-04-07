import React from 'react';
import toJson from 'enzyme-to-json';
import { StringHighlighter } from '../StringHighlighter';

describe('StringHighlighter', () => {
    const string = 'We are looking for php, java and javascript developer';
    const searchTerms = [];
    const ignoreDiacritics = true;
    const ignoreCase = true;
    // eslint-disable-next-line react/display-name, react/prop-types
    const highlightRenderer = ({ substring, ...props }) => <b {...props}>{substring}</b>;
    // eslint-disable-next-line react/display-name, react/prop-types
    const renderComponent = (props) => {
        return mount(
            <StringHighlighter
                string={string}
                searchTerms={searchTerms}
                ignoreDiacritics={ignoreDiacritics}
                ignoreCase={ignoreCase}
                highlightRenderer={highlightRenderer}
                {...props}
            />
        );
    };

    describe('not highlighted', () => {
        it('should initially render empty component correctly', () => {
            const wrapper = renderComponent({
                string: '',
            });
            expect(toJson(wrapper)).toMatchSnapshot();
        });
        it('should not highlight not existed terms', () => {
            const wrapper = renderComponent({
                searchTerms: ['notExisting', 'dev', 'a'],
            });
            expect(toJson(wrapper)).toMatchSnapshot();
        });
        it('should not highlight case sensitive terms if ignoreCase is false', () => {
            const wrapper = renderComponent({
                searchTerms: ['DEVELOPER', 'Php'],
                ignoreCase: false,
            });
            expect(toJson(wrapper)).toMatchSnapshot();
        });
        it('should not highlight terms with diacritics if ignoreDiacritics is false', () => {
            const wrapper = renderComponent({
                searchTerms: ['dévéloper'],
                ignoreDiacritics: false,
            });
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });
    describe('highlighted', () => {
        it('should highlight list of terms', () => {
            const wrapper = renderComponent({
                searchTerms: ['javascript developer', 'php', 'java'],
            });
            expect(toJson(wrapper)).toMatchSnapshot();
        });
        it('should highlight case sensitive terms by default', () => {
            const wrapper = renderComponent({
                searchTerms: ['DEVELOPER', 'Php'],
            });
            expect(toJson(wrapper)).toMatchSnapshot();
        });
        it('should highlight terms with diacritics by default', () => {
            const wrapper = renderComponent({
                searchTerms: ['dévéloper'],
            });
            expect(toJson(wrapper)).toMatchSnapshot();
        });
        it('should highlight overlapping terms correctly', () => {
            const wrapper = renderComponent({
                searchTerms: ['javascript developer', 'java and javascript'],
            });
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });
});
