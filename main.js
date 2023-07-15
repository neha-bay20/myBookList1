//Book class:represents a book
class book {
    constructor(title, author, address, ibsn) {
        this.title = title;
        this.author = author;
        this.address = address;
        this.ibsn = ibsn;

    }
}

//UI class: handle the UI
class UI {
    static displayBooks() {
        const books = store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book) {
        console.log(book.title);
        let list = document.querySelector('#book-list');

        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.ibsn}</td>
        <td>${book.address}</td>
        <td><a href = "#" class ="btn btn-warning btn-sm delete">X</a></td>
        `;
        // console.log(book.title);

        list.appendChild(row);
        //console.log(list);
    }

    static deletebook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // disappear in 4 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 4000);


    }

    static clearField() {
        document.querySelector('#author').value = '';
        document.querySelector('#ibsn').value = '';
        document.querySelector('#address').value = '';
    }
}

//Store class: Handle Storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;

    }
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }
    static removeBook(ibsn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.ibsn === ibsn) {
                books.splice(index, 1);

            }
        });
        localStorage.setItem('books', JSON.stringify(books));

    }
}

//Event:display books

document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event:add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {

    //prevent actual submit
    e.preventDefault();

    //Get form value
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const ibsn = document.querySelector('#ibsn').value;
    const address = document.querySelector('#address').value;

    //Validate
    if (title === '' || author === '' || ibsn === '' || address === '') {
        UI.showAlert('please fill in all fields', 'danger');
    } else {
        //instatiate book
        const Book = new book(title, author, address, ibsn);

        //Add book to UI
        UI.addBookToList(Book);

        //Add book to store
        store.addBook(book);

        //showcase success message
        UI.showAlert('Book Added', 'success');


        //clear fields
        UI.clearField();

    }
});

// Event:remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {

    // console.log(e.target)
    UI.deletebook(e.target);

    //remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //show success message
    UI.showAlert('Book Removed', 'success');
});







