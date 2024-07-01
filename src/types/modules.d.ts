declare module '*.scss' {
    interface ClassNames {
        [className: string]: string;
    }
    const classNames: ClassNames;
    export = classNames;
}

declare module '*.svg';

declare module '*.png';
