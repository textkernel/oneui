import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { Drawer } from '@textkernel/oneui';

storiesOf('Atoms|Drawer', module)
    .addDecorator(withKnobs)
    .add(
        'Drawer',
        () => (
            <Drawer
                isShown={boolean('isShown', true)}
                isExpanded={boolean('isExpanded', true)}
                title={text('Drawer title', '12/13 processed (2 need review, 1 failed)')}
                onClick={
                    boolean('Use onClick prop', false)
                        ? () => console.log('onClick callback has been called')
                        : undefined
                }
            >
                {text(
                    'Content',
                    `
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Ipsum Ipsum
            Ipsum has been the industrys standard dummy text ever since the 1500s, w unknown unknown
            unknown printer took a galley of type and scrambled it to make a type spe has survived
            not only five centuries, but also the leap into elec typesetting, typesetting, remaining
            essentially unchanged. It was popularised in the 19 with the with the release of
            Letraset sheets containing Lorem Ipsum passages, recently with desktop publishing
            software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Ipsum Ipsum has been the industrys
            standard dummy text ever since the 1500s, w unknown unknown printer took a galley of
            type and scrambled it to make a type spe has survived not only five centuries, but also
            the leap into elec typesetting, typesetting, remaining essentially unchanged. It was
            popularised in the 19 with the with the release of Letraset sheets containing Lorem
            Ipsum passages, recently with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum.
            `
                )}
            </Drawer>
        ),
        {
            info: {
                text: `
                    ## Usage information
                    Drawer can be used like an uncontrolled and controlled component.
                `,
            },
        }
    );
