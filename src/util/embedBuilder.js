const hexToInt = require("./hexToInt");

class Embed {

    constructor() {

        this.type = "rich";
        this.fields = [];

    }

    setTitle(title) {

        this.title = title && title.length > 256 ? title.substring(0, 253) + "..." : title;

        return this;

    }

    setDescription(text) {

        this.description = text && text.length > 4096 ? text.substring(0, 4096) + "..." : text;

        return this;

    }

    setURL(url) {

        this.url = url;

        return this;

    }

    setTimestamp(timestamp) {

        if (timestamp)
            this.timestamp = new Date(timestamp * 1000).toISOString();
        else
            this.timestamp = new Date().toISOString();

        return this;

    }

    setColor(colour) {

        if (typeof colour == "string") {

            if (colour[0] == "#")
                colour = colour.substring(1);

            this.color = hexToInt(colour);

        } else if (typeof colour == "number")
            this.color = colour;

        return this;

    }

    setThumbnail(url) {

        this.thumbnail = {
            url: url
        };

        return this;

    }

    setFooter(text, icon) {

        this.footer = {
            text: text && text.length > 2048 ? text.substring(0, 2045) + "..." : text
        };
        if (icon)
            this.footer.icon_url = icon;

        return this;
    }

    setAuthor(name, url, icon_url) {

        this.author = {};

        if (name)
            this.author.name = name;
        if (url)
            this.author.url = url;
        if (icon_url)
            this.author.icon_url = icon_url;

        return this;

    }

    addField(name, value, inline = false) {

        if (this.fields.length == 25)
            return this;

        this.fields.push({
            name: name && name.length > 256 ? name.substring(0, 253) + "..." : name,
            value: value && value.length > 1024 ? value.substring(0, 1021) + "..." : value,
            inline: inline
        });

        return this;

    }

    setImage(url) {

        this.image = {
            url: url
        };

        return this;

    }

    toString() {

        let string = "";

        string += this.title ? `## ${this.title}\n\n` : '';

        string += this.description ? `${this.description}\n\n` : '';

        for (let i = 0; i < this.fields; i++)
            string += this.fields[i].name != "\u200b" ? `**${this.fields[i].name}**:\n${this.fields[i].value}\n` : `${this.fields[i].value}\n`; 

        string += this.footer ? this.footer : '';

        return string;

    }

    toJSON() {

        return {
            title: this.title,
            type: this.type,
            description: this.description,
            url: this.url,
            timestamp: this.timestamp,
            color: this.color,
            footer: this.footer,
            author: this.author,
            fields: this.fields,
            image: this.image,
            thumbnail: this.thumbnail
        };

    }
}

module.exports = Embed;