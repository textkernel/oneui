import { placements } from '@popperjs/core';

// eslint-disable-next-line import/no-default-export
export default class Popper {
    static placements = placements;

    constructor() {
        return {
            destroy: () => {},
            scheduleUpdate: () => {},
        };
    }
}
