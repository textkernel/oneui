import PopperJs from 'popper.js';

// eslint-disable-next-line import/no-default-export
export default class Popper {
    static placements = PopperJs.placements;

    constructor() {
        return {
            destroy: () => {},
            scheduleUpdate: () => {},
        };
    }
}
