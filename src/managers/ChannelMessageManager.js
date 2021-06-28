const { DEFAULT_MESSAGE_EXPIRY_SECONDS } = require("../constants");
const Message = require("../structures/Message");

class ChannelMessageManager {

    constructor(client, channel) {

        this.client = client;

        this.channel = channel;

        this.cache = new Map();

    }

    async fetch(options) {

        if (typeof options == "object") {

            const body = {};

            if (options.around)
                body.around = options.around;

            if (options.before)
                body.before = options.before;

            if (options.after)
                body.after = options.after;

            if (options.limit)
                body.limit = options.limit;

            try {

                const data = await this.client.request.makeRequest("getChannelMessages", [this.channel.id], body);
                let messages = [];
                for (let i = 0; i < data.length; i++)
                    messages.push(new Message(this.client, data[i], data[i].channel_id, this.channel.guild.id.toString()));
                return messages;

            } catch (error) {

                this.client.error(error.stack.toString());
                throw error;

            }

        } else if (typeof options == "string") {

            const cachedMessage = this.channel.cache.get(options);
            if (cachedMessage)
                return cachedMessage;

            try {

                const data = await this.client.request.makeRequest("getChannelMessage", [this.channel.id, options]);
                return new Message(this.client, data, this.channel);

            } catch (error) {

                this.client.error(error.stack.toString());
                throw error;

            }

        }

    }

    sweepMessages(cacheCount, currentTime) {

        if (this.cache.size == 0)
            return;

        let counter = this.cache.size;

        const newCache = new Map();

        this.cache.forEach((message, id) => {

            if (message.timestamp + DEFAULT_MESSAGE_EXPIRY_SECONDS > currentTime && counter <= cacheCount) {

                newCache.set(id, message);

            }

            counter--;

        });

        this.cache = newCache;

        return this.cache.size;

    }

}

module.exports = ChannelMessageManager;