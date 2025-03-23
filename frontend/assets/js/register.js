document.getElementById("register-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/register", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName: name, email, password, confirmPassword }),
    });

    const result = await response.json(); // Parse JSON response

    if (response.ok) {
      alert("Registration successful! Please log in.");
      window.location.href = "login.html"; // Redirect to login page
    } else {
      alert(`Registration failed: ${result.message}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again.");
  }
});
