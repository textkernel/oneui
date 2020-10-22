import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { StickyHeader } from '@textkernel/oneui';

storiesOf('Atoms|StickyHeader', module)
    .addDecorator(withKnobs)
    .add('StickyHeader', () => {
        const headerStyle = {
            padding: '5px',
            margin: '5px',
            borderRadius: '3px',
            backgroundColor: 'var(--color-warning-10)',
        };
        const bodyStyle = {
            color: '#FFF',
            height: '1000vh',
            padding: '10px',
            backgroundColor: '#269',
            backgroundImage:
                'linear-gradient(rgba(255,255,255,.5) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,.5) 2px, transparent 2px), linear-gradient(rgba(255,255,255,.28) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.28) 1px, transparent 1px)',
            backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
            backgroundPosition: '-2px -2px, -2px -2px, -1px -1px, -1px -1px',
        };
        return (
            <>
                <StickyHeader>
                    <div style={headerStyle}>I am a sticky header</div>
                </StickyHeader>
                <div style={bodyStyle}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam
                        tristique fringilla. Fusce et velit sit amet dolor pulvinar placerat sit
                        amet quis tellus. In hac habitasse platea dictumst. Morbi mauris est,
                        bibendum iaculis lectus et, volutpat porta arcu. Cras id gravida arcu.
                        Integer dapibus nibh non tempus semper. Aliquam maximus ultricies urna et
                        laoreet. In sed lorem non nisi commodo vehicula eget eu elit. Nullam aliquam
                        ligula ac accumsan viverra.
                    </p>
                    <p>
                        Aenean ultrices quam sit amet consequat maximus. Phasellus dignissim nulla
                        est, semper rutrum nibh varius quis. Maecenas ac justo interdum, bibendum
                        arcu gravida, luctus enim. Nunc ac iaculis lectus, ut vulputate libero.
                        Integer malesuada egestas tortor efficitur congue. Vivamus augue lorem,
                        mattis eu luctus sed, dignissim non tellus. Nullam hendrerit vehicula nibh,
                        in consectetur libero ullamcorper ac. Ut interdum sit amet diam nec semper.
                        Curabitur consequat tincidunt nunc, non consequat quam imperdiet sit amet.
                    </p>
                    <p>
                        Nulla ullamcorper ornare metus eu iaculis. Pellentesque ornare pellentesque
                        ante eget convallis. Aliquam elit leo, volutpat vel justo a, commodo
                        ullamcorper orci. Proin vel mauris ante. Mauris sed aliquet quam. Fusce nisl
                        ipsum, tristique a scelerisque quis, viverra eget risus. Fusce nec tortor
                        vel velit finibus pulvinar nec tincidunt massa. Mauris pellentesque, lorem a
                        efficitur porttitor, libero ipsum eleifend elit, sit amet cursus nisi nisl
                        eget nibh. Nunc ultricies porta arcu, eu tincidunt quam. Nulla bibendum
                        condimentum libero, vitae sagittis orci lobortis at. Sed condimentum sit
                        amet leo vitae venenatis. Quisque velit odio, rutrum at nunc vitae,
                        malesuada fermentum ligula.
                    </p>
                </div>
            </>
        );
    });
