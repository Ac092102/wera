let student = {};
let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Login
function loginStudent() {
  const name = document.getElementById("loginName").value.trim();
  const id = document.getElementById("loginId").value.trim();

  if (!name || !id) {
    alert("Please enter name and ID");
    return;
  }

  document.getElementById("login-section").style.display = "none";
  document.getElementById("info-section").style.display = "block";

  document.getElementById("studentName").value = name;
  document.getElementById("studentId").value = id;
}

//  Start Quiz
function startQuiz() {
  const name = document.getElementById("studentName").value.trim();
  const id = document.getElementById("studentId").value.trim();
  const grade = document.getElementById("studentGrade").value;
  const gender = document.getElementById("studentGender").value;

  if (!name || !id || !grade || !gender) {
    alert("Please fill all fields");
    return;
  }

  student = { name, id, grade, gender };
  questions = questionBank[grade];
  currentQuestionIndex = 0;
  score = 0;

  document.getElementById("info-section").style.display = "none";
  document.getElementById("quiz-section").style.display = "block";

  showQuestion();
}

// Show Question
function showQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById("questionBox").textContent = `Q${currentQuestionIndex + 1}: ${question.q}`;

  const optionsBox = document.getElementById("optionsBox");
  optionsBox.innerHTML = "";

  question.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectAnswer(btn, option);
    optionsBox.appendChild(btn);
  });
}

// Step 4: Select Answer
function selectAnswer(button, selected) {
  const correct = questions[currentQuestionIndex].a;
  const buttons = document.querySelectorAll("#optionsBox button");

  buttons.forEach(btn => {
    btn.disabled = true;
    btn.classList.remove("selected-option");
  });

  button.classList.add("selected-option");

  if (selected === correct) {
    score++;
  }
}

// Next Question or End Quiz
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

// End Quiz & Send to Backend
function endQuiz() {
  document.getElementById("quiz-section").style.display = "none";
  document.getElementById("result-section").style.display = "block";

  document.getElementById("studentDetails").textContent =
    `Name: ${student.name}, ID: ${student.id}, Grade: ${student.grade}, Gender: ${student.gender}`;
  document.getElementById("scoreResult").textContent =
    `Score: ${score} out of ${questions.length}`;

  const submissionData = {
    name: student.name,
    student_id: student.id,
    score: score,
    total: questions.length,
    gender: student.gender
  };

  const submitButton = document.getElementById("submitBtn");
  if (submitButton) submitButton.disabled = true;

  fetch('http://localhost:3000/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submissionData)
  })
  .then(res => res.json())
  .then(res => {
    if (res.message === "Submission saved" || res.message === "Submission saved successfully") {
      console.log("✅ Submission saved successfully.");
    } else {
      alert("❌ Error saving submission: " + (res.error || "Unknown error"));
    }
  })
  .catch(err => {
    console.error("❌ Save error:", err);
    alert("Error connecting to server");
  })
  .finally(() => {
    if (submitButton) submitButton.disabled = false;
  });
}
