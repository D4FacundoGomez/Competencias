// src/ui.js


export async function updateUI(discordSdk, auth) {
    const app = document.querySelector("#app");
    app.innerHTML = `
    <header class="header-container">
      <div class="title-container">
      <h2></h2>
      </div>
    </header>
    <div class="contentUp">
      <h3 class="user-greeting">Identificado como: ${auth?.user?.nickname || auth?.user?.username || "Invitado"}</h3>
    </div>
  `;
    appendVoiceChannelName(discordSdk, auth);
    appendGuildAvatar(discordSdk, auth);
  }
  
  export async function appendVoiceChannelName(discordSdk) {
    const app = document.querySelector("#app");
    let activityChannelName = "Unknown";
  
    if (discordSdk.channelId != null && discordSdk.guildId != null) {
      const channel = await discordSdk.commands.getChannel({ channel_id: discordSdk.channelId });
      if (channel.name != null) {
        activityChannelName = channel.name;
      }
    }
    const textTag = document.createElement("p");
    textTag.textContent = `Cursos de: "${activityChannelName}"`;
    app.appendChild(textTag);
  }
  
export async function appendGuildAvatar(discordSdk, auth) {
    // Se asume que updateUI ya genera un contenedor con clase "header-container"
    const header = document.querySelector("#foot");
    if (!header) {
      console.error("No se encontró el contenedor header");
      return;
    }
    
    const guilds = await fetch(`https://discord.com/api/v10/users/@me/guilds`, {
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    
    const currentGuild = guilds.find((g) => g.id === discordSdk.guildId);
    if (currentGuild != null) {
      const guildImg = document.createElement("img");
      guildImg.src = `https://cdn.discordapp.com/icons/${currentGuild.id}/${currentGuild.icon}.webp?size=128`;
      guildImg.width = 64; // Puedes ajustar el tamaño según tu diseño
      guildImg.height = 64;
      guildImg.alt = "Logo de la Guild";
      guildImg.classList.add("guild-logo");
      // Inserta el logo al inicio del contenedor header para que aparezca a la izquierda
      header.appendChild(guildImg);
      const title = document.querySelector(".title-container");
      if(!title){
    console.error("No se encontró el contenedor titulo");
      return;
      }
    const guildNameWO = document.createElement("h1");
    guildNameWO.textContent = currentGuild.name;
    title.insertBefore(guildNameWO,title.firstChild);
    }
    
    
  }
  