const hexToInt = require("./hexToInt");

class Embed {

    constructor() {

        this.type = "rich";
        this.fields = [];

    }

    setTitle(title) {

        this.title = title;

        return this;

    }

    setDescription(text) {

        this.description = text;

        return this;

    }

    setURL(url) {

        this.url = url;

        return this;

    }

    setTimestamp(timestamp) {

        this.timestamp = new Date(timestamp * 1000).toISOString();

        return this;

    }

    setColor(hex) {

        if (hex[0] == "#")
            hex.slice(0, 1);
        
        this.color = hexToInt(hex);

        return this;

    }

    setFooter(text, icon) {

        this.footer = {
            text: text
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

        this.fields.push({
            name: name,
            value: value,
            inline: inline
        });

        return this;

    }

    toJSON() {

        return {
            title: this.title,
            type: this.type,
            description: this.description,
            url: this.url,
            timestemp: this.timestamp,
            color: this.color,
            footer: this.footer,
            author: this.author,
            fields: this.fields
        };

    }
}

module.exports = Embed;