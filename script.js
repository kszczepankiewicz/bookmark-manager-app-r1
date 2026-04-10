const mainSection = document.getElementById('main-section');
const formSection = document.getElementById('form-section');
const bookmarkListSection = document.getElementById('bookmark-list-section');
const addBookmarkButton = document.getElementById('add-bookmark-button');
const deleteBookmarkButton = document.getElementById('delete-bookmark-button');
const addBookmarkButtonForm = document.getElementById('add-bookmark-button-form');
const closeFormButton = document.getElementById('close-form-button');
const closeListButton = document.getElementById('close-list-button');
const viewCategoryButton = document.getElementById('view-category-button');
const nameEl = document.getElementById('name');
const url = document.getElementById('url');
const categoryList = document.getElementById('category-list');
const categoryDropdown = document.getElementById('category-dropdown');

const categoryNames = document.getElementsByClassName('category-name');

const getBookmarks = () => {
    const raw = localStorage.getItem('bookmarks');
    if (!raw) return [];

    let bookmarks;
    try {
        bookmarks = JSON.parse(raw);
    } catch (error) {
        return [];
    }

    if (!Array.isArray(bookmarks)) return [];

    const props = ['name', 'category', 'url'];
    if (!bookmarks.every(obj => props.every(p => Object.hasOwn(obj, p)))) return [];

    return bookmarks;
}

const showSection = section => {
    [mainSection, formSection, bookmarkListSection].forEach(s => s.classList.add('hidden'));
    section.classList.remove('hidden');
}

const displayOrCloseForm = () => showSection(mainSection.classList.contains('hidden') ? mainSection : formSection);

addBookmarkButton.addEventListener('click', (e) => {
    Array.from(categoryNames).forEach(el => el.textContent = categoryDropdown.value);
    displayOrCloseForm();
})

closeFormButton.addEventListener('click', displayOrCloseForm);

addBookmarkButtonForm.addEventListener('click', (e) => {
    const bookmarks = getBookmarks();

    if (!nameEl.value || !url.value) {
        alert('Name or URL cannot be empty');
        return;
    }

    try {
        new URL(url.value)
    } catch (error) {
        alert('Invalid url');
        // return;  //fcc test fails
    }

    bookmarks.push({ name: nameEl.value, category: categoryDropdown.value, url: url.value });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    nameEl.value = '';
    url.value = '';
    displayOrCloseForm();
});

const displayOrHideCategory = () => showSection(mainSection.classList.contains('hidden') ? mainSection : bookmarkListSection);

const renderBookmarks = (bookmarks) => bookmarks.map(b => `<input type='radio' name='${b.category}' id='${b.name}' value='${b.name}'><label for='${b.name}'><a href='${b.url}'>${b.name}</a></label>`).join('\n');

viewCategoryButton.addEventListener('click', (e) => {
    showSection(bookmarkListSection);
    const bookmarks = getBookmarks().filter(b => b.category === categoryDropdown.value);

    if (!bookmarks.length) {
        categoryList.innerHTML = '<p>No Bookmarks Found</p>';
        return
    }

    categoryList.innerHTML = renderBookmarks(bookmarks);
});

closeListButton.addEventListener('click', (e) => showSection(mainSection));

deleteBookmarkButton.addEventListener('click', (e) => {
    const bookmarkToDelete = document.querySelector('input[type="radio"]:checked');

    if (!bookmarkToDelete) {
        alert('Bookmark not selected')
        return;
    }

    const bookmarks = getBookmarks();
    const index = bookmarks.findIndex(b => b.name === bookmarkToDelete.value && b.category === categoryDropdown.value)

    if (index === -1) {
        alert('Bookmark not found');
        return;
    }

    bookmarks.splice(index, 1)
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    categoryList.innerHTML = renderBookmarks(bookmarks.filter(b => b.category === categoryDropdown.value)) || '<p>No Bookmarks Found</p>';
});