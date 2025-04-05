const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '1234', // Replace with your MySQL password
    database: 'book_management'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// API route to get all books
app.get('/books', (req, res) => {
    const query = 'SELECT * FROM Books';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// API route to add a book
app.post('/add-book', (req, res) => {
    const { title, author_id, category_id, stock } = req.body;
    const query = 'INSERT INTO Books (title, author_id, category_id, stock) VALUES (?, ?, ?, ?)';
    db.query(query, [title, author_id, category_id, stock], (err) => {
        if (err) throw err;
        res.send('Book added');
    });
});

// API route to add a borrower
app.post('/add-borrower', (req, res) => {
    const { name, email, phone, join_date } = req.body;
    const query = 'INSERT INTO Borrowers (name, email, phone, join_date) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, phone, join_date], (err) => {
        if (err) throw err;
        res.send('Borrower added');
    });
});

// API route to add a transaction
app.post('/add-transaction', (req, res) => {
    const { book_id, borrower_id, borrow_date, return_date } = req.body;
    const query = 'INSERT INTO Transactions (book_id, borrower_id, borrow_date, return_date) VALUES (?, ?, ?, ?)';
    db.query(query, [book_id, borrower_id, borrow_date, return_date], (err) => {
        if (err) throw err;
        res.send('Transaction added');
    });
});

// API route to add a reservation
app.post('/add-reservation', (req, res) => {
    const { book_id, borrower_id, reserve_date, status } = req.body;
    const query = 'INSERT INTO Reservations (book_id, borrower_id, reserve_date, status) VALUES (?, ?, ?, ?)';
    db.query(query, [book_id, borrower_id, reserve_date, status], (err) => {
        if (err) throw err;
        res.send('Reservation added');
    });
});

// API route to add a review
app.post('/add-review', (req, res) => {
    const { book_id, borrower_id, rating } = req.body;
    const query = 'INSERT INTO Reviews (book_id, borrower_id, rating) VALUES (?, ?, ?)';
    db.query(query, [book_id, borrower_id, rating], (err) => {
        if (err) throw err;
        res.send('Review added');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});