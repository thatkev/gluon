const { CDN_BASE_URL } = require("../constants");
const User = require("./User");

class Member {

    constructor(client, data, user_id, guild_id, nocache = false) {

        this.client = client;

        if (data.user)
            new User(this.client, data.user, nocache);
        
        this.id = user_id;

        if (data.nick)
            this.nick = data.nick;

        this.joined_at = parseInt(new Date(data.joined_at).getTime() / 1000);

        if (data.pending == false)
            this.pending = data.pending;

        if (data.avatar)
            this.avatar = data.avatar;

        this.user = this.client.users.cache.get(user_id);

        this.guild = this.client.guilds.cache.get(guild_id);

        /* should check whether member actually *needs* to be cached */
        /* only really needed if serverlog or modlog is enabled, otherwise kinda irrelevant */
        if (nocache == false)
            this.client.guilds.cache.get(guild_id).members.cache.set(user_id, this);

    }
    /* https://github.com/discord/discord-api-docs/pull/3081/files 👀 */
    get displayAvatarURL() {

        return this.avatar ? 
            `${CDN_BASE_URL}/guilds/${this.guild.id}/${this.user.id}/avatars/${this.avatar}.png` : 
            this.user.avatar ?
                `${CDN_BASE_URL}/avatars/${this.user.id}/${this.user.avatar}.png` :
                `${CDN_BASE_URL}/embed/avatars/${this.user.discriminator % 5}.png`;

    }

}

module.exports = Member;