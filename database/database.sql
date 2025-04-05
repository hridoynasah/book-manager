-- Create the database
CREATE DATABASE IF NOT EXISTS book_management;
SHOW DATABASES;
USE book_management;

-- Create tables
-- Users table for authentication
CREATE TABLE IF NOT EXISTS Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

-- Authors table
CREATE TABLE IF NOT EXISTS Authors (
    author_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_year INT
);

-- Categories table
CREATE TABLE IF NOT EXISTS Categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(200)
);

-- Books table
CREATE TABLE IF NOT EXISTS Books (
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    author_id INT,
    category_id INT,
    stock INT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES Authors(author_id),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

-- Borrowers table
CREATE TABLE IF NOT EXISTS Borrowers (
    borrower_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    join_date DATE
);

-- Transactions table
CREATE TABLE IF NOT EXISTS Transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT,
    borrower_id INT,
    borrow_date DATE,
    return_date DATE,
    FOREIGN KEY (book_id) REFERENCES Books(book_id),
    FOREIGN KEY (borrower_id) REFERENCES Borrowers(borrower_id)
);

-- Publishers table
CREATE TABLE IF NOT EXISTS Publishers (
    publisher_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100)
);

-- Book_Copies table
CREATE TABLE IF NOT EXISTS Book_Copies (
    copy_id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT,
    _condition VARCHAR(50),
    location VARCHAR(50),
    available BOOLEAN,
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);

-- Fines table
CREATE TABLE IF NOT EXISTS Fines (
    fine_id INT PRIMARY KEY AUTO_INCREMENT,
    transaction_id INT,
    amount DECIMAL(5,2),
    paid BOOLEAN,
    FOREIGN KEY (transaction_id) REFERENCES Transactions(transaction_id)
);

-- Reservations table
CREATE TABLE IF NOT EXISTS Reservations (
    reservation_id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT,
    borrower_id INT,
    reserve_date DATE,
    status VARCHAR(20),
    FOREIGN KEY (book_id) REFERENCES Books(book_id),
    FOREIGN KEY (borrower_id) REFERENCES Borrowers(borrower_id)
);

-- Reviews table
CREATE TABLE IF NOT EXISTS Reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT,
    borrower_id INT,
    rating INT,
    FOREIGN KEY (book_id) REFERENCES Books(book_id),
    FOREIGN KEY (borrower_id) REFERENCES Borrowers(borrower_id)
);

-- Insert sample data
-- Sample Users
INSERT INTO Users (username, email, password) VALUES
('admin', 'admin@example.com', 'admin123'),
('user1', 'user1@example.com', 'password123');

-- Sample Categories
INSERT INTO Categories (name, description) VALUES
('Fiction', 'Fictional stories and novels'),
('Non-Fiction', 'Factual books'),
('Science', 'Scientific books and research');

-- Sample Authors
INSERT INTO Authors (first_name, last_name, birth_year) VALUES
('J.K.', 'Rowling', 1965),
('George', 'Orwell', 1903),
('Jane', 'Austen', 1775);

-- Sample Books
INSERT INTO Books (title, author_id, category_id, stock) VALUES
('Harry Potter', 1, 1, 5),
('1984', 2, 1, 3),
('Pride and Prejudice', 3, 1, 4);

-- Sample Borrowers
INSERT INTO Borrowers (name, email, phone, join_date) VALUES
('John Smith', 'john@example.com', '1234567890', '2023-01-01'),
('Jane Doe', 'jane@example.com', '0987654321', '2023-02-15');

-- Sample Transactions
INSERT INTO Transactions (book_id, borrower_id, borrow_date, return_date) VALUES
(1, 1, '2025-03-01', '2025-03-15'),
(2, 2, '2025-03-10', NULL);

-- Sample Publishers
INSERT INTO Publishers (name, location) VALUES
('Penguin Books', 'London'),
('HarperCollins', 'New York');

-- Sample Book Copies
INSERT INTO Book_Copies (book_id, _condition, location, available) VALUES
(1, 'Good', 'Shelf A1', TRUE),
(2, 'Excellent', 'Shelf B2', FALSE);

-- Sample Fines
INSERT INTO Fines (transaction_id, amount, paid) VALUES
(1, 5.00, TRUE),
(2, 10.00, FALSE);

-- Sample Reservations
INSERT INTO Reservations (book_id, borrower_id, reserve_date, status) VALUES
(3, 1, '2025-04-01', 'Pending'),
(1, 2, '2025-04-02', 'Confirmed');
-- Sample Reviews
INSERT INTO Reviews (book_id, borrower_id, rating) VALUES
(1, 1, 5),
(2, 2, 4);
SELECT * FROM users;