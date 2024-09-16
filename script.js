const baseURL = "https://api.nytimes.com/svc/books/v3/lists/2019-01-20/hardcover-fiction.json?api-key=QTd4H7HDVpLKhqIqtV42NmAthrt8ub4b";

var booklist = [];

window.onload = () => {
    var fetchButton = document.getElementById("fetchButton");

    fetchButton.addEventListener('click', async () => {
        try {
            document.getElementById("loading").style.display = "block"; // Show loading
            let response = await fetch(baseURL);

            // Check if the request was successful
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let data = await response.json();
            booklist = data.results.books;

            console.log(booklist); // Debugging: Log the book list to check the data

            document.getElementById("loading").style.display = "none"; // Hide loading

            // Clear previous books
            document.getElementById("booklist").innerHTML = '';

            // Display the books
            booklist.forEach((book) => {
                // Create a new book container
                var newbook = document.createElement('div');
                newbook.className = "single-book";

                // Create book image element
                var bookimg = document.createElement('img');
                bookimg.src = book.book_image || 'default-image-url'; // Provide a default image in case book_image is missing
                bookimg.className = "book-image";
                bookimg.width = 100;
                bookimg.height = 100;

                // Create book info container
                var bookinfo = document.createElement('div');
                bookinfo.className = "book-info";

                // Create title element
                var title = document.createElement('div');
                title.className = "book-title";
                title.innerHTML = book.title || 'No Title Available';

                // Create author element
                var author = document.createElement('div');
                author.className = "book-author";
                author.innerHTML = book.author || 'No Author Available';

                // Create description element
                var desc = document.createElement('div');
                desc.className = "book-desc";
                desc.innerHTML = book.description || 'No Description Available';

                // Append title, author, and description to bookinfo
                bookinfo.appendChild(title);
                bookinfo.appendChild(author);
                bookinfo.appendChild(desc);

                // Append book image and bookinfo to the new book div
                newbook.appendChild(bookimg);
                newbook.appendChild(bookinfo);

                // Append the new book to the book list container
                document.getElementById("booklist").appendChild(newbook);
            });

        } catch (error) {
            document.getElementById("loading").style.display = "none"; // Hide loading
            console.error('Error fetching book data:', error);
            alert('Failed to fetch books. Please try again later.');
        }
    });
};
