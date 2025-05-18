# sqlite3-cmake

[![Build](https://github.com/sjinks/sqlite3-cmake/actions/workflows/build.yml/badge.svg)](https://github.com/sjinks/sqlite3-cmake/actions/workflows/build.yml)

libsqlite3 with CMake support.

## Usage with [FetchContent](https://cmake.org/cmake/help/latest/module/FetchContent.html)

```cmake
include(FetchContent)
FetchContent_Declare(sqlite3 GIT_REPOSITORY https://github.com/sjinks/sqlite3-cmake GIT_TAG v3.49.1)
FetchContent_MakeAvailable(sqlite3)

target_link_libraries(mytarget SQLite::SQLite3)
```

## Usage with [CPM.cmake](https://github.com/cpm-cmake/CPM.cmake)

```cmake
file(DOWNLOAD https://github.com/cpm-cmake/CPM.cmake/releases/download/v0.42.0/CPM.cmake ${CMAKE_CURRENT_BINARY_DIR}/cmake/CPM.cmake)
include(${CMAKE_CURRENT_BINARY_DIR}/cmake/CPM.cmake)

CPMAddPackage("gh:sjinks/sqlite3-cmake@3.49.1")
```
