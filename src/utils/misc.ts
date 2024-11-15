export const assertNever = (value: never, componentInstance: string): never => {
    throw new Error(
        `Switch statement in ${componentInstance} terminated in unexpected default with value ${value}`
    );
};

export const stopPropagation = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation(); // Prevents bubbling to the parent component
};
