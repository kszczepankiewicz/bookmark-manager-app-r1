const mainSection = document.getElementById('main-section');
const formSection = document.getElementById('form-section');
const bookmarkListSection = document.getElementById('bookmark-list-section');
// const categoryDropdown = document.getElementById('category-dropdown');
const addBookmarkButton = document.getElementById('add-bookmark-button');
const deleteBookmarkButton = document.getElementById('delete-bookmark-button');
const addBookmarkButtonForm = document.getElementById('add-bookmark-button-form');
const closeFormButton = document.getElementById('close-form-button');
const closeListButton = document.getElementById('close-list-button');
const viewCategoryButton = document.getElementById('view-category-button');
const nameInput = document.getElementById('name');
const url = document.getElementById('url');
const categoryList = document.getElementById('category-list');

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
    [mainSection, formSection, bookmarkListSection].forEach(s => s.classList.add('hidden'));
    section.classList.remove('hidden');
}

const displayOrCloseForm = () => showSection(mainSection.classList.contains('hidden') ? mainSection : formSection);

let category;

addBookmarkButton.addEventListener('click', (e) => {
    category = document.querySelector('option:checked');
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

const displayBookmarks = (bookmarks) => bookmarks.map(b => `<input type='radio' name='${b.category}' id='${b.name}' value='${b.name}'><label for='${b.name}'><a href='${b.url}'>${b.name}</a></label>`).join('\n')

viewCategoryButton.addEventListener('click', (e) => {
    showSection(bookmarkListSection);
    category = document.querySelector('option:checked');
    const bookmarks = getBookmarks().filter(b => b.category === category.value);
    if (!bookmarks.length) {
        categoryList.innerHTML = '<p>No Bookmarks Found</p>';
        return
    }
    categoryList.innerHTML = displayBookmarks(bookmarks);
})

closeListButton.addEventListener('click', (e) => showSection(mainSection));

deleteBookmarkButton.addEventListener('click', (e) => {
    const bookmarkToDelete = document.querySelector('input[type="radio"]:checked');

    if (!bookmarkToDelete) {
        alert('Bookmark not selected')
        return;
    }

    const bookmarks = getBookmarks();
    const index = bookmarks.findIndex(b => b.name === bookmarkToDelete.value && b.category === category)
    if (index === -1) {
        alert('Bookmark not found');
        return;
    }
    bookmarks.splice(index, 1)
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    categoryList.innerHTML = displayBookmarks(bookmarks.filter(b => b.category === category.value)) || '<p>No Bookmarks Found</p>';

})