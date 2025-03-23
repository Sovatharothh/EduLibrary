document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    const response = await fetch("http://localhost:5002/login", { // Backend login endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (response.ok) {
      const data = await response.json();
      alert("Login successful!");
      // Store JWT token in localStorage or cookies
      localStorage.setItem("token", data.token);
      window.location.href = "index.html"; // Redirect to homepage after successful login
    } else {
      const errorData = await response.json();
      alert(`Login failed: ${errorData.message}`);
    }
  });
  