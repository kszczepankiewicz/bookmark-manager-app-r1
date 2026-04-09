const getBookmarks = () => {
    return JSON.parse(localStorage.getItem('bookmarks')) || [];
}
debugger
