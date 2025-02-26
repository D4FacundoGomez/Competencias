// src/main.js
import rocketLogo from "/rocket.png";
import "./style.css";

import { setupDiscordSdk } from "./discordAuth.js";
import { updateUI } from "./ui.js";
import { dotenv } from "dotenv";
import { Client, GatewayIntentBits } from 'discord.js';
dotenv.config({ path: "../.env" });

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

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'addcursecomplete') {
    const curse = interaction.options.getString('curso');
    const usuario = interaction.options.getUser('usuario');
    await interaction.reply(`Se ha marcado la maldición **${curse}** como completada ${usuario ? `para ${usuario.username}` : ''}.`);
  } else if (interaction.commandName === 'motivarultimo') {
    await interaction.reply('¡Ánimo! Este mensaje de motivación es para ti.');
  }
});

// Conectar el bot
client.login(process.env.BOT_CLIENT_TOKEN);
