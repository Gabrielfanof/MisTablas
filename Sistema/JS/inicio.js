const avatarOptions = document.querySelectorAll(".avatar-option");
const studentNameInput = document.getElementById("studentName");
const enterButton = document.getElementById("enterButton");
const errorMessage = document.getElementById("errorMessage");
let selectedAvatar = null;

avatarOptions.forEach(function (avatar) {
  avatar.addEventListener("click", function () {
    avatarOptions.forEach(function (other) { other.classList.remove("selected"); });
    avatar.classList.add("selected");
    selectedAvatar = avatar.dataset.avatar;
    clearError();
  });
});

studentNameInput.addEventListener("input", clearError);

enterButton.addEventListener("click", function () {
  const studentName = studentNameInput.value.trim();
  if (studentName.length < 2) {
    showError("Escribe tu nombre (al menos 2 caracteres).");
    studentNameInput.focus();
    return;
  }
  if (!selectedAvatar) {
    showError("¡Elige un avatar para comenzar tu aventura!");
    return;
  }
  localStorage.setItem("misTablas_nombre", studentName);
  localStorage.setItem("misTablas_avatar", selectedAvatar);
  window.location.href = "Sistema/index.html";
});

studentNameInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") enterButton.click();
});

function showError(message) {
  errorMessage.textContent = message;
}
function clearError() {
  errorMessage.textContent = "";
}
