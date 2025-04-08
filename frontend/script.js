// Check login status on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check current path to handle authentication
    const currentPath = window.location.pathname;
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const username = localStorage.getItem('username');
    
    // Handle authentication redirects
    if (currentPath === '/' || currentPath === '/index.html') {
        if (!isLoggedIn) {
            window.location.href = '/auth.html';
            return;
        }
        
        // Update username display
        const usernameDisplay = document.getElementById('usernameDisplay');
        if (usernameDisplay && username) {
            usernameDisplay.textContent = username;
        }
        
        // Load data
        fetchBooks();
        fetchBorrowers();
        fetchTransactions();
        fetchReservations();
        fetchReviews();
    } else if ((currentPath === '/auth.html') && isLoggedIn) {
        window.location.href = '/';
        return;
    } else if (currentPath === '/books.html' && isLoggedIn) {
        // Ensure we load books when on the books page
        fetchBooks();
    }
    
    // Set up tab switching in auth.html
    if (currentPath === '/auth.html') {
        // Check if there's a signup success message in URL params
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('signupSuccess') === 'true') {
            document.getElementById('loginMessage').classList.remove('hidden');
            // Remove the query parameter from the URL without reloading the page
            window.history.replaceState({}, document.title, '/auth.html');
        }
    }
});

// Show/hide tabs in the authentication page
function showTab(tabName) {
    // Hide all tabs
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupForm').classList.add('hidden');
    
    // Update tab button styles
    document.getElementById('loginTab').classList.remove('text-blue-600', 'border-b-2', 'border-blue-500');
    document.getElementById('loginTab').classList.add('text-gray-600');
    document.getElementById('signupTab').classList.remove('text-blue-600', 'border-b-2', 'border-blue-500');
    document.getElementById('signupTab').classList.add('text-gray-600');
    
    // Show selected tab and update button style
    if (tabName === 'login') {
        document.getElementById('loginForm').classList.remove('hidden');
        document.getElementById('loginTab').classList.remove('text-gray-600');
        document.getElementById('loginTab').classList.add('text-blue-600', 'border-b-2', 'border-blue-500');
    } else {
        document.getElementById('signupForm').classList.remove('hidden');
        document.getElementById('signupTab').classList.remove('text-gray-600');
        document.getElementById('signupTab').classList.add('text-blue-600', 'border-b-2', 'border-blue-500');
    }
}

// Login handler
function login(event) {
    event.preventDefault();
    
    // Hide any previous error messages
    document.getElementById('loginError').classList.add('hidden');
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            // Store login info in localStorage
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('username', data.user.username);
            localStorage.setItem('userId', data.user.id);
            
            // Redirect to home page
            window.location.href = '/';
        } else {
            document.getElementById('loginError').classList.remove('hidden');
        }
    })
    .catch(error => {
        console.error('Error logging in:', error);
        document.getElementById('loginError').classList.remove('hidden');
    });
}

// Signup handler
function signup(event) {
    event.preventDefault();
    
    // Hide any previous error messages
    document.getElementById('signupError').classList.add('hidden');
    
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    console.log('Signup form submitted:', { username, email, password }); // Log form data
    
    fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => {
        console.log('Signup response status:', response.status); // Log response status
        if (!response.ok) {
            if (response.status === 409) {
                throw new Error('Username or email already exists');
            }
            throw new Error('Signup failed');
        }
        return response.json();
    })
    .then(data => {
        console.log('Signup response data:', data); // Log response data
        if (data.success) {
            // Redirect to login page with success message
            window.location.href = '/auth.html?signupSuccess=true';
        } else {
            document.getElementById('signupError').classList.remove('hidden');
        }
    })
    .catch(error => {
        console.error('Error signing up:', error);
        document.getElementById('signupError').classList.remove('hidden');
    });
}

// Logout handler
function logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    window.location.href = '/auth.html';
}

// Fetch and display books
function fetchBooks() {
    fetch('/books')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('booksTable');
            if (!tableBody) return; // Exit if not on books page
            
            tableBody.innerHTML = '';
            
            if (data.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">No books found</td></tr>';
                return;
            }
            
            data.forEach(book => {
                tableBody.innerHTML += `
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap">${book.book_id}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${book.title}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${book.author_id}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${book.category_id}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${book.stock}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <button onclick="openEditModal(${book.book_id})" class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-1">
                                Edit
                            </button>
                            <button onclick="openDeleteModal(${book.book_id})" class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">
                                Delete
                            </button>
                        </td>
                    </tr>`;
            });
        })
        .catch(error => {
            console.error('Error fetching books:', error);
            const tableBody = document.getElementById('booksTable');
            if (tableBody) {
                tableBody.innerHTML = '<tr><td colspan="6" class="px-6 py-4 text-center text-red-500">Error loading books</td></tr>';
            }
        });
}

// Edit modal functions for books
function openEditModal(bookId) {
    fetch(`/books/${bookId}`)
        .then(response => response.json())
        .then(book => {
            document.getElementById('edit_book_id').value = book.book_id;
            document.getElementById('edit_title').value = book.title;
            document.getElementById('edit_author_id').value = book.author_id;
            document.getElementById('edit_category_id').value = book.category_id;
            document.getElementById('edit_stock').value = book.stock;
            
            document.getElementById('editBookModal').classList.remove('hidden');
        })
        .catch(error => {
            console.error('Error fetching book details:', error);
            alert('Error loading book details. Please try again.');
        });
}

function closeEditModal() {
    document.getElementById('editBookModal').classList.add('hidden');
}

// Delete modal functions for books
let bookToDelete = null;

function openDeleteModal(bookId) {
    bookToDelete = bookId;
    document.getElementById('deleteConfirmModal').classList.remove('hidden');
}

function closeDeleteModal() {
    document.getElementById('deleteConfirmModal').classList.add('hidden');
    bookToDelete = null;
}

// Add book
function addBook(event) {
    event.preventDefault();
    
    const book = {
        title: document.getElementById('title').value,
        author_id: document.getElementById('author_id').value,
        category_id: document.getElementById('category_id').value,
        stock: document.getElementById('stock').value
    };
    
    fetch('/add-book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Reset form and refresh book list
            event.target.reset();
            fetchBooks();
        } else {
            alert('Error adding book: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error adding book:', error);
        alert('Error adding book. Please try again.');
    });
}

// Event listeners for book edit/delete buttons
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the books page
    if (window.location.pathname === '/books.html') {
        // Add event listeners for the edit form submission
        const editForm = document.getElementById('editBookForm');
        if (editForm) {
            editForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                const bookId = document.getElementById('edit_book_id').value;
                const book = {
                    title: document.getElementById('edit_title').value,
                    author_id: document.getElementById('edit_author_id').value,
                    category_id: document.getElementById('edit_category_id').value,
                    stock: document.getElementById('edit_stock').value
                };
                
                fetch(`/update-book/${bookId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(book)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        closeEditModal();
                        fetchBooks(); // Refresh the book list
                        alert('Book updated successfully!');
                    } else {
                        alert('Error updating book: ' + data.message);
                    }
                })
                .catch(error => {
                    console.error('Error updating book:', error);
                    alert('Error updating book. Please try again.');
                });
            });
        }
        
        // Add event listener for the delete button
        const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
        if (confirmDeleteBtn) {
            confirmDeleteBtn.addEventListener('click', function() {
                if (!bookToDelete) return;
                
                fetch(`/delete-book/${bookToDelete}`, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(data => {
                    closeDeleteModal();
                    if (data.success) {
                        fetchBooks(); // Refresh the book list
                        alert('Book deleted successfully!');
                    } else {
                        alert('Error deleting book: ' + data.message);
                    }
                })
                .catch(error => {
                    console.error('Error deleting book:', error);
                    alert('Error deleting book. Please try again.');
                    closeDeleteModal();
                });
            });
        }
    }
});

// Fetch and display borrowers
function fetchBorrowers() {
    fetch('/borrowers')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('borrowersTable');
            tableBody.innerHTML = '';
            
            if (data.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="5" class="px-6 py-4 text-center text-gray-500">No borrowers found</td></tr>';
                return;
            }
            
            data.forEach(borrower => {
                tableBody.innerHTML += `
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap">${borrower.borrower_id}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${borrower.name}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${borrower.email}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${borrower.phone}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${borrower.join_date}</td>
                    </tr>
                `;
            });
        })
        .catch(error => {
            console.error('Error fetching borrowers:', error);
            const tableBody = document.getElementById('borrowersTable');
            tableBody.innerHTML = '<tr><td colspan="5" class="px-6 py-4 text-center text-red-500">Error loading borrowers</td></tr>';
        });
}

// Add borrower
function addBorrower(event) {
    event.preventDefault();
    
    const borrower = {
        name: document.getElementById('b_name').value,
        email: document.getElementById('b_email').value,
        phone: document.getElementById('b_phone').value,
        join_date: document.getElementById('join_date').value
    };
    
    fetch('/add-borrower', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(borrower)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Reset form and refresh borrower list
            event.target.reset();
            fetchBorrowers();
        } else {
            alert('Error adding borrower: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error adding borrower:', error);
        alert('Error adding borrower. Please try again.');
    });
}

// Fetch and display transactions
function fetchTransactions() {
    fetch('/transactions')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('transactionsTable');
            tableBody.innerHTML = '';
            
            if (data.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="5" class="px-6 py-4 text-center text-gray-500">No transactions found</td></tr>';
                return;
            }
            
            data.forEach(transaction => {
                tableBody.innerHTML += `
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap">${transaction.transaction_id}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${transaction.book_id}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${transaction.borrower_id}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${transaction.borrow_date}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${transaction.return_date || 'Not returned'}</td>
                    </tr>
                `;
            });
        })
        .catch(error => {
            console.error('Error fetching transactions:', error);
            const tableBody = document.getElementById('transactionsTable');
            tableBody.innerHTML = '<tr><td colspan="5" class="px-6 py-4 text-center text-red-500">Error loading transactions</td></tr>';
        });
}

// Add transaction
function addTransaction(event) {
    event.preventDefault();
    
    const transaction = {
        book_id: document.getElementById('t_book_id').value,
        borrower_id: document.getElementById('t_borrower_id').value,
        borrow_date: document.getElementById('borrow_date').value,
        return_date: document.getElementById('return_date').value || null
    };
    
    fetch('/add-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Reset form and refresh transaction list
            event.target.reset();
            fetchTransactions();
        } else {
            alert('Error adding transaction: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error adding transaction:', error);
        alert('Error adding transaction. Please try again.');
    });
}

// Fetch and display reservations
function fetchReservations() {
    fetch('/reservations')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('reservationsTable');
            tableBody.innerHTML = '';
            
            if (data.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="5" class="px-6 py-4 text-center text-gray-500">No reservations found</td></tr>';
                return;
            }
            
            data.forEach(reservation => {
                tableBody.innerHTML += `
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap">${reservation.reservation_id}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${reservation.book_id}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${reservation.borrower_id}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${reservation.reserve_date}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${reservation.status}</td>
                    </tr>
                `;
            });
        })
        .catch(error => {
            console.error('Error fetching reservations:', error);
            const tableBody = document.getElementById('reservationsTable');
            tableBody.innerHTML = '<tr><td colspan="5" class="px-6 py-4 text-center text-red-500">Error loading reservations</td></tr>';
        });
}

// Add reservation
function addReservation(event) {
    event.preventDefault();
    
    const reservation = {
        book_id: document.getElementById('r_book_id').value,
        borrower_id: document.getElementById('r_borrower_id').value,
        reserve_date: document.getElementById('reserve_date').value,
        status: document.getElementById('status').value
    };
    
    fetch('/add-reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservation)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Reset form and refresh reservation list
            event.target.reset();
            fetchReservations();
        } else {
            alert('Error adding reservation: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error adding reservation:', error);
        alert('Error adding reservation. Please try again.');
    });
}

// Fetch and display reviews
function fetchReviews() {
    fetch('/reviews')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('reviewsTable');
            tableBody.innerHTML = '';
            
            if (data.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="4" class="px-6 py-4 text-center text-gray-500">No reviews found</td></tr>';
                return;
            }
            
            data.forEach(review => {
                tableBody.innerHTML += `
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap">${review.review_id}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${review.book_id}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${review.borrower_id}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${review.rating}</td>
                    </tr>
                `;
            });
        })
        .catch(error => {
            console.error('Error fetching reviews:', error);
            const tableBody = document.getElementById('reviewsTable');
            tableBody.innerHTML = '<tr><td colspan="4" class="px-6 py-4 text-center text-red-500">Error loading reviews</td></tr>';
        });
}

// Add review
function addReview(event) {
    event.preventDefault();
    
    const review = {
        book_id: document.getElementById('rev_book_id').value,
        borrower_id: document.getElementById('rev_borrower_id').value,
        rating: document.getElementById('rating').value
    };
    
    fetch('/add-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Reset form and refresh review list
            event.target.reset();
            fetchReviews();
        } else {
            alert('Error adding review: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error adding review:', error);
        alert('Error adding review. Please try again.');
    });
}