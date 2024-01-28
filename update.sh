#!/bin/sh

CSV="$(wget -q https://sqlite.org/download.html -O - | grep -E 'sqlite-amalgamation-[0-9]+\.zip,')"
VERSION="$(echo "${CSV}" | awk -F, '{print $2}')"
URL="https://sqlite3.org/$(echo "${CSV}" | awk -F, '{print $3}')"
HASH="$(echo "${CSV}" | awk -F, '{print $5}')"

CURRENT_VERSION="$(awk '/\(SQLITE3_VERSION/ {gsub("[\"\\)]", "", $2); print $2}' CMakeLists.txt)"

echo "${VERSION} ${URL} ${HASH} - ${CURRENT_VERSION}"
if [ "${CURRENT_VERSION}" != "${VERSION}" ]; then
    sed -i "s/\(SQLITE3_VERSION \)\"[^\"]+/\1\"${VERSION}\"/" CMakeLists.txt
    exit 0
fi