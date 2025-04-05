# Book Manager

A simple web-based application for managing books, borrowers, transactions, reservations, and reviews in a library-like system. Built with HTML, Tailwind CSS, JavaScript, Node.js, Express, and MySQL, this project is designed for a university course assignment involving a team of 5 members.

## Features
- Add and view books with details like title, author, category, and stock.
- Manage borrowers, including their name, email, phone, and join date.
- Record transactions (borrowing and returning books).
- Handle book reservations with status tracking.
- Allow users to submit reviews with ratings for books.
- Responsive UI using Tailwind CSS.

## Project Structure
```
book-management-system/
├── frontend/                # Front-end files
│   ├── index.html          # Main HTML file with forms and books table
│   └── script.js           # JavaScript for form handling and API calls
├── backend/                # Backend files
│   ├── server.js           # Node.js + Express server with API routes
│   ├── package.json        # Node.js project configuration
│   └── node_modules/       # Installed dependencies (after npm install)
└── database/               # Database-related files
    └── database.sql        # MySQL script to create database and tables
```

## Prerequisites
Before running the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MySQL](https://www.mysql.com/) (v8.0 or higher recommended)
- A web browser (e.g., Chrome, Firefox)
- Git (optional, for cloning the repository)

## Setup Instructions

### 1. Clone the Repository
If you have Git installed, clone the project to your local machine:
```bash
git clone <repository-url>
cd book-manager
```
Alternatively, download the project files manually and extract them to a folder named `book-manager`.

### 2. Set Up the Database
1. Ensure MySQL is installed and running on your system.
2. Open a terminal or MySQL client and run the following command to create the database and tables:
   ```bash
   mysql -u root -pur_password < database/database.sql
   ```
   - Replace `root` with your MySQL username and `ur_password` with your MySQL password if they differ.
   - If you encounter a permission error, log into MySQL first:
     ```bash
     mysql -u root -p
     ```
     Then, source the script:
     ```sql
     SOURCE database/database.sql;
     ```

3. Verify the database:
   - Log into MySQL (`mysql -u root -pur_password`) and run:
     ```sql
     SHOW DATABASES;
     USE book_management;
     SHOW TABLES;
     ```
   - You should see the `book_management` database with 10 tables (e.g., `Books`, `Authors`, etc.).

### 3. Set Up the Backend
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install the required Node.js dependencies:
   ```bash
   npm install
   ```
3. Update the MySQL connection details in `server.js` if your username or password differs:
   ```javascript
   const db = mysql.createConnection({
       host: 'localhost',
       user: 'root', // Your MySQL username
       password: 'ur_password', // Your MySQL password
       database: 'book_management'
   });
   ```
4. Start the server:
   ```bash
   npm start
   ```
   - You should see: `Server running on http://localhost:3000` and `Connected to MySQL database` in the terminal.

### 4. Run the Application
1. Open a web browser and navigate to:
   ```
   http://localhost:3000
   ```
2. The Book Management System interface should load, displaying a table of books and forms to add new entries.

### 5. Using the Application
- **Books List**: Displays all books from the database with their ID, title, author ID, category ID, and stock.
- **Add Book**: Fill in the form with a title, author ID, category ID, and stock, then submit to add a new book.
- **Add Borrower**: Enter a name, email, phone, and join date to register a borrower.
- **Add Transaction**: Record a book borrowing by providing a book ID, borrower ID, borrow date, and optional return date.
- **Add Reservation**: Reserve a book with a book ID, borrower ID, reserve date, and status (e.g., "Pending").
- **Add Review**: Submit a review with a book ID, borrower ID, and rating (1-5).

## Troubleshooting
- **"Cannot GET /" Error**: Ensure the server is running (`npm start` in the `backend` folder) and that the `frontend` folder is correctly placed relative to `server.js`.
- **Database Connection Error**: Verify your MySQL server is running and the credentials in `server.js` match your setup.
- **Blank Books Table**: Check that the database has been populated with sample data from `database.sql` and that the server is connected to MySQL.
- **CORS Issues**: The server already includes CORS middleware, so this shouldn’t occur unless the front-end is served separately (not recommended).

## Notes
- The project uses port `3000` by default. If this port is in use, modify the `app.listen(3000)` line in `server.js` to another port (e.g., `3001`) and update the `fetch` URLs in `script.js` accordingly.
- The database includes sample data for testing. You can add more data via the forms or by modifying `database.sql`.

## Technologies Used
- **Frontend**: HTML, Tailwind CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: MySQL
