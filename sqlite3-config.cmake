get_filename_component(SQLITE3_CMAKE_DIR "${CMAKE_CURRENT_LIST_FILE}" PATH)

list(APPEND CMAKE_MODULE_PATH ${SQLITE3_CMAKE_DIR})

if(NOT TARGET sqlite3:sqlite3)
    include("${SQLITE3_CMAKE_DIR}/sqlite3-targets.cmake")
endif()

set(SQLITE3_LIBRARIES sqlite3:sqlite3)
