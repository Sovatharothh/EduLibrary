// Ensure only admins can access this page
const user = JSON.parse(localStorage.getItem("user"));
console.log(user); // Debugging line to verify user info

if (!user || user.role !== "admin") {
  window.location.href = "../index.html"; // Redirect to homepage if not an admin
}

// DOM Elements
const form = document.getElementById("bookForm");
const preview = document.getElementById("preview");
const bookList = document.getElementById("bookList");
const createBookBtn = document.getElementById("createBookBtn");
const bookListSection = document.getElementById("bookListSection");
const createBookSection = document.getElementById("createBookSection");
const formTitle = document.getElementById("formTitle");
const token = localStorage.getItem("token");
const searchBar = document.querySelector('.search-bar');
const filterButtons = document.getElementById('filter-buttons');

// Event Listeners
createBookBtn.addEventListener("click", showCreateForm);
form.coverImage.addEventListener("change", handleImageUpload);
form.addEventListener("submit", handleFormSubmit);

// Functions
function showCreateForm() {
  form.reset();
  form.bookId.value = "";
  preview.style.display = "none";
  formTitle.textContent = "Create New Book";
  bookListSection.classList.add("hidden");
  createBookSection.classList.remove("hidden");
  searchBar.classList.add('hidden');
  filterButtons.classList.add('hidden');
  window.scrollTo(0, 0);
}

function showEditForm(book) {
  form.bookId.value = book._id;
  form.title.value = book.title;
  form.author.value = book.author;
  form.category.value = book.category;
  form.year.value = book.year;
  form.description.value = book.description;
  form.seeMore.value = book.seeMore || "";
  preview.src = book.coverImage;
  preview.style.display = "block";
  formTitle.textContent = "Edit Book";
  bookListSection.classList.add("hidden");
  createBookSection.classList.remove("hidden");
  searchBar.classList.add('hidden');
  filterButtons.classList.add('hidden');
  window.scrollTo(0, 0);
}

function cancelForm() {
  bookListSection.classList.remove("hidden");
  createBookSection.classList.add("hidden");
  searchBar.classList.remove('hidden');
  filterButtons.classList.remove('hidden');
}

function handleImageUpload() {
  const file = form.coverImage.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      preview.src = reader.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", form.title.value);
  formData.append("author", form.author.value);
  formData.append("category", form.category.value);
  formData.append("year", form.year.value);
  formData.append("description", form.description.value);
  formData.append("seeMore", form.seeMore.value);
  if (form.coverImage.files[0]) {
    formData.append("coverImage", form.coverImage.files[0]);
  }

  const isEdit = !!form.bookId.value;
  const url = isEdit
    ? `http://localhost:5000/api/books/${form.bookId.value}`
    : "http://localhost:5000/api/books";
  const method = isEdit ? "PUT" : "POST";

  try {
    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong");

    alert(isEdit ? "Book updated successfully!" : "Book created successfully!");
    cancelForm();
    loadBooks();
  } catch (error) {
    alert(error.message);
    console.error("Error:", error);
  }
}

// search function
function searchBooks() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const books = document.querySelectorAll(".book-item");

  books.forEach(book => {
    const title = book.querySelector("h3").textContent.toLowerCase();
    const author = book.querySelector("p:nth-of-type(1)").textContent.toLowerCase().replace("author:", "");
    const category = book.querySelector("p:nth-of-type(2)").textContent.toLowerCase().replace("category:", "");
    const year = book.querySelector("p:nth-of-type(3)").textContent.toLowerCase().replace("year:", "");
    const description = book.querySelector("p:nth-of-type(4)").textContent.toLowerCase();

    if (
      title.includes(query) ||
      author.includes(query) ||
      category.includes(query) ||
      year.includes(query) ||
      description.includes(query)
    ) {
      book.style.display = "flex"; 
    } else {
      book.style.display = "none";
    }
  });
}

// filter function
function filterBooks(category) {
  const books = document.querySelectorAll(".book-item");

  books.forEach(book => {
    const bookCategory = book.querySelector("p:nth-of-type(2)").textContent.split(": ")[1].toLowerCase();
    if (category === "all" || bookCategory === category.toLowerCase()) {
      book.style.display = "flex";
    } else {
      book.style.display = "none";
    }
  });

  // Update active button styling
  document.querySelectorAll(".button-value").forEach(button =>
    button.classList.remove("active")
  );
  document.querySelector(`button[onclick="filterBooks('${category}')"]`).classList.add("active");
}

async function loadBooks() {
  try {
    const res = await fetch("http://localhost:5000/api/books");
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to load books");

    bookList.innerHTML = "";
    data.body.forEach((book) => {
      const div = document.createElement("div");
      div.className = "book-item";
      div.innerHTML = `
        <img src="${book.coverImage}" alt="Cover" />
        <div class="info">
          <h3>${book.title}</h3>
          <p><b>Author:</b> ${book.author}</p>
          <p><b>Category:</b> ${book.category}</p>
          <p><b>Year:</b> ${book.year}</p>
          <p>${book.description}</p>
          <div class="actions">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
          </div>
        </div>
      `;

      div.querySelector(".edit").addEventListener("click", () => showEditForm(book));
      div.querySelector(".delete").addEventListener("click", () => deleteBook(book._id));

      bookList.appendChild(div);
    });
  } catch (error) {
    alert(error.message);
    console.error("Error loading books:", error);
  }
}

async function deleteBook(bookId) {
  const confirmed = confirm("Are you sure you want to delete this book?");
  if (!confirmed) return;

  try {
    const res = await fetch(`http://localhost:5000/api/books/${bookId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete book");

    alert("Book deleted successfully!");
    loadBooks();
  } catch (error) {
    alert(error.message);
    console.error("Error deleting book:", error);
  }
}

// Logout function
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "../index.html";
}

// Initialize
window.addEventListener("DOMContentLoaded", () => {
  loadBooks();
  // Ensure search and filter are visible on initial load
  searchBar.classList.remove('hidden');
  filterButtons.classList.remove('hidden');
});