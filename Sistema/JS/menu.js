const menuName = document.getElementById("menuName");
const menuAvatar = document.getElementById("menuAvatar");
const menuProgressLabel = document.getElementById("menuProgressLabel");
const menuProgressFill = document.getElementById("menuProgressFill");
const menuProgressMessage = document.getElementById("menuProgressMessage");
const simceFolder = document.getElementById("simceFolder");
const simceStatus = document.getElementById("simceStatus");
const simceLock = document.getElementById("simceLock");

const avatarFiles = {
  Avatar1: "Avatar1.jpg",
  Avatar2: "Avatar2.jpg",
  Avatar3: "Avatar3.png",
  Avatar4: "Avatar4.png",
  Avatar5: "Avatar5.jpg"
};

const savedName = localStorage.getItem("misTablas_nombre");
if (savedName) menuName.textContent = savedName;

const savedAvatar = localStorage.getItem("misTablas_avatar");
if (savedAvatar && avatarFiles[savedAvatar]) {
  menuAvatar.src = "IMAGEN/avatares/" + avatarFiles[savedAvatar];
  menuAvatar.alt = "Avatar seleccionado: " + savedAvatar;
}

function refreshMenuProgress() {
  const progress = Math.max(0, Math.min(100, Number(localStorage.getItem("misTablas_progreso") || 0)));
  menuProgressLabel.textContent = progress + "%";
  menuProgressFill.style.width = progress + "%";
  menuProgressMessage.textContent = progress >= 70
    ? "¡Muy bien! Ya alcanzaste el requisito para el ensayo tipo SIMCE."
    : "¡Sigue practicando! Necesitas llegar al 70 % de progreso global para desbloquear el ensayo.";

  const unlocked = progress >= 70 && localStorage.getItem("misTablas_simce_habilitado") === "true";
  simceFolder.classList.toggle("locked", !unlocked);
  simceFolder.setAttribute("aria-disabled", unlocked ? "false" : "true");
  simceLock.textContent = unlocked ? "" : "🔒";
  simceStatus.textContent = unlocked ? "¡Desbloqueado! Entra a tu ensayo" : "Se desbloquea al llegar al 70%";
}

document.querySelectorAll(".folder[data-destination]").forEach(function (folder) {
  folder.addEventListener("click", function () {
    const destination = folder.dataset.destination;
    if (folder.dataset.section === "simce") {
      const progress = Number(localStorage.getItem("misTablas_progreso") || 0);
      const unlocked = progress >= 70 && localStorage.getItem("misTablas_simce_habilitado") === "true";
      if (!unlocked) {
        menuProgressMessage.textContent = "El ensayo sigue bloqueado. Practica las tablas hasta alcanzar el 70 %.";
        simceFolder.classList.add("locked");
        return;
      }
    }
    window.location.href = destination;
  });
});

refreshMenuProgress();
