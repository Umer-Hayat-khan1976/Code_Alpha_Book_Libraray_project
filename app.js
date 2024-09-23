document.addEventListener('DOMContentLoaded', () => {
    const books = [
        { title: '1984', category: 'Fiction', borrowed: false },
        { title: 'Sapiens', category: 'Non-fiction', borrowed: false },
        { title: 'A Brief History of Time', category: 'Science', borrowed: false },
        { title: 'The Art of War', category: 'History', borrowed: false },
        { title: 'The Power of Habit', category: 'Self-Help', borrowed: false },
        { title: 'Thinking, Fast and Slow', category: 'Human-psychology', borrowed: false },
        { title: 'The Hobbit', category: 'Fantasy', borrowed: false },
        { title: 'The Diary of a Young Girl', category: 'Biography', borrowed: false }
        
    ];

    const history = [];

    const booksContainer = document.getElementById('books');
    const historyContainer = document.getElementById('history');
    const searchBook = document.getElementById('searchBook');
    const categoryButtons = document.querySelectorAll('.category');

    // Display books
    function displayBooks(filter = '') {
        booksContainer.innerHTML = '';

        const filteredBooks = books.filter(book => 
            book.category.includes(filter) && !book.borrowed
        );

        filteredBooks.forEach(book => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');
            bookDiv.innerHTML = `<h3>${book.title}</h3><p>Category: ${book.category}</p>
            <button class="borrow-btn">Borrow</button>`;

            bookDiv.querySelector('.borrow-btn').addEventListener('click', () => {
                book.borrowed = true;
                addHistory(book.title);
                displayBooks(filter);
            });

            booksContainer.appendChild(bookDiv);
        });
    }

    // Search book
    searchBook.addEventListener('input', (e) => {
        const searchText = e.target.value.toLowerCase();
        booksContainer.innerHTML = '';

        const filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(searchText) && !book.borrowed
        );

        filteredBooks.forEach(book => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');
            bookDiv.innerHTML = `<h3>${book.title}</h3><p>Category: ${book.category}</p>
            <button class="borrow-btn">Borrow</button>`;

            bookDiv.querySelector('.borrow-btn').addEventListener('click', () => {
                book.borrowed = true;
                addHistory(book.title);
                displayBooks();
            });

            booksContainer.appendChild(bookDiv);
        });
    });

    // Filter books by category
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            displayBooks(category);
        });
    });

    // Add borrowing history
    function addHistory(title) {
        history.push(title);
        historyContainer.innerHTML = '';

        history.forEach(item => {
            const historyItem = document.createElement('li');
            historyItem.textContent = `Borrowed: ${item}`;
            historyContainer.appendChild(historyItem);
        });
    }

    displayBooks();
});
