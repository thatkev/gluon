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
    MESSAGE_UPDATE: "messageUpdate",
    MESSAGE_DELETE: "messageDelete",
    GUILD_BAN_ADD: "guildBanAdd",
};
module.exports.CHANNEL_TYPES = {
    GUILD_TEXT: 0,
    GUILD_VOICE: 2,
    GUILD_NEWS: 5,
    GUILD_NEWS_THREAD: 10,
    GUILD_PUBLIC_THREAD: 11,
    GUILD_PRIVATE_THREAD: 12,
    GUILD_STAGE_VOICE: 13
};
module.exports.AUDIT_LOG_TYPES = {
    MESSAGE_DELETE: 72
};
module.exports.INTERACTION_TYPES = {
    COMMAND: 2,
    COMPONENT: 3
};