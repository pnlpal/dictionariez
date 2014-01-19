var Settings = {};

//it's initialized value
Settings.configCache = {
    enableMinidict: true,
    specialKeys: 'ctrl,shift',
    normalKey: 'X'
};

Settings.init = function(onFinished){
    chrome.storage.sync.get(Settings.configCache, function(obj){
        Settings.configCache = obj;
        chrome.storage.sync.set(obj);

        onFinished();
    });
};

Settings.setValue = function setValue(key, value) {
    Settings.configCache[key] = value;
    chrome.storage.sync.set(Settings.configCache);
    return value;
};

Settings.getValue = function getValue(key, defaultValue) {
    return Settings.configCache[key] || defaultValue;
};

Settings.keyExists = function keyExists(key) {
    return (!!Settings.configCache[key]);
};
