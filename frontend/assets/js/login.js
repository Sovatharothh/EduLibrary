document.getElementById("login-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

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
          localStorage.setItem("token", data.body.token); // Corrected this line
          alert("Login successful!");
          window.location.href = "../index.html";
      } else {
          alert(`Login failed: ${data.message}`);
      }
  } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
  }
});
