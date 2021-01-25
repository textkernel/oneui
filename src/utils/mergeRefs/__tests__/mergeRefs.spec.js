import React from 'react';
import { mergeRefs } from '../mergeRefs';

describe('utils/mergeRefs', () => {
    const node = <div />;

    it('should apply function/object refs and skip undefined', () => {
        const refObject1 = React.createRef();
        const refObject2 = React.createRef();
        const refFunc1 = jest.fn();
        const refFunc2 = jest.fn();

        const mergedRefFunc = mergeRefs([refObject1, refObject2, undefined, refFunc1, refFunc2]);
        expect(typeof mergedRefFunc).toEqual('function');

        mergedRefFunc(node);

        expect(refObject1.current).toEqual(node);
        expect(refObject2.current).toEqual(node);
        expect(refFunc1).toBeCalledWith(node);
        expect(refFunc2).toBeCalledWith(node);
    });

    it('should rewrite initial object ref value', () => {
        const initialNode = <li />;
        const refObject = React.createRef();
        refObject.current = initialNode;

        const mergedRefFunc = mergeRefs([refObject]);
        expect(typeof mergedRefFunc).toEqual('function');

        mergedRefFunc(node);

        expect(refObject.current).toEqual(node);
    });

    it('should not throw on empty list', () => {
        let mergedRefFunc;
        expect(() => {
            mergedRefFunc = mergeRefs([]);
        }).not.toThrow();
        expect(typeof mergedRefFunc).toEqual('function');
        expect(() => mergedRefFunc(node)).not.toThrow();
    });

    it('should not throw on all refs are undefined', () => {
        let mergedRefFunc;
        expect(() => {
            mergedRefFunc = mergeRefs([undefined, undefined]);
        }).not.toThrow();
        expect(typeof mergedRefFunc).toEqual('function');
        expect(() => mergedRefFunc(node)).not.toThrow();
    });
});
