/* i think one process should be able to handle multiple shards (ideally max_concurrency's worth) */
const { BASE_URL, VERSION, NAME, CHANNEL_TYPES } = require("./constants");

const EventsEmitter = require("events");

const BetterRequestHandler = require("./rest/betterRequestHandler");
const WS = require("./gateway/index");

const UserManager = require("./managers/UserManager");
const GuildManager = require("./managers/GuildManager");
const Message = require("./structures/Message");
const bundleGuild = require("./util/bundleGuild");
const Guild = require("./structures/Guild");
const User = require("./structures/User");
const generateWebsocketURL = require("./util/generateWebsocketURL");

/**
 * A client user, which is able to handle multiple shards.
 */
class Client extends EventsEmitter {

    /**
     * Creates the client and sets the default options.
     * @constructor
     * @param {Object?} options The options to pass to the client. 
     */
    constructor({ cacheMessages = false, cacheUsers = false, cacheMembers = false, cacheChannels = false, cacheGuilds = false, cacheVoiceStates = false, cacheRoles = false, intents, totalShards, shardIds, sessionData, initCache } = {}) {

        super();

        this.shards = [];

        /**
         * The Discord API base URL.
         * @type {String}
         */
        this.baseURL = BASE_URL;

        /**
         * The Discord API version to use.
         * @type {String}
         */
        this.version = VERSION;

        /**
         * The name of this lib.
         * @type {String}
         */
        this.name = NAME;

        /**
         * The intents to use when connecting with this client.
         * @type {Number?}
         */
        this.intents = intents;

        /**
         * Whether this client should cache messages.
         * @type {Boolean}
         */
        this.cacheMessages = cacheMessages;

        /**
         * Whether this client should cache users.
         * @type {Boolean}
         */
        this.cacheUsers = cacheUsers;

        /**
         * Whether this client should cache members.
         * @type {Boolean}
         */
        this.cacheMembers = cacheMembers;

        /**
         * Whether this client should cache channels.
         * @type {Boolean}
         */
        this.cacheChannels = cacheChannels;

        /**
         * Whether this client should cache guilds.
         * @type {Boolean}
         */
        this.cacheGuilds = cacheGuilds;

        /**
         * Whether this client should cache voice states.
         * @type {Boolean}
         */
        this.cacheVoiceStates = cacheVoiceStates;

        /**
         * Whether this client should cache roles.
         * @type {Boolean}
         */
        this.cacheRoles = cacheRoles;

        /**
         * An array of the shard ids that this client is handling.
         * @type {Number[]?}
         */
        this.shardIds = shardIds;

        /**
         * The total shards the bot is using.
         * @type {Number?}
         */
        this.totalShards = totalShards;

        this._sessionData = sessionData;

        /**
         * The client user.
         * @type {User?}
         */
        this.user = null;

        if (initCache?.clientUser)
            this.user = new User(this, initCache.clientUser);

        /**
         * The user manager for this client.
         * @type {UserManager}
         */
        this.users = new UserManager(this);

        /**
         * The guild manager for this client.
         * @type {GuildManager}
         */
        this.guilds = new GuildManager(this);

        if (initCache?.guilds)
            for (let i = 0; i < initCache.guilds.length; i++)
                new Guild(this, initCache.guilds[i]);

        this.increasedCache = new Map();
        this.increaseCacheBy = 9;

    }

    bundleCache() {

        const bundle = [];

        for (const guild of this.guilds.cache.values())
            bundle.push(bundleGuild(guild));

        return bundle;

    }

    /**
     * Emits an "error" even with the error provided.
     * @param {String} error The error to emit, as a string.
     */
    error(error) {

        this.emit("error", `\`\`\`js\n${error.substring(0, 4000)}\`\`\``);

    }

    /**
     * Fetches a message from a specific channel.
     * @param {BigInt} guild_id The ID of the guild that the message belongs to.
     * @param {BigInt} channel_id The ID of the channel that the message belongs to.
     * @param {BigInt} message_id The ID of the message to return.
     * @returns {Promise<Message>}
     */
    async fetchMessage(guild_id, channel_id, message_id) {

        try {

            const data = await this.request.makeRequest("getChannelMessage", [channel_id, message_id]);
            return new Message(this, data, channel_id.toString(), guild_id.toString());

        } catch (error) {

            this.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

    /**
     * Posts a webhook with the provided webhook id and token.
     * @param {Object} referenceData An object with the webhook id and token.
     * @param {String?} content The message to send with the webhook.
     * @param {Object?} options Embeds, components and files to attach to the webhook.
     */
    async postWebhook({ id, token }, content, { embeds, components, files } = {}) {

        const body = {};

        if (content)
            body.content = content;

        if (embeds)
            body.embeds = embeds.map(embed => embed.toJSON());
        if (components)
            body.components = components.toJSON();
        if (files)
            body.files = files;

        try {

            await this.request.makeRequest("postExecuteWebhook", [id, token], body);

        } catch (error) {

            this.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

    /**
     * Posts a message to the specified channel.
     * @param {BigInt} channel_id The id of the channel to send the message to.
     * @param {BigInt} guild_id The id of the guild which the channel belongs to.
     * @param {String?} content The message content.
     * @param {Object?} options Embeds, components and files to attach to the message.
     * @returns {Promise<Message>}
     */
    async sendMessage(channel_id, guild_id, content, { embed, embeds, components, files } = {}) {

        const body = {};

        if (content)
            body.content = content;

        if (embed)
            body.embeds = [embed.toJSON()];
        else if (embeds && embeds.length != 0)
            body.embeds = embeds.map(e => e.toJSON());
        if (components)
            body.components = components.toJSON();
        if (files)
            body.files = files;

        try {

            const data = await this.request.makeRequest("postCreateMessage", [channel_id], body);
            return new Message(this, data, channel_id.toString(), guild_id.toString(), false);

        } catch (error) {

            this.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

    /**
     * Edits a specified message.
     * @param {BigInt} channel_id The id of the channel that the message belongs to.
     * @param {BigInt} guild_id The id of the guild that the channel belongs to.
     * @param {BigInt} message_id The id of the message to edit.
     * @param {String?} content The message content.
     * @param {Object?} options Embeds, components and files to attach to the message.
     * @returns {Promise<Message>}
     */
    async editMessage(channel_id, guild_id, message_id, content, { embed, components } = {}) {

        const body = {};

        if (content)
            body.content = content;
        if (embed)
            body.embeds = [embed.toJSON()];
        if (components)
            body.components = components.toJSON();

        if (this.referenced_message)
            body.message_reference = {
                message_id: message_id.toString(),
                channel_id: channel_id.toString(),
                guild_id: guild_id.toString()
            };

        try {

            const data = await this.request.makeRequest("patchEditMessage", [channel_id, message_id], body);
            return new Message(this, data, channel_id, guild_id);

        } catch (error) {

            this.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

    /**
     * Adds a specified channel as a follower to Quark's status channel.
     * @param {BigInt} channel_id The id of the channel to add as a follower.
     */
    async followStatusChannel(channel_id) {

        const body = {};

        body.webhook_channel_id = channel_id;

        try {

            await this.request.makeRequest("postFollowNewsChannel", ["822906135048487023"], body);

        } catch (error) {

            this.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }
    }

    /**
     * Fetches the webhooks for a specified channel.
     * @param {BigInt} channel_id The id of the channel to fetch the webhooks from.
     * @returns {Object[]}
     */
    async fetchChannelWebhooks(channel_id) {

        try {

            const data = await this.request.makeRequest("getChannelWebhooks", [channel_id]);
            return data;

        } catch (error) {

            this.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

    /**
     * Deletes a webhook.
     * @param {BigInt} webhook_id The id of the webhook to delete.
     */
    async deleteWebhook(webhook_id) {

        try {

            await this.request.makeRequest("deleteWebhook", [webhook_id]);

        } catch (error) {

            this.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

    /**
     * Bulk deletes channel messages.
     * @param {BigInt} channel_id The id of the channel to purge messages in.
     * @param {String[]} messages An array of message ids to delete.
     */
    async purgeChannelMessages(channel_id, messages) {

        const body = {};

        body.messages = messages;

        try {

            await this.request.makeRequest("postBulkDeleteMessages", [channel_id], body);

        } catch (error) {

            this.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

    /**
     * Fetches messages from a specified channel.
     * @param {BigInt} guild_id The id of the guild that the channel belongs to.
     * @param {BigInt} channel_id The id of the channel to fetch messages from.
     * @param {Object} options The filter options to determine which messages should be returned.
     * @returns {Message[]}
     */
    async fetchChannelMessages(guild_id, channel_id, { around, before, after, limit }) {

        const body = {};

        if (around)
            body.around = around;

        if (before)
            body.before = before;

        if (after)
            body.after = after;

        if (limit)
            body.limit = limit;

        try {

            const data = await this.request.makeRequest("getChannelMessages", [channel_id], body);
            let messages = [];
            for (let i = 0; i < data.length; i++)
                messages.push(new Message(this, data[i], data[i].channel_id, guild_id));
            return messages;

        } catch (error) {

            this.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

    /**
     * Creates a webhook in the given channel with the name "Quark"
     * @param {BigInt} channel_id The id of the channel to create the webhook in.
     * @returns {Object}
     */
    async createWebhook(channel_id) {

        const body = {};

        body.name = "Quark";

        try {

            const data = await this.request.makeRequest("postCreateWebhook", [channel_id], body);
            return data;

        } catch (error) {

            this.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

    /**
     * Modified a webhook with the given webhook id.
     * @param {BigInt} webhook_id The id of the webhook to modify.
     * @param {Object} options The options to modify the webhook with.
     * @returns {Object}
     */
    async modifyWebhook(webhook_id, { channel_id }) {

        const body = {};

        body.channel_id = channel_id.toString();

        try {

            const data = await this.request.makeRequest("patchModifyWebhook", [webhook_id], body);
            return data;

        } catch (error) {

            this.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

    /**
     * Sets the bot's status across all shards.
     * @param {Object} status Status options.
     */
    setStatus({ name, type, status, afk, since } = {}) {

        for (let i = 0; i < this.shards.length; i++)
            this.shards[i].updatePresence(name, type, status, afk, since);

    }

    /**
     * Initiates the login sequence
     * @param {String} token The authorization token
     */
    login(token) {
        /* sets the token and starts logging the bot in to the gateway, shard by shard */
        this.token = token;

        this.request = new BetterRequestHandler(this, this.baseURL, this.name, this.version, this.token);

        this.request.makeRequest("getGatewayBot")
            .then(gatewayInfo => {

                let remainingSessionStarts = gatewayInfo.session_start_limit.remaining;

                if (!this.shardIds || this.shardIds.length == 0)
                    this.shardIds = [...Array(gatewayInfo.shards).keys()];

                if (!this.totalShards)
                    this.totalShards = gatewayInfo.shards;

                for (let i = 0; i < this.shardIds.length && remainingSessionStarts != 0; i++, remainingSessionStarts--)
                    setTimeout(() => {

                        for (let n = 0; n < gatewayInfo.session_start_limit.max_concurrency; n++)
                            this.shards.push(new WS(this, generateWebsocketURL(this._sessionData ? this._sessionData[i].resumeGatewayUrl : gatewayInfo.url), [this.shardIds[i], this.totalShards], this.intents, this._sessionData ? this._sessionData[i].sessionId : undefined, this._sessionData ? this._sessionData[i].sequence : undefined, this._sessionData ? this._sessionData[i].resumeGatewayUrl : undefined));

                    }, 6000 * i);

                if (this.cacheMessages == true || this.cacheMembers == true || this.cacheUsers == true)
                    setInterval(() => {

                        if (this.cacheMessages == true || this.cacheMembers == true) {

                            const currentTime = Math.floor(new Date().getTime() / 1000);

                            this.guilds.cache.forEach(guild => {

                                if (this.cacheMessages == true) {

                                    this.emit("debug", `Sweeping messages for GUILD ${guild.id}...`);

                                    let cacheCount = guild.calculateMessageCacheCount();
                                    if (this.increasedCache.get(guild.id.toString()))
                                        cacheCount = 0;

                                    this.emit("debug", `Calculated limit of ${cacheCount} per channel for GUILD ${guild.id}...`);

                                    guild.channels.cache.forEach(channel => {

                                        if (channel.type == CHANNEL_TYPES.GUILD_TEXT || channel.type == CHANNEL_TYPES.GUILD_NEWS || channel.type == CHANNEL_TYPES.GUILD_NEWS_THREAD || channel.type == CHANNEL_TYPES.GUILD_PUBLIC_THREAD || channel.type == CHANNEL_TYPES.GUILD_PRIVATE_THREAD) {

                                            this.emit("debug", `Sweeping messages for CHANNEL ${channel.id}...`);

                                            const nowCached = channel.messages.sweepMessages(cacheCount, currentTime);

                                            this.emit("debug", `New cache size of ${nowCached || 0} for CHANNEL ${guild.id}...`);

                                        }

                                    });

                                }

                                if (this.cacheMembers == true) {

                                    this.emit("debug", `Sweeping members for GUILD ${guild.id}...`);

                                    let cacheCount = guild.calculateMemberCacheCount();
                                    if (this.increasedCache.get(guild.id.toString()))
                                        cacheCount *= this.increaseCacheBy;

                                    this.emit("debug", `Calculated limit of ${cacheCount} for GUILD ${guild.id}...`);

                                    this.emit("debug", `Sweeping members for GUILD ${guild.id}...`);

                                    const nowCached = guild.members.sweepMembers(cacheCount);

                                    this.emit("debug", `New cache size of ${nowCached || 0} for GUILD ${guild.id}...`);

                                }

                            });

                        }

                        if (this.cacheUsers == true) {

                            this.emit("debug", "Sweeping users...");

                            const nowCached = this.users.sweepUsers();

                            this.emit("debug", `New user cache size is ${nowCached || 0}...`);

                        }

                    }, 1000 * 60 * 60 * 3); // every 3 hours 1000 * 60 * 60 * 3

            })
            .catch(error => {

                this.error(error.stack.toString());

                this.emit("debug", "Get gateway bot request failed, terminating process");

                process.exit(0);

            });

    }

}

module.exports = Client;