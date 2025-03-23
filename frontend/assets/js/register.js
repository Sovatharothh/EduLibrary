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
  
    const response = await fetch("http://localhost:5001/register", { // Backend register endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
  
    if (response.ok) {
      alert("Registration successful! Please log in.");
      window.location.href = "login.html"; // Redirect to login page after successful registration
    } else {
      const errorData = await response.json();
      alert(`Registration failed: ${errorData.message}`);
    }
  });
  