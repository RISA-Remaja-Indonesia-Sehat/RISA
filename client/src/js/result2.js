document.addEventListener("DOMContentLoaded", () => {
  const result = JSON.parse(localStorage.getItem("quizResult"));
  if (!result) return;

  document.getElementById("score").textContent = `${result.score} / ${result.total}`;
  document.getElementById("points").textContent = result.points;

  const answersContainer = document.getElementById("answers");
  result.answers.forEach((ans) => {
    const item = document.createElement("div");
    item.className = `p-4 rounded-lg mb-3 ${
      ans.isCorrect ? "bg-green-100" : "bg-red-100"
    }`;
    item.innerHTML = `
      <p class="font-semibold">Q${ans.number}: ${ans.question}</p>
      <p class="text-sm">Jawaban kamu: <b>${ans.userAnswer}</b></p>
      <p class="text-sm">Jawaban benar: <b>${ans.correctAnswer}</b></p>
    `;
    answersContainer.appendChild(item);
  });
});
