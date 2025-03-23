document.addEventListener("DOMContentLoaded", async function () {
    // Fetch featured books from the backend
    const response = await fetch("http://localhost:5000/api/books/featured"); // Replace with your backend endpoint
  
    if (response.ok) {
      const books = await response.json();
      const booksList = document.getElementById("books-list");
  
      books.forEach(book => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book-item");
  
        // Add book image, title, and description
        bookElement.innerHTML = `
          <img src="${book.coverImage}" alt="${book.title}" />
          <h3>${book.title}</h3>
          <p>${book.author}</p>
          <p>${book.shortDescription}</p>
          <a href="book-details.html?bookId=${book._id}" class="btn">View Details</a>
        `;
  
        booksList.appendChild(bookElement);
      });
    } else {
      console.error("Failed to fetch featured books.");
      const booksList = document.getElementById("books-list");
      booksList.innerHTML = "<p>No featured books available at the moment.</p>";
    }
  });
  