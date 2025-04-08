-- Create the database
CREATE DATABASE IF NOT EXISTS book_manager;
SHOW DATABASES;
USE book_management;

-- Hridoy Hasan: Users, Authors, Categories Tables and Operations
-- Create Users table for authentication
CREATE TABLE IF NOT EXISTS Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

-- Create Authors table
CREATE TABLE IF NOT EXISTS Authors (
    author_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_year INT
);

-- Create Categories table
CREATE TABLE IF NOT EXISTS Categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(200)
);


INSERT INTO Users (username, email, password) VALUES
('admin', 'admin@example.com', 'admin123'),
('user1', 'user1@example.com', 'password123');

INSERT INTO Categories (name, description) VALUES
('Fiction', 'Fictional stories and novels'),
('Non-Fiction', 'Factual books'),
('Science', 'Scientific books and research');

INSERT INTO Authors (first_name, last_name, birth_year) VALUES
('J.K.', 'Rowling', 1965),
('George', 'Orwell', 1903),
('Jane', 'Austen', 1775);


ALTER TABLE Users ADD COLUMN last_login DATE; 
UPDATE Authors SET birth_year = 1966 WHERE author_id = 1; 
DELETE FROM Categories WHERE category_id = 2; 
SELECT first_name, last_name FROM Authors WHERE birth_year > 1900; 

-- Md Amirul Islam: Books, Borrowers Tables and Operations
CREATE TABLE IF NOT EXISTS Books (
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    author_id INT,
    category_id INT,
    stock INT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES Authors(author_id),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

CREATE TABLE IF NOT EXISTS Borrowers (
    borrower_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    join_date DATE
);


INSERT INTO Books (title, author_id, category_id, stock) VALUES
('Harry Potter', 1, 1, 5),
('1984', 2, 1, 3),
('Pride and Prejudice', 3, 1, 4);

INSERT INTO Borrowers (name, email, phone, join_date) VALUES
('John Smith', 'john@example.com', '1234567890', '2023-01-01'),
('Jane Doe', 'jane@example.com', '0987654321', '2023-02-15');


ALTER TABLE Books MODIFY COLUMN stock INT DEFAULT 0; 
UPDATE Borrowers SET phone = '5551234567' WHERE borrower_id = 1; 
DELETE FROM Books WHERE book_id = 3; 
SELECT title, stock FROM Books WHERE stock > 3; 

-- MD Rageb Rownok (Rakib): Transactions, Publishers Tables and Operations
CREATE TABLE IF NOT EXISTS Transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT,
    borrower_id INT,
    borrow_date DATE,
    return_date DATE,
    FOREIGN KEY (book_id) REFERENCES Books(book_id),
    FOREIGN KEY (borrower_id) REFERENCES Borrowers(borrower_id)
);

CREATE TABLE IF NOT EXISTS Publishers (
    publisher_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100)
);


INSERT INTO Transactions (book_id, borrower_id, borrow_date, return_date) VALUES
(1, 1, '2025-03-01', '2025-03-15'),
(2, 2, '2025-03-10', NULL);

INSERT INTO Publishers (name, location) VALUES
('Penguin Books', 'London'),
('HarperCollins', 'New York');


ALTER TABLE Transactions ADD COLUMN fine_status VARCHAR(20); 
UPDATE Publishers SET location = 'Toronto' WHERE publisher_id = 1; 
DELETE FROM Transactions WHERE transaction_id = 2; 
SELECT name, location FROM Publishers WHERE location = 'London'; 

-- Sanjina Iftasum Ritu: Book_Copies, Fines Tables and Operations
CREATE TABLE IF NOT EXISTS Book_Copies (
    copy_id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT,
    _condition VARCHAR(50),
    location VARCHAR(50),
    available BOOLEAN,
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);

CREATE TABLE IF NOT EXISTS Fines (
    fine_id INT PRIMARY KEY AUTO_INCREMENT,
    transaction_id INT,
    amount DECIMAL(5,2),
    paid BOOLEAN,
    FOREIGN KEY (transaction_id) REFERENCES Transactions(transaction_id)
);


INSERT INTO Book_Copies (book_id, _condition, location, available) VALUES
(1, 'Good', 'Shelf A1', TRUE),
(2, 'Excellent', 'Shelf B2', FALSE);

INSERT INTO Fines (transaction_id, amount, paid) VALUES
(1, 5.00, TRUE),
(2, 10.00, FALSE);


ALTER TABLE Book_Copies ADD COLUMN last_checked DATE; 
UPDATE Fines SET paid = TRUE WHERE fine_id = 2; 
DELETE FROM Book_Copies WHERE copy_id = 1; 
SELECT amount, paid FROM Fines WHERE paid = FALSE; 

-- Sattik Siraj: Reservations, Reviews Tables and Operations
CREATE TABLE IF NOT EXISTS Reservations (
    reservation_id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT,
    borrower_id INT,
    reserve_date DATE,
    status VARCHAR(20),
    FOREIGN KEY (book_id) REFERENCES Books(book_id),
    FOREIGN KEY (borrower_id) REFERENCES Borrowers(borrower_id)
);

CREATE TABLE IF NOT EXISTS Reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT,
    borrower_id INT,
    rating INT,
    FOREIGN KEY (book_id) REFERENCES Books(book_id),
    FOREIGN KEY (borrower_id) REFERENCES Borrowers(borrower_id)
);


INSERT INTO Reservations (book_id, borrower_id, reserve_date, status) VALUES
(3, 1, '2025-04-01', 'Pending'),
(1, 2, '2025-04-02', 'Confirmed');

INSERT INTO Reviews (book_id, borrower_id, rating) VALUES
(1, 1, 5),
(2, 2, 4);


ALTER TABLE Reservations ADD COLUMN expiry_date DATE; 
UPDATE Reviews SET rating = 3 WHERE review_id = 1; 
DELETE FROM Reservations WHERE reservation_id = 1; 
SELECT rating FROM Reviews WHERE book_id = 2; 