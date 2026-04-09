const mainSection = document.getElementById('main-section');
const formSection = document.getElementById('form-section');
const bookmarkListSection = document.getElementById('bookmark-list-section');
// const categoryDropdown = document.getElementById('category-dropdown');
const addBookmarkButton = document.getElementById('add-bookmark-button');
const addBookmarkButtonForm = document.getElementById('add-bookmark-button-form');
const closeFormButton = document.getElementById('close-form-button');
const viewCategoryButton = document.getElementById('view-category-button');
const nameInput = document.getElementById('name');
const url = document.getElementById('url');
const categoryList = document.getElementById('category-list');

const categoryNames = document.getElementsByClassName('category-name');

const category = document.querySelector('option:checked')

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
    Array.from(categoryNames).forEach(el => el.innerText = category.value);
    displayOrCloseForm();
})

closeFormButton.addEventListener('click', displayOrCloseForm);

addBookmarkButtonForm.addEventListener('click', (e) => {
    const bookmarks = getBookmarks();
    bookmarks.push({ name: nameInput.value, category: category.value, url: url.value });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    nameInput.value = '';
    url.value = '';
    displayOrCloseForm();
});

const displayOrHideCategory = () => showSection(mainSection.classList.contains('hidden') ? mainSection : bookmarkListSection);

viewCategoryButton.addEventListener('click', (e) => {

    categoryList.innerHTML = '<p>No Bookmarks Found</p>';
})


// debugger;