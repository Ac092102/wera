const ADMIN_PASSWORD = "admin123";

function checkAdminLogin() {
  const input = document.getElementById("adminPassword").value;
  const error = document.getElementById("error");

  if (input === ADMIN_PASSWORD) {
    sessionStorage.setItem("isAdmin", "true");
    showAdminPanel();
  } else {
    error.textContent = "Incorrect password.";
  }
}

function showAdminPanel() {
  document.getElementById("login-section").style.display = "none";
  document.getElementById("admin-section").style.display = "block";
  loadResults();
}

function loadResults() {
  const container = document.getElementById("results-container");
  const data = JSON.parse(localStorage.getItem("quizResults")) || [];

  if (data.length === 0) {
    container.innerHTML = "<p>No results yet.</p>";
    return;
  }

  let html = "<table border='1'><tr><th>Name</th><th>ID</th><th>Grade</th><th>Gender</th><th>Score</th></tr>";
  data.forEach(d => {
    html += `<tr>
      <td>${d.name}</td>
      <td>${d.id}</td>
      <td>${d.grade}</td>
      <td>${d.gender}</td>
      <td>${d.score}/${d.total}</td>
    </tr>`;
  });
  html += "</table>";

  container.innerHTML = html;
}

function clearResults() {
  if (confirm("Are you sure you want to clear all results?")) {
    localStorage.removeItem("quizResults");
    loadResults();
  }
}

// Auto-show admin panel if already logged in
if (sessionStorage.getItem("isAdmin") === "true") {
  showAdminPanel();
}

