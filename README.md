# Book Manager

A web-based application for managing books, borrowers, transactions, reservations, and reviews in a library-like system. Built with HTML, Tailwind CSS, JavaScript, Node.js, Express, and MySQL.

## Features
- Add and view books with details like title, author, category, and stock.
- Manage borrowers, including their name, email, phone, and join date.
- Record transactions (borrowing and returning books).
- Handle book reservations with status tracking.
- Allow users to submit reviews with ratings for books.
- User authentication system to secure access to the application.
- Responsive UI using Tailwind CSS.

## Project Structure
```
book-manager-assistant/
├── frontend/                # Front-end files
│   ├── auth.html           # Authentication page for login/signup
│   ├── books.html          # Books management page
│   ├── borrowers.html      # Borrowers management page
│   ├── index.html          # Main landing page
│   ├── reservations.html   # Reservations management page
│   ├── reviews.html        # Reviews management page
│   ├── script.js           # JavaScript for form handling and API calls
│   └── transactions.html   # Transactions management page
├── backend/                # Backend files
│   ├── server.js           # Node.js + Express server with API routes
│   └── package.json        # Node.js project configuration
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
git clone <https://github.com/hridoynasah/ur-book-manager>
cd ur-book-manager
```
Alternatively, download the project files manually and extract them.

### 2. Set Up the Database
1. Ensure MySQL is installed and running on your system.
2. Open a terminal or MySQL client and run the following command to create the database and tables:
   ```bash
   mysql -u root -p < database/database.sql
   ```
   - Enter your MySQL password when prompted.
   - If you encounter a permission error, log into MySQL first:
     ```bash
     mysql -u root -p
     ```
     Then, source the script:
     ```sql
     SOURCE database/database.sql;
     ```

3. Verify the database is created correctly.

### 3. Set Up the Backend
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install the required Node.js dependencies:
   ```bash
   npm install
   ```
3. Update the MySQL connection details in `server.js` if needed.
4. Start the server:
   ```bash
   npm start
   ```
   - You should see a confirmation that the server is running.

### 4. Run the Application
1. Once the server is running, open a web browser and navigate to:
   ```
   http://localhost:3000
   ```
   (Or the port specified in your server configuration)
   
2. You'll be directed to the authentication page where you can log in to access the application.

### 5. Using the Application
- **Authentication**: Log in or sign up to access the application.
- **Books Management**: View, add, edit, and delete books.
- **Borrowers Management**: Register and manage library members.
- **Transactions**: Record book borrowings and returns.
- **Reservations**: Manage book reservations and their statuses.
- **Reviews**: Submit and view book reviews and ratings.

## Troubleshooting
- **Server Connection Issues**: Ensure the server is running properly in the backend directory.
- **Database Connection Error**: Verify your MySQL server is running and the credentials in `server.js` match your setup.
- **Authentication Problems**: Make sure your login credentials are correct. If you're a new user, sign up first.
- **CORS Issues**: The server should include CORS middleware to handle cross-origin requests.

## Technologies Used
- **Frontend**: HTML, Tailwind CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: MySQL

## License
See the LICENSE file for details.
