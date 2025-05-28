let student = {
  name: "",
  id: "",
  grade: "",
  gender: ""
};

let currentQuestion = 0;
let score = 0;
let questions = [];

const questionBank = {
  "7": [
    { q: "What is the most common rock on Earth?", a: "Basalt", options: ["Granite", "Limestone", "Basalt", "Marble"] },
    { q: "Which layer of the Earth is liquid?", a: "Outer Core", options: ["Crust", "Inner Core", "Mantle", "Outer Core"] },
    { q: "What is the outermost layer of Earth called?", a: "Crust", options: ["Mantle", "Core", "Crust", "Lithosphere"] },
    { q: "Which rock is formed from sand particles?", a: "Sandstone", options: ["Shale", "Limestone", "Sandstone", "Granite"] },
    { q: "Which mineral is known for its red color?", a: "Hematite", options: ["Quartz", "Hematite", "Calcite", "Gypsum"] }
  ],
  "8": [
    { q: "Which rock is formed from cooled lava?", a: "Igneous", options: ["Sedimentary", "Igneous", "Metamorphic", "Organic"] },
    { q: "What process breaks down rocks?", a: "Weathering", options: ["Melting", "Weathering", "Erosion", "Fossilization"] },
    { q: "What is magma called when it reaches Earth's surface?", a: "Lava", options: ["Basalt", "Lava", "Ash", "Granite"] },
    { q: "Which type of rock forms from heat and pressure?", a: "Metamorphic", options: ["Sedimentary", "Metamorphic", "Igneous", "Volcanic"] },
    { q: "Which mineral is the hardest on the Mohs scale?", a: "Diamond", options: ["Quartz", "Diamond", "Topaz", "Fluorite"] }
  ],
  "9": [
    { q: "What is the Mohs scale used for?", a: "Measuring hardness", options: ["Measuring weight", "Color", "Hardness", "Size"] },
    { q: "Which type of rock can contain fossils?", a: "Sedimentary", options: ["Igneous", "Sedimentary", "Metamorphic", "Basalt"] },
    { q: "What is plate tectonics responsible for?", a: "Earthquakes", options: ["Rain", "Clouds", "Earthquakes", "Magnetism"] },
    { q: "Which boundary causes mountains to form?", a: "Convergent", options: ["Divergent", "Transform", "Convergent", "Passive"] },
    { q: "Which gas is most abundant in volcanic eruptions?", a: "Water vapor", options: ["Carbon dioxide", "Sulfur", "Water vapor", "Oxygen"] }
  ]
};

function goToStudentInfo() {
  student.name = document.getElementById("studentName").value;
  student.id = document.getElementById("studentId").value;

  if (student.name && student.id) {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("student-info-screen").style.display = "block";
  } else {
    alert("Please enter all login info.");
  }
}

function startQuiz() {
  student.grade = document.getElementById("grade").value;
  student.gender = document.getElementById("gender").value;

  if (student.grade && student.gender && questionBank[student.grade]) {
    questions = questionBank[student.grade];
    document.getElementById("student-info-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";
    showQuestion();
  } else {
    alert("Invalid grade or missing info.");
  }
}

function showQuestion() {
  let q = questions[currentQuestion];
  let container = document.getElementById("question-container");
  container.innerHTML = `<p>${q.q}</p>`;
  q.options.forEach((opt, index) => {
    container.innerHTML += `
      <label>
        <input type="radio" name="option" value="${opt}"/> ${opt}
      </label><br/>
    `;
  });
}

function nextQuestion() {
  let selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Please select an answer.");
    return;
  }

  if (selected.value === questions[currentQuestion].a) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "block";
  document.getElementById("result-info").textContent =
    `Name: ${student.name}, ID: ${student.id}, Grade: ${student.grade}, Gender: ${student.gender}`;
  document.getElementById("score-info").textContent =
    `Score: ${score} / ${questions.length}`;
}
