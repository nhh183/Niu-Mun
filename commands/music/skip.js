module.exports = {
    name: 'skip',
    aliases: ['s'],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);
 
        if (!queue || !queue.playing) return message.channel.send(`${message.author}, Không có bài hát nào đang được phát. ❌`);

        const success = queue.skip();

        return message.channel.send(success ? `Đã bỏ qua bài hát ✅` : `${message.author}, có lỗi gì đó xảy ra ❌`);
    },
};