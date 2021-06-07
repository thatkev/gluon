module.exports.BASE_URL = 'https://discord.com/api';
module.exports.CDN_BASE_URL = "https://cdn.discordapp.com";
module.exports.VERSION = 9;
module.exports.NAME = "gluon";
module.exports.INTENTS = {
    GUILDS: 0,
    GUILD_MEMBERS: 1,
    GUILD_BANS: 2,
    GUILD_EMOJIS: 3,
    GUILD_INTEGRATIONS: 4,
    GUILD_WEBHOOKS: 5,
    GUILD_INVITES: 6,
    GUILD_VOICE_STATES: 7,
    GUILD_PRESENCES: 8,
    GUILD_MESSAGES: 9,
    GUILD_MESSAGE_REACTIONS: 10,
    GUILD_MESSAGE_TYPING: 11,
    DIRECT_MESSAGES: 12,
    DIRECT_MESSAGE_REACTIONS: 13,
    DIRECT_MESSAGE_TYPING: 14
};
module.exports.CALCULATED_INTENTS = (0b1 << this.INTENTS.GUILDS) |
    (0b1 << this.INTENTS.GUILD_MEMBERS) |
    (0b1 << this.INTENTS.GUILD_BANS) |
    (0b1 << this.INTENTS.GUILD_INVITES) |
    (0b1 << this.INTENTS.GUILD_VOICE_STATES) |
    (0b1 << this.INTENTS.GUILD_MESSAGES);
module.exports.EVENTS = {
    READY: "ready",
    MESSAGE_CREATE: "messageCreate",
    MESSAGE_UPDATE: "messageUpdate"
};