const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// Serve static files from the 'frontend' folder
app.use(express.static(path.join(__dirname, '../frontend')));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'Hridoy@1826', // Replace with your MySQL password
    database: 'book_management'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Routes for serving HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.get('/auth', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'auth.html'));
});

// Authentication routes
app.post('/signup', (req, res) => {
    const { username, password, email } = req.body;

    console.log('Signup request received:', { username, email }); // Log incoming request

    // Check if username or email already exists
    const checkQuery = 'SELECT username, email FROM Users WHERE username = ? OR email = ?';
    db.query(checkQuery, [username, email], (err, results) => {
        if (err) {
            console.error('Database error during signup check:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }

        console.log('Signup check results:', results); // Log query results

        if (results.length > 0) {
            const existingUser = results[0];
            if (existingUser.username === username) {
                console.log('Signup failed: Username already exists');
                return res.status(409).json({ success: false, message: 'Username already exists' });
            }
            if (existingUser.email === email) {
                console.log('Signup failed: Email already exists');
                return res.status(409).json({ success: false, message: 'Email already exists' });
            }
        }

        // If no duplicate, insert new user
        const insertQuery = 'INSERT INTO Users (username, password, email) VALUES (?, ?, ?)';
        db.query(insertQuery, [username, password, email], (err, results) => {
            if (err) {
                console.error('Database error during signup insert:', err);
                return res.status(500).json({ success: false, message: 'Server error' });
            }

            console.log('Signup successful:', results); // Log successful insertion
            res.status(201).json({ success: true, message: 'Signup successful' });
        });
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Find user in database
    const query = 'SELECT * FROM Users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Database error during login:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        
        if (results.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
        
        // Login successful
        const user = results[0];
        res.json({ 
            success: true, 
            message: 'Login successful', 
            user: { 
                id: user.user_id, 
                username: user.username, 
                email: user.email 
            } 
        });
    });
});

// API route to get all books
app.get('/books', (req, res) => {
    const query = 'SELECT * FROM Books';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database error fetching books:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        res.json(results);
    });
});

// API route to get a single book by ID
app.get('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const query = 'SELECT * FROM Books WHERE book_id = ?';
    db.query(query, [bookId], (err, results) => {
        if (err) {
            console.error('Database error fetching book:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        
        res.json(results[0]);
    });
});

// API route to add a book
app.post('/add-book', (req, res) => {
    const { title, author_id, category_id, stock } = req.body;
    const query = 'INSERT INTO Books (title, author_id, category_id, stock) VALUES (?, ?, ?, ?)';
    db.query(query, [title, author_id, category_id, stock], (err) => {
        if (err) {
            console.error('Database error adding book:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        res.json({ success: true, message: 'Book added' });
    });
});

// API route to update a book
app.put('/update-book/:id', (req, res) => {
    const bookId = req.params.id;
    const { title, author_id, category_id, stock } = req.body;
    const query = 'UPDATE Books SET title = ?, author_id = ?, category_id = ?, stock = ? WHERE book_id = ?';
    
    db.query(query, [title, author_id, category_id, stock, bookId], (err, result) => {
        if (err) {
            console.error('Database error updating book:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        
        res.json({ success: true, message: 'Book updated successfully' });
    });
});

// API route to delete a book
app.delete('/delete-book/:id', (req, res) => {
    const bookId = req.params.id;
    const query = 'DELETE FROM Books WHERE book_id = ?';
    
    db.query(query, [bookId], (err, result) => {
        if (err) {
            console.error('Database error deleting book:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        
        res.json({ success: true, message: 'Book deleted successfully' });
    });
});

// API route to get all borrowers
app.get('/borrowers', (req, res) => {
    const query = 'SELECT * FROM Borrowers';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database error fetching borrowers:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        res.json(results);
    });
});

// API route to add a borrower
app.post('/add-borrower', (req, res) => {
    const { name, email, phone, join_date } = req.body;
    const query = 'INSERT INTO Borrowers (name, email, phone, join_date) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, phone, join_date], (err) => {
        if (err) {
            console.error('Database error adding borrower:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        res.json({ success: true, message: 'Borrower added' });
    });
});

// API route to get all transactions
app.get('/transactions', (req, res) => {
    const query = 'SELECT * FROM Transactions';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database error fetching transactions:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        res.json(results);
    });
});

// API route to add a transaction
app.post('/add-transaction', (req, res) => {
    const { book_id, borrower_id, borrow_date, return_date } = req.body;
    const query = 'INSERT INTO Transactions (book_id, borrower_id, borrow_date, return_date) VALUES (?, ?, ?, ?)';
    db.query(query, [book_id, borrower_id, borrow_date, return_date], (err) => {
        if (err) {
            console.error('Database error adding transaction:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        res.json({ success: true, message: 'Transaction added' });
    });
});

// API route to get all reservations
app.get('/reservations', (req, res) => {
    const query = 'SELECT * FROM Reservations';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database error fetching reservations:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        res.json(results);
    });
});

// API route to add a reservation
app.post('/add-reservation', (req, res) => {
    const { book_id, borrower_id, reserve_date, status } = req.body;
    const query = 'INSERT INTO Reservations (book_id, borrower_id, reserve_date, status) VALUES (?, ?, ?, ?)';
    db.query(query, [book_id, borrower_id, reserve_date, status], (err) => {
        if (err) {
            console.error('Database error adding reservation:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        res.json({ success: true, message: 'Reservation added' });
    });
});

// API route to get all reviews
app.get('/reviews', (req, res) => {
    const query = 'SELECT * FROM Reviews';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database error fetching reviews:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        res.json(results);
    });
});

// API route to add a review
app.post('/add-review', (req, res) => {
    const { book_id, borrower_id, rating } = req.body;
    const query = 'INSERT INTO Reviews (book_id, borrower_id, rating) VALUES (?, ?, ?)';
    db.query(query, [book_id, borrower_id, rating], (err) => {
        if (err) {
            console.error('Database error adding review:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        res.json({ success: true, message: 'Review added' });
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});