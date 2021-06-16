const { CHANNEL_TYPES, AUDIT_LOG_TYPES } = require("../constants");
const GuildChannelsManager = require("../managers/GuildChannelsManager");
const GuildMemberManager = require("../managers/GuildMemberManager");
const GuildThreadsManager = require("../managers/GuildThreadsManager");
const GuildVoiceStatesManager = require("../managers/GuildVoiceStatesManager");
const AuditLog = require("./AuditLog");
const Member = require("./Member");
const TextChannel = require("./TextChannel");
const Thread = require("./Thread");
const VoiceChannel = require("./VoiceChannel");

class Guild {

    constructor(client, data) {

        this.client = client;

        this.id = data.id;
        // needed for join/leave logging
        this.name = data.name;
        // needed for join/leave logging
        this.icon = data.icon;
        // needed for permissions checking and join/leave logging
        this.owner_id = data.owner_id;
        // useful to see how long a guild keeps the bot for
        this.joined_at = data.joined_at ? parseInt(new Date(data.joined_at).getTime() / 1000) : null;
        // only needed if file logging is enabled
        this.premium_tier = data.premium_tier || 0;

        if (data.unavailable == true)
            this.unavailable = data.unavailable;

        this.member_count = data.member_count || null;

        this.voice_states = new GuildVoiceStatesManager(this.client, data.voice_states);

        this.members = new GuildMemberManager(this.client);

        this.channels = new GuildChannelsManager(this.client, this);

        this.threads = new GuildThreadsManager(this.client);

        this.preferred_locale = data.preferred_locale;

        this.client.guilds.cache.set(this.id, this);


        data.members.map(member => new Member(this.client, member, member.user.id, this.id));

        data.channels.map(channel => {

            switch (channel.type) {

                case CHANNEL_TYPES.GUILD_TEXT: {

                    new TextChannel(this.client, channel, this.id);

                    break;

                }

                case CHANNEL_TYPES.GUILD_VOICE:
                case CHANNEL_TYPES.GUILD_STAGE_VOICE: {

                    new VoiceChannel(this.client, channel, this.id);

                    break;

                }

            }
        });

        data.threads.map(thread => new Thread(this.client, thread, this.id));

    }

    async ban(user_id, options = {}) {
        if (!user_id) throw Error('No userID was provided');
        const body = {};

        if (options.reason) 
            body.reason = options.reason;
        // number of days to delete messages for (0-7) 
        if (options.days) 
            body.delete_message_days;

        try {

            await this.client.request.makeRequest("putCreateGuildBan", [this.id, user_id], body);

        } catch (error) {

            throw error;

        }
    }

    async fetchAuditLogs(options) {

        const body = {};

        if (options.limit)
            body.limit = options.limit;
        else
            body.limit = 1;

        if (options.type)
            body.type = options.type;

        try {

            const data = await this.client.request.makeRequest("getGuildAuditLog", [this.id], body);
            if (options.type && AUDIT_LOG_TYPES[options.type] && data.action_type != AUDIT_LOG_TYPES[options.type])
                return null;
            // currently only one log is ever fetched, but best to make it easy to allow multiple if needed in the future
            return [new AuditLog(this.client, data)];

        } catch (error) {

            throw error;

        }

    }

    async fetchInvites() {

        try {

            const data = await this.client.request.makeRequest("getGuildInvites", [this.id]);
            return data;

        } catch (error) {

            throw error;

        }

    }

}

module.exports = Guild;