CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Store password securely (hashed)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Accounts Table
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('Savings', 'Checking', 'Credit Card', 'Cash')),
    balance DECIMAL(12, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Transactions Table
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    account_id INTEGER REFERENCES Accounts(id) ON DELETE CASCADE,
    amount DECIMAL(12, 2) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('Income', 'Expense')),
    date DATE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Budgets Table (Optional)
CREATE TABLE budgets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES Categories(id) ON DELETE CASCADE,
    amount DECIMAL(12, 2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
