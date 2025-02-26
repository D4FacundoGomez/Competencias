// filepath: /Users/admin/Desktop/Data Junkies/apps/Competencias/client/main.js
// src/main.js

import rocketLogo from "./rocket.png";
import "./style.css";

import { setupDiscordSdk } from "./discordAuth.js";
import { updateUI } from "./ui.js";
import { renderDashboard } from "./dashboard.js";

// Mostrar contenido inicial (por ejemplo, logo y título)
document.querySelector("#app").innerHTML = `
  <div>
    <img src="${rocketLogo}" class="logo" alt="Discord" />
    <h1>Competencia...!</h1>
  </div>
`;

async function init() {
  try {
    const { discordSdk, auth } = await setupDiscordSdk();
    console.log("Discord SDK is authenticated");
    await updateUI(discordSdk, auth);

    // Puedes llamar a renderDashboard(discordSdk) cuando sea necesario
  } catch (error) {
    console.error("Error en la inicialización:", error);
  }
}

init();