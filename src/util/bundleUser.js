function bundleUser(user) {
    if (!user)
        return undefined;
    const data = {};
    data.id = user.id.toString();
    data.avatar = user.originalAvatarHash;
    data.bot = user.bot;
    data.username = user.username;
    data.discriminator = user.discriminator;
    return data;
}

module.exports = bundleUser;