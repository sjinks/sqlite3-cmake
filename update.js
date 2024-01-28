const { get } = require('node:https');
const { readFile, writeFile } = require('node:fs/promises');

function download(url) {
    return new Promise((resolve, reject) => {
        get(url, (res) => {
            if (res.statusCode === 200) {
                let body = '';

                res.on('data', (chunk) => {
                    body += chunk;
                });

                res.on('end', () => {
                    resolve(body);
                });
            } else {
                reject(new Error(`Request failed with status code ${res.statusCode}`));
            }
        }).on('error', (err) => {
            reject(err);
        });
    });
}

(async () => {
    const body = await download('https://sqlite.org/download.html');
    let matches = /^[^,]+,([^,]+),([^/]+\/sqlite-amalgamation-\d+.zip),\d+,([a-f0-9]{64})$/m.exec(body);
    if (matches) {
        const version = matches[1];
        const url = `https://sqlite3.org/${matches[2]}`;
        const hash = matches[3];

        console.log(version, url, hash);

        const file = await readFile('CMakeLists.txt', 'utf8');
        matches = /^set\(SQLITE3_VERSION "([^"]+)"\)/m.exec(file);
        if (matches) {
            const oldVersion = matches[1];
            if (oldVersion !== version) {
                const newFile = file.replace(
                    /^set\(SQLITE3_VERSION "[^"]+"\)/m,
                    `set(SQLITE3_VERSION "${version}")`
                ).replace(
                    /^set\(SQLITE3_DOWNLOAD_URL "[^"]+"\)/m,
                    `set(SQLITE3_DOWNLOAD_URL "${url}")`
                ).replace(
                    /^set\(SQLITE3_SHA3_256 "[^"]+"\)/m,
                    `set(SQLITE3_SHA3_256 "${hash}")`
                );

                await writeFile('CMakeLists1.txt', newFile);
            }
        }
    }
})().catch((err) => {
    console.error(err);
});
