module.exports = {
    name: 'stop',
    aliases: ['sp'],
    utilisation: '{prefix}stop',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`${message.author}, Không có bài hát nào đang được phát. ❌`);

        queue.destroy();
        message.guild.members.me.voice.disconnect();
        message.channel.send(`Đã dừng bài hát ✅`);
    },
};