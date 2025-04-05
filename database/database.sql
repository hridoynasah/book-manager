-- Create the database
-- CREATE DATABASE book_management;
-- DROP DATABASE book_management;
USE book_management;

-- Create tables (2 per team member, total 10)
CREATE TABLE Books (
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    author_id INT,
    category_id INT,
    stock INT NOT NULL
);

CREATE TABLE Authors (
    author_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_year INT
);

CREATE TABLE Borrowers (
    borrower_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    join_date DATE
);

CREATE TABLE Categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(200)
);

CREATE TABLE Transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT,
    borrower_id INT,
    borrow_date DATE,
    return_date DATE
);

CREATE TABLE Publishers (
    publisher_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100)
);

CREATE TABLE Book_Copies (
    copy_id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT,
    _condition VARCHAR(50),
    location VARCHAR(50),
    available BOOLEAN
);

CREATE TABLE Fines (
    fine_id INT PRIMARY KEY AUTO_INCREMENT,
    transaction_id INT,
    amount DECIMAL(5,2),
    paid BOOLEAN
);

CREATE TABLE Reservations (
    reservation_id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT,
    borrower_id INT,
    reserve_date DATE,
    status VARCHAR(20)
);

CREATE TABLE Reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT,
    borrower_id INT,
    rating INT
);

-- Insert sample data (2-3 rows per table)
INSERT INTO Books (title, author_id, category_id, stock) VALUES
('The Great Gatsby', 1, 1, 5),
('1984', 2, 2, 3),
('To Kill a Mockingbird', 3, 1, 4);

INSERT INTO Authors (first_name, last_name, birth_year) VALUES
('F. Scott', 'Fitzgerald', 1896),
('George', 'Orwell', 1903),
('Harper', 'Lee', 1926);

INSERT INTO Borrowers (name, email, phone, join_date) VALUES
('John Doe', 'john@example.com', '1234567890', '2023-01-01'),
('Jane Smith', 'jane@example.com', '0987654321', '2023-02-15');

INSERT INTO Categories (name, description) VALUES
('Fiction', 'Fictional stories and novels'),
('Dystopia', 'Books about dystopian societies');

INSERT INTO Transactions (book_id, borrower_id, borrow_date, return_date) VALUES
(1, 1, '2025-03-01', '2025-03-15'),
(2, 2, '2025-03-10', NULL);

INSERT INTO Publishers (name, location) VALUES
('Scribner', 'New York'),
('Secker & Warburg', 'London');

INSERT INTO Book_Copies (book_id, _condition, location, available) VALUES
(1, 'Good', 'Shelf A1', TRUE),
(2, 'Worn', 'Shelf B2', FALSE);

INSERT INTO Fines (transaction_id, amount, paid) VALUES
(1, 5.00, TRUE),
(2, 10.00, FALSE);

INSERT INTO Reservations (book_id, borrower_id, reserve_date, status) VALUES
(3, 1, '2025-04-01', 'Pending'),
(1, 2, '2025-04-02', 'Confirmed');

INSERT INTO Reviews (book_id, borrower_id, rating) VALUES
(1, 1, 4),
(2, 2, 5);