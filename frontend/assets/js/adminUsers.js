// Ensure only admins can access this page
const user = JSON.parse(localStorage.getItem("user"));
if (!user || user.role !== "admin") {
  window.location.href = "../index.html";
}

// DOM Elements
const form = document.getElementById("userForm");
const userList = document.getElementById("userList");
const createUserBtn = document.getElementById("createUserBtn");
const userListSection = document.getElementById("userListSection");
const createUserSection = document.getElementById("createUserSection");
const formTitle = document.getElementById("formTitle");
const searchBar = document.querySelector('.search-bar');
const token = localStorage.getItem("token");
const totalUsersElement = document.getElementById("totalUsers");
const activeTodayElement = document.getElementById("activeToday");

// Event Listeners
createUserBtn.addEventListener("click", showCreateForm);
form.addEventListener("submit", handleFormSubmit);

// Functions
function showCreateForm() {
  form.reset();
  form.userId.value = "";
  formTitle.textContent = "Create New User";
  userListSection.classList.add("hidden");
  createUserSection.classList.remove("hidden");
  searchBar.classList.add('hidden');
  window.scrollTo(0, 0);
}

function showEditForm(user) {
  console.log("Editing user:", user);
  form.userId.value = user._id;
  form.fullName.value = user.fullName;
  form.email.value = user.email;
  form.role.value = user.role;
  form.password.required = false;
  form.password.placeholder = "Leave blank to keep current password";
  formTitle.textContent = "Edit User";
  userListSection.classList.add("hidden");
  createUserSection.classList.remove("hidden");
  searchBar.classList.add('hidden');
  window.scrollTo(0, 0);
}

function cancelForm() {
  userListSection.classList.remove("hidden");
  createUserSection.classList.add("hidden");
  searchBar.classList.remove('hidden');
  form.password.required = true;
  form.password.placeholder = "";
}

async function handleFormSubmit(e) {
  e.preventDefault();
  
  try {
    const userData = {
      fullName: form.fullName.value,
      email: form.email.value,
      role: form.role.value
    };

    if (form.password.value) {
      userData.password = form.password.value;
    }

    const isEdit = !!form.userId.value;
    const url = isEdit
      ? `http://localhost:5000/api/users/${form.userId.value}`
      : "http://localhost:5000/api/users";
    const method = isEdit ? "PUT" : "POST";

    console.log("Submitting form with:", { method, url, userData });

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Request failed");
    }

    const data = await res.json();
    alert(data.message);
    cancelForm();
    loadUsers();
  } catch (error) {
    console.error("Form submission error:", error);
    alert(`Error: ${error.message}`);
  }
}

function searchUsers() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const rows = document.querySelectorAll("#userList tr");

  rows.forEach(row => {
    const fullName = row.cells[1].textContent.toLowerCase();
    const email = row.cells[2].textContent.toLowerCase();
    
    if (fullName.includes(query) || email.includes(query)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

async function loadUsers() {
  try {
    const res = await fetch("http://localhost:5000/api/users", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.message || "Failed to load users");
    }

    renderUserList(data.body);
  } catch (error) {
    console.error("Error loading users:", error);
    alert(error.message);
  }
}

function renderUserList(users) {
  userList.innerHTML = "";
  let totalUsers = 0;
  let activeToday = 0;

  users.forEach((user) => {
    totalUsers++;
    if (Math.random() > 0.5) activeToday++;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${totalUsers}</td>
      <td>${user.fullName}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>
        <button class="action-btn edit-btn" data-id="${user._id}">Edit</button>
        <button class="action-btn delete-btn" data-id="${user._id}">Delete</button>
      </td>
    `;
    userList.appendChild(row);
  });

  // Add event listeners to new buttons
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const user = users.find(u => u._id === btn.dataset.id);
      showEditForm(user);
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteUser(btn.dataset.id));
  });

  totalUsersElement.textContent = totalUsers;
  activeTodayElement.textContent = activeToday;
}

async function deleteUser(userId) {
  const confirmed = confirm("Are you sure you want to delete this user?");
  if (!confirmed) return;

  try {
    const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: "DELETE",
      headers: { 
        Authorization: `Bearer ${token}` 
      }
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete user");

    alert(data.message);
    loadUsers();
  } catch (error) {
    console.error("Error deleting user:", error);
    alert(error.message);
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
  loadUsers();
  searchBar.classList.remove('hidden');
});