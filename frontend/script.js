// Fetch and display books when page loads
document.addEventListener('DOMContentLoaded', fetchBooks);

// Handle form submissions
document.getElementById('bookForm').addEventListener('submit', addBook);
document.getElementById('borrowerForm').addEventListener('submit', addBorrower);
document.getElementById('transactionForm').addEventListener('submit', addTransaction);
document.getElementById('reservationForm').addEventListener('submit', addReservation);
document.getElementById('reviewForm').addEventListener('submit', addReview);

// Fetch all books from the backend
function fetchBooks() {
    fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('booksTable');
            tableBody.innerHTML = ''; // Clear table
            data.forEach(book => {
                const row = `<tr>
                    <td class="p-2">${book.book_id}</td>
                    <td class="p-2">${book.title}</td>
                    <td class="p-2">${book.author_id}</td>
                    <td class="p-2">${book.category_id}</td>
                    <td class="p-2">${book.stock}</td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error('Error fetching books:', error));
}

// Add a new book
function addBook(event) {
    event.preventDefault();
    const book = {
        title: document.getElementById('title').value,
        author_id: document.getElementById('author_id').value,
        category_id: document.getElementById('category_id').value,
        stock: document.getElementById('stock').value
    };
    fetch('http://localhost:3000/add-book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    }).then(() => {
        fetchBooks(); // Refresh the table
        event.target.reset(); // Clear form
    }).catch(error => console.error('Error adding book:', error));
}

// Add a new borrower
function addBorrower(event) {
    event.preventDefault();
    const borrower = {
        name: document.getElementById('b_name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        join_date: document.getElementById('join_date').value
    };
    fetch('http://localhost:3000/add-borrower', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(borrower)
    }).then(() => event.target.reset()).catch(error => console.error('Error adding borrower:', error));
}

// Add a new transaction
function addTransaction(event) {
    event.preventDefault();
    const transaction = {
        book_id: document.getElementById('t_book_id').value,
        borrower_id: document.getElementById('t_borrower_id').value,
        borrow_date: document.getElementById('borrow_date').value,
        return_date: document.getElementById('return_date').value || null
    };
    fetch('http://localhost:3000/add-transaction', { // Fixed from 'Fuente://'
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
    }).then(() => event.target.reset()).catch(error => console.error('Error adding transaction:', error));
}

// Add a new reservation
function addReservation(event) {
    event.preventDefault();
    const reservation = {
        book_id: document.getElementById('r_book_id').value,
        borrower_id: document.getElementById('r_borrower_id').value,
        reserve_date: document.getElementById('reserve_date').value,
        status: document.getElementById('status').value
    };
    fetch('http://localhost:3000/add-reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservation)
    }).then(() => event.target.reset()).catch(error => console.error('Error adding reservation:', error));
}

// Add a new review
function addReview(event) {
    event.preventDefault();
    const review = {
        book_id: document.getElementById('rev_book_id').value,
        borrower_id: document.getElementById('rev_borrower_id').value,
        rating: document.getElementById('rating').value
    };
    fetch('http://localhost:3000/add-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    }).then(() => event.target.reset()).catch(error => console.error('Error adding review:', error));
}