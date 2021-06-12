const { CHANNEL_TYPES } = require("../constants");
const Channel = require("./Channel");

class VoiceChannel extends Channel {

    constructor(client, data, guild_id) {

        super(client, data, guild_id);

        if (data.type == CHANNEL_TYPES.GUILD_STAGE_VOICE) 
            this.stage = true;

        this.client.guilds.cache[guild_id].channels.cache[this.id] = this;

    }

}

module.exports = VoiceChannel;