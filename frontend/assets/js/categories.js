document.addEventListener("DOMContentLoaded", () => {
  fetchBooks(); // Fetch books when the page loads
});

async function fetchBooks() {
  try {
      const response = await fetch("http://localhost:5000/api/books"); // Adjust the API URL
      const data = await response.json();

      if (data.status === 200) {
          displayBooks(data.body);
      } else {
          console.error("Failed to fetch books:", data.message);
      }
  } catch (error) {
      console.error("Error fetching books:", error);
  }
}

function displayBooks(books) {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = ""; // Clear previous content
  bookList.classList.add("categories-grid"); // Add grid class to the book list

  books.forEach(book => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");

      bookCard.innerHTML = `
          <img src="${book.coverImage}" alt="${book.title}">
          <h3>${book.title}</h3>
          <p><strong>Author:</strong> ${book.author}</p>
          <p><strong>Category:</strong> ${book.category}</p>
          <p><strong>Year:</strong> ${book.year}</p>
          <button onclick="viewBookDetails('${book._id}')">View Details</button>
      `;

      bookList.appendChild(bookCard);
  });
}

function searchBooks() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const books = document.querySelectorAll(".book-card");

  books.forEach(book => {
      const title = book.querySelector("h3").textContent.toLowerCase();
      const author = book.querySelector("p:nth-child(3)").textContent.toLowerCase();
      const category = book.querySelector("p:nth-child(4)").textContent.toLowerCase();
      const year = book.querySelector("p:nth-child(5)").textContent.toLowerCase();

      if (title.includes(query) || author.includes(query) || category.includes(query) || year.includes(query)) {
          book.style.display = "block";
      } else {
          book.style.display = "none";
      }
  });
}

function filterBooks(category) {
  const books = document.querySelectorAll(".book-card");

  books.forEach(book => {
      const bookCategory = book.querySelector("p:nth-child(4)").textContent.split(": ")[1];
      if (category === "all" || bookCategory === category) {
          book.style.display = "block";
      } else {
          book.style.display = "none";
      }
  });

  // Update active button styling
  document.querySelectorAll(".button-value").forEach(button => button.classList.remove("active"));
  document.querySelector(`button[onclick="filterBooks('${category}')"]`).classList.add("active");
}

function viewBookDetails(bookId) {
  window.location.href = `book-details.html?id=${bookId}`;
}
