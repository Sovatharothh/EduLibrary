// main.js

// Function to load book categories dynamically (Placeholder for later integration with backend)
function loadBookCategories() {
    // Placeholder for fetching book categories from the backend API (once ready)
    fetch('https://yourapi.com/api/categories')
        .then(response => response.json())
        .then(data => {
            const categoriesSection = document.querySelector('.featured-books .book-grid');
            categoriesSection.innerHTML = ""; // Clear previous content

            // Loop through categories and dynamically create HTML
            data.categories.forEach(category => {
                const categoryItem = document.createElement('div');
                categoryItem.classList.add('book-item');
                
                categoryItem.innerHTML = `
                    <img src="${category.imageUrl}" alt="${category.name}">
                    <h3>${category.name}</h3>
                    <p>${category.description}</p>
                    <button onclick="viewCategoryDetails(${category.id})">View Details</button>
                `;
                
                categoriesSection.appendChild(categoryItem);
            });
        })
        .catch(error => console.error('Error loading categories:', error));
}

// Function to handle "View Details" button click (e.g., for a specific category)
function viewCategoryDetails(categoryId) {
    // For now, this will log the category ID (integrate with backend later)
    console.log(`View details for category ID: ${categoryId}`);
    // Redirect to a page with detailed information about the category
    window.location.href = `pages/category-details.html?id=${categoryId}`;
}

// Form validation for newsletter subscription
function validateForm(event) {
    const emailInput = document.querySelector('.newsletter form input');
    const email = emailInput.value;

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        event.preventDefault();
        alert("Please enter a valid email address.");
    }
}

// Event listener for form submission (Newsletter)
const newsletterForm = document.querySelector('.newsletter form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', validateForm);
}

// Call the loadBookCategories function to populate book categories (once the page is loaded)
document.addEventListener('DOMContentLoaded', () => {
    loadBookCategories(); // This will load categories dynamically
});
