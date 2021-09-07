/* of course, stick to this format of "methodPath1Path2" */
/* the arguments passed to the path() function should simply become the parameters of the request */
/* for example, (guild_id) => { return `/guilds/${guild_id}` } */
/* though in terms of ratelimiting, we may need to figure something out since i think the bucket id can even change depending on what exactly the request is doing? */
/* as in, deleting older messages has a lower ratelimit (and therefore different bucket id) compared with deleting newer messages, or so i have heard */
/* will need to verify and figure something out if this is the case */
/* perhaps could just have some function which takes this into account? /shrug */
module.exports = {
    getGatewayBot: {
        path: () => {
            return "/gateway/bot";
        },
        method: "GET",
        majorParams: []
    },
    postCreateMessage: {
        path: ([channel_id]) => {
            return `/channels/${channel_id}/messages`;
        },
        method: "POST",
        majorParams: [0]
    },
    patchEditMessage: {
        path: ([channel_id, message_id]) => {
            return `/channels/${channel_id}/messages/${message_id}`;
        },
        method: "PATCH",
        majorParams: [0]
    },
    putCreateGuildBan: {
        path: ([guild_id, user_id]) => {
            return `/guilds/${guild_id}/bans/${user_id}`;
        },
        method: "PUT",
        majorParams: [0]
    },
    getGuildAuditLog: {
        path: ([guild_id]) => {
            return `/guilds/${guild_id}/audit-logs`;
        },
        method: "GET",
        majorParams: [0]
    },
    getChannel: {
        path: ([channel_id]) => {
            return `/channels/${channel_id}`;
        },
        method: "GET",
        majorParams: [0]
    },
    getChannelMessages: {
        path: ([channel_id]) => {
            return `/channels/${channel_id}/messages`;
        },
        method: "GET",
        majorParams: [0]
    },
    getChannelMessage: {
        path: ([channel_id, message_id]) => {
            return `/channels/${channel_id}/messages/${message_id}`;
        },
        method: "GET",
        majorParams: [0]
    },
    getGuildInvites: {
        path: ([guild_id]) => {
            return `/guilds/${guild_id}/invites`;
        },
        method: "GET",
        majorParams: [0]
    },
    postInteractionResponse: {
        path: ([interaction_id, interaction_token]) => {
            return `/interactions/${interaction_id}/${interaction_token}/callback`;
        },
        method: "POST",
        majorParams: []
    },
    patchOriginalInteractionResponse: {
        path: ([interaction_id, interaction_token]) => {
            return `/webhooks/${interaction_id}/${interaction_token}/messages/@original`;
        },
        method: "PATCH",
        majorParams: [0, 1]
    },
    postBulkDeleteMessages: {
        path: ([channel_id]) => {
            return `/channels/${channel_id}/messages/bulk-delete`;
        },
        method: "POST",
        majorParams: [0]
    },
    postExecuteWebhook: {
        path: ([webhook_id, webhook_token]) => {
            return `/webhooks/${webhook_id}/${webhook_token}`;
        },
        method: "POST",
        majorParams: [0, 1]
    },
    getGuildChannels: {
        path: ([guild_id]) => {
            return `/guilds/${guild_id}/channels`;
        },
        method: "GET",
        majorParams: [0]
    },
    postFollowNewsChannel: {
        path: ([channel_id]) => {
            return `/channels/${channel_id}/followers`;
        },
        method: "POST",
        majorParams: [0]
    },
    getGuildMember: {
        path: ([guild_id, user_id]) => {
            return `/guilds/${guild_id}/members/${user_id}`;
        },
        method: "GET",
        majorParams: [0]
    },
    getGuildBan: {
        path: ([guild_id, user_id]) => {
            return `/guilds/${guild_id}/bans/${user_id}`;
        },
        method: "GET",
        majorParams: [0]
    },
    deleteGuildMember: {
        path: ([guild_id, user_id]) => {
            return `/guilds/${guild_id}/members/${user_id}`;
        },
        method: "DELETE",
        majorParams: [0]
    },
    deleteRemoveGuildBan: {
        path: ([guild_id, user_id]) => {
            return `/guilds/${guild_id}/bans/${user_id}`;
        },
        method: "DELETE",
        majorParams: [0]
    },
    putAddGuildMemberRole: {
        path: ([guild_id, user_id, role_id]) => {
            return `/guilds/${guild_id}/members/${user_id}/roles/${role_id}`;
        },
        method: "PUT",
        useHeaders: true,
        majorParams: [0]
    },
    deleteRemoveMemberRole: {
        path: ([guild_id, user_id, role_id]) => {
            return `/guilds/${guild_id}/members/${user_id}/roles/${role_id}`;
        },
        method: "DELETE",
        useHeaders: true,
        majorParams: [0]
    },
    getUser: {
        path: ([user_id]) => {
            return `/users/${user_id}`;
        },
        method: "GET",
        majorParams: []
    },
    getChannelWebhooks: {
        path: ([channel_id]) => {
            return `/channels/${channel_id}/webhooks`;
        },
        method: "GET",
        majorParams: [0]
    },
    deleteWebhook: {
        path: ([webhook_id]) => {
            return `/webhooks/${webhook_id}`;
        },
        method: "DELETE",
        majorParams: [0]
    },
    getSearchGuildMembers: {
        path: ([guild_id]) => {
            return `/guilds/${guild_id}/members/search`;
        },
        method: "GET",
        majorParams: [0]
    },
    postCreateWebhook: {
        path: ([channel_id]) => {
            return `/channels/${channel_id}/webhooks`;
        },
        method: "POST",
        majorParams: [0]
    },
    patchModifyWebhook: {
        path: ([webhook_id]) => {
            return `/webhooks/${webhook_id}`;
        },
        method: "PATCH",
        majorParams: [0]
    },
    deleteLeaveGuild: {
        path: ([guild_id]) => {
            return `/users/@me/guilds/${guild_id}`;
        },
        method: "DELETE",
        majorParams: [0]
    }
};