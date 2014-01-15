var Settings = {};

Settings.configCache = {};

Settings.setValue = function setValue(key, value) {
    Settings.configCache[key] = value;

    var config = {};
    if (localStorage.config)
        config = JSON.parse(localStorage.config);

    config[key] = value;
    localStorage.config = JSON.stringify(config);
    return value;
};

Settings.getValue = function getValue(key, defaultValue) {
    if (Settings.configCache[key])
        return Settings.configCache[key];

    if (!localStorage.config)
        return defaultValue;

    var config = JSON.parse(localStorage.config);
    if (!config[key])
        return defaultValue;

    Settings.configCache[key] = config[key];
    return config[key];
};

Settings.keyExists = function keyExists(key) {
    if (!localStorage.config)
        return false;

    var config = JSON.parse(localStorage.config);
    return (!!config[key]);
};

Settings.setObject = function setObject(key, object) {
    localStorage[key] = JSON.stringify(object);
    return object;
};

Settings.getObject = function getObject(key) {
    if (!localStorage[key])
        return undefined;

    return JSON.parse(localStorage[key]);
};

Settings.refreshCache = function refreshCache() {
    Settings.configCache = {};
};