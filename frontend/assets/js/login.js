document.getElementById("login-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Basic validation
  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Login successful:", data.body); // Log data for debugging

      // Save token, user info, and role in localStorage
      localStorage.setItem("token", data.body.token);  // Save JWT token
      localStorage.setItem("user", JSON.stringify(data.body)); // Save the full user object

      alert("Login successful!");

      // Redirect based on user role
      if (data.body.role === "admin") {
        window.location.href = "../admin/bookManagement.html"; // Admin dashboard
      } else {
        window.location.href = "../index.html"; // Regular user homepage
      }
    } else {
      alert(`Login failed: ${data.message}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again.");
  }
});
