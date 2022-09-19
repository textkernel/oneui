const mockDocumentEventListener = {};

/**
 * Helper function to mock global events on documents
 * see: https://medium.com/@DavideRama/testing-global-event-listener-within-a-react-component-b9d661e59953
 * @param {string} eventType the type of event to mock, e.g. click, keydown, etc
 * @returns {(event?) => void} to be called to simulate the event. and optional event object can be passed.
 */
export const useDocumentEvent = (eventType: string) => {
    document.addEventListener = jest.fn((event, cb) => {
        mockDocumentEventListener[event] = cb;
    });

    return (event) => {
        // @ts-ignore
        mockDocumentEventListener[eventType]({ path: [document.body], ...event });
    };
};
