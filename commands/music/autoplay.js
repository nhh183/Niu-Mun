const { QueueRepeatMode } = require('discord-player')
const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'autoplay',
    aliases: [],
    utilisation: '{prefix}autoplay',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.channel.send(`${message.author}, Không có bài hát nào đang được phát. ❌`);

        const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.AUTOPLAY : QueueRepeatMode.OFF);
        if(success){ 
        return message.channel.send(success ? `Chế độ tự động phát: **${queue.repeatMode === 0 ? 'Tắt' : 'Bật'}** 🔀 ` : `${message.author}, có lỗi gì đó xảy ra. ❌`);
    }
    }
}
