import * as React from 'react';
import { Callout } from '@textkernel/oneui';

export default { title: 'Atoms/Callout', component: Callout };

export const _Callout = (args) => <Callout {...args} />;
_Callout.args = {
    children:
        'Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
};

export const LongText = (args) => <Callout {...args} />;
LongText.storyName = 'Callout with more content';
LongText.args = {
    children: (
        <>
            <h2 style={{ margin: 0 }}>Request failed</h2>
            <p>
                Lorem Ipsum has been the industry standard dummy text ever since the 1500s, unknown
                printer took a galley of type and scrambled it to make a type specimen specimen
                book.
            </p>
            <p>
                Lorem Ipsum has been the industry standard dummy text ever since the 1500s, unknown
                printer took a galley of type and scrambled it to make a type specimen Lorem Ipsum
                has been the industry standard dummy text ever since the 1500s, unknown printer took
                a galley of type and scrambled it to make a type specimen specimen book.
            </p>
            <p>
                Lorem Ipsum has been the industry standard dummy text ever since the 1500s, unknown
                printer took a galley of type and scrambled it to make a type specimen Lorem Ipsum
                has been the industry standard dummy text ever since the 1500s, unknown printer took
                a galley of type and scrambled it to make a type specimen Lorem Ipsum has been the
                industry standard dummy text ever since the 1500s, unknown printer took a galley of
                type and scrambled it to make a type book.
            </p>
        </>
    ),
};
