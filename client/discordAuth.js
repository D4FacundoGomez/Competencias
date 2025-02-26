// src/discordAuth.js
import { DiscordSDK } from "@discord/embedded-app-sdk";

export async function setupDiscordSdk() {
  const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);
  await discordSdk.ready();
  console.log("Discord SDK is ready");


  const { code } = await discordSdk.commands.authorize({
    client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
    response_type: "code",
    state: "",
    prompt: "none",
    scope: [
      "identify",
      "guilds",
      "guilds.members.read",
      "applications.commands",
    ],
  });

  const response = await fetch("/.proxy/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });

  const { access_token } = await response.json();

  const auth = await discordSdk.commands.authenticate({ access_token });
  const memberInfo = await fetch(
    `https://discord.com/api/v10/users/@me/guilds/${discordSdk.guildId}/member`,
    { headers: { Authorization: `Bearer ${auth.access_token}` } }
  ).then((res) => res.json());

  auth.user.nickname = memberInfo.nick;
  if (!auth || !auth.user) {
    throw new Error("Falló la autenticación");
  }
  console.log("Usuario autenticado:", auth.user.username);
  return { discordSdk, auth };
}
