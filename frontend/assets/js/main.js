
// Function to handle "View Details" button click (e.g., for a specific category)
function viewCategoryDetails(categoryId) {
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
