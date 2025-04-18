document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    if (!token || token === "null" || token === "undefined") {
      alert("You are not logged in!");
      window.location.href = "../login.html"; 
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/users/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      if (response.ok && data.body) {
        document.getElementById("username").textContent = data.body.fullName;
        document.getElementById("email").textContent = data.body.email;
      } else {
        alert(`Failed to load profile: ${data.message}`);
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
      alert("Error loading profile. Try again later.");
    }
  });
  
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "login.html";
  }
  
  function toggleEdit() {
    document.getElementById("profile-display").style.display = "none";
    document.getElementById("profile-edit").style.display = "block";
  
    const username = document.getElementById("username").textContent;
    const email = document.getElementById("email").textContent;
  
    document.getElementById("edit-username").value = username;
    document.getElementById("edit-email").value = email;
  }
  
  function saveProfile() {
    const updatedUsername = document.getElementById("edit-username").value;
    const updatedEmail = document.getElementById("edit-email").value;
  
    const token = localStorage.getItem("token");
  
    fetch("http://localhost:5000/api/users/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: updatedUsername,
        email: updatedEmail,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 200) {
        alert("Profile updated successfully!");
        document.getElementById("username").textContent = updatedUsername;
        document.getElementById("email").textContent = updatedEmail;
        cancelEdit();
      } else {
        alert("Failed to update profile.");
      }
    })
    .catch((error) => {
      console.error("Error saving profile:", error);
      alert("Failed to save profile.");
    });
  }
  
  function cancelEdit() {
    document.getElementById("profile-display").style.display = "block";
    document.getElementById("profile-edit").style.display = "none";
  }
  