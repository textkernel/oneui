export function ensureApiKey(library = null) {
    let apiKey = window.localStorage.getItem('storybook_google_api_key');

    if (
        (!apiKey && window.google) ||
        (apiKey &&
            window.google &&
            (!window.google.maps || (library && !window.google.maps[library])))
    ) {
        // eslint-disable-next-line no-alert
        window.alert(
            "Looks like google API wasn't correctly loaded on the page. Please might need to refresh the page before continuing"
        );
    }

    if (!apiKey) {
        apiKey = window.prompt('Please provide a Google API key'); // eslint-disable-line no-alert
        if (apiKey) {
            window.localStorage.setItem('storybook_google_api_key', apiKey);
        } else {
            return null;
        }
    }

    return apiKey;
}
