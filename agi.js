//Main Logic
if (requirelib("filelib")) {
    if (action === 'listDir') {
        sendJSONResp(filelib.readdir("dongwaa:\\" + (path ? ('' + path + '\\') : '') + "*"));
    } else if (action === 'listFile') {
        sendJSONResp(filelib.aglob("dongwaa:\\" + (path ? ('' + path + '\\') : '') + "*.*"));
    }
}
