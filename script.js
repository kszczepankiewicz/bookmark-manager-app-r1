

const getBookmarks = () => {
    try {
        let bookmarks = localStorage.getItem('bookmarks');
        if (!bookmarks) return [];
        // debugger;
        bookmarks = JSON.parse(bookmarks);
        if (!Array.isArray(bookmarks)) return [];
        if (!bookmarks.every(b => ['name', 'category', 'url'].every(p => p in b))) return [];
        return bookmarks;
    } catch (error) {
        return [];
    }
}

const showSection = section => {

}

const displayOrCloseForm = () => { }