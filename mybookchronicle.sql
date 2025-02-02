-- Step 1: Create the database
CREATE DATABASE mybookchronicle;

-- Step 2: Connect to the database
\c mybookchronicle;

-- Step 3: Create the books table
CREATE TABLE readbookslist (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    dateread DATE,
    isbn VARCHAR(13) UNIQUE NOT NULL,
    personalnote TEXT,
    rating INT CHECK (rating >= 1 AND rating <= 10)
);

-- Step 4: Insert initial data
INSERT INTO readbookslist (title, author, dateread, isbn, personalnote, rating) VALUES
('Life's Amazing Secrets: How to Find Balance and Purpose in Your Life', 'Gaur Gopal Das', '2025-01-10', '9780143442295', 'Very helpful for guidance about life', 10),
('Rich Dad Poor Dad', 'Robert T. Kiyosaki', '2023-08-19', '9781612680194', '', 9),
('The Alchemist', 'Paulo Coelho', '2022-05-15', '9780062315007', 'A great read about following your dreams.', 10),
('Becoming', 'Michelle Obama', '2021-11-12', '9781524763138', 'Inspiring story of resilience and hope.', 9),
('The Great Gatsby', 'F. Scott Fitzgerald', '2023-01-20', '9780743273565', 'A classic tale of love and ambition.', 8),
('1984', 'George Orwell', '2022-09-30', '9780451524935', 'A thought-provoking dystopian novel.', 9),
('To Kill a Mockingbird', 'Harper Lee', '2023-03-15', '9780061120084', 'A powerful story about justice and morality.', 10),
('The Catcher in the Rye', 'J.D. Salinger', '2023-07-22', '9780316769488', 'A deep dive into teenage angst.', 7),
('The Power of Habit', 'Charles Duhigg', '2023-02-10', '9780812981605', 'Insightful book on habits and change.', 8),
('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', '2023-04-05', '9780062316097', 'An engaging overview of human history.', 9);

-- Step 5: Query the data
SELECT * FROM books;