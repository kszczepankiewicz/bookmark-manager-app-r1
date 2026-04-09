const mainSection = document.getElementById('main-section');
const formSection = document.getElementById('form-section');
// const categoryDropdown = document.getElementById('category-dropdown');
const addBookmarkButton = document.getElementById('add-bookmark-button');
const categoryNames = document.getElementsByClassName('category-name');

const getBookmarks = () => {
    try {
        let bookmarks = localStorage.getItem('bookmarks');
        if (!bookmarks) return [];
        bookmarks = JSON.parse(bookmarks);
        if (!Array.isArray(bookmarks)) return [];
        if (!bookmarks.every(b => ['name', 'category', 'url'].every(p => p in b))) return [];
        return bookmarks;
    } catch (error) {
        return [];
    }
}

const showSection = section => {
    [mainSection, formSection].forEach(s => s.classList.add('hidden'));
    section.classList.remove('hidden');
}

const displayOrCloseForm = () => showSection(mainSection.classList.contains('hidden') ? mainSection : formSection);

addBookmarkButton.addEventListener('click', (e) => {
    const selectedCategory = document.querySelector('option')
    // debugger;
    categoryNames.forEach(el => el.innerText = ``);
})