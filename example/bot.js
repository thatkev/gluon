import Client from "../src/Client.js";
import { BUTTON_STYLES, INTENTS } from "../src/constants.js";
import ActionRow from "../src/util/builder/actionRowBuilder.js";
import Button from "../src/util/builder/buttonBuilder.js";
import Embed from "../src/util/builder/embedBuilder.js";
import FileUpload from "../src/util/builder/fileUpload.js";
import MessageComponents from "../src/util/builder/messageComponents.js";
const client = new Client({
  cacheGuilds: true,
  cacheMessages: true,
  cacheUsers: true,
  cacheMembers: true,
  cacheChannels: true,
  cacheVoiceStates: true,
  cacheRoles: true,
  cacheEmojis: true,
  intents: INTENTS.GUILDS | INTENTS.GUILD_MESSAGES | INTENTS.MESSAGE_CONTENT,
});

client._defaultGuildCacheOptions.setChannelCaching(true);
client._defaultGuildCacheOptions.setRoleCaching(true);

client.on("ready", () => {
  console.log("ready");
  console.log(client.user);
  client.guilds.forEach((guild) => {
    guild._cacheOptions.setChannelCaching(true);
    guild._cacheOptions.setEmojiCaching(true);
    guild._cacheOptions.setRoleCaching(true);
    guild._cacheOptions.setMessageCaching(true);
    guild._cacheOptions.setFileCaching(true);
    guild._cacheOptions.setMemberCaching(true);
    guild._cacheOptions.setVoiceStateCaching(true);
    guild._cacheOptions.setScheduledEventCaching(true);
    guild._cacheOptions.setInviteCaching(true);
  });
});

client.on("raw", (raw) => {
  // console.log("raw");
  // console.log(raw);
});

client.on("debug", (data) => {
  // console.log("debug");
  console.log(data);
});

client.on("messageCreate", (message) => {
  console.log("messageCreate");
  console.log(message);
  // console.log(message.toJSON());
  if (message.author.bot == true) return;
  console.log(message.content);
  if (message.content == "button") {
    const actionRow = new ActionRow();
    const button = new Button()
      .setLabel("button")
      .setStyle(BUTTON_STYLES.PRIMARY)
      .setCustomID(message.guild.id.toString());
    actionRow.addComponent(button);
    const messageComponents = new MessageComponents().addActionRow(actionRow);
    message
      .reply("button", {
        components: messageComponents,
      })
      .then((m) => {
        console.log(m);
      })
      .catch((e) => {
        console.error(e);
      });
  }
  if (message.content == "embed") {
    const embed = new Embed()
      .setTitle("hello?")
      .setColor("5865F2")
      .setDescription("hello world!");
    message.channel.send("", {
      embeds: [embed],
    });
  }
  if (message.content == "file") {
    const file = new FileUpload().setName("file.txt").setStream("hello world!");
    message.channel.send("", {
      files: [file],
    });
  }
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  console.log("messageUpdate");
  console.log(oldMessage?.content);
  console.log(newMessage?.content);
});

client.on("messageDelete", (message) => {
  console.log("messageDelete");
  console.log(message?.content);
});

client.login("ODQ5NzM0MjM0MzM5NjcyMDg0.YLferA.RYFIAP-qz_U-wJB-qXmTD87p5gA");
client.on("buttonClick", (interaction) => {
  console.log("buttonClick");
  console.log(interaction);
  interaction.reply("hello world!", { quiet: true });
});
