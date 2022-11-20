const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'loop',
    aliases: ['lp'],
    utilisation: '{prefix}loop <queue>',
    voiceChannel: true,

    execute(client, message, args) {
        const queue = client.player.getQueue(message.guild.id);

 
        if (!queue || !queue.playing) return message.channel.send(`${message.author}, Không có bài hát nào đang được phát. ❌`);

        if (args.join('').toLowerCase() === 'queue') 
        {
            if (queue.repeatMode === 1) return message.channel.send(`${message.author}, Cần tắt chế độ lặp của bài hát trước đó **(${client.config.px})** ❌`);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

            return message.channel.send(success ? `Chế độ lặp: **${queue.repeatMode === 0 ? 'Tắt' : 'Bật'}**🔁` : `${message.author}, có lỗi gì đó xảy ra. ❌`);
        }
         else 
        {
            if (queue.repeatMode === 2) return message.channel.send(`${message.author}, Trong chế độ lặp, cần thoát khỏi hàng chờ **(${client.config.px}loop queue)** ❌`);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

            return message.channel.send(success ? `Chế độ lặp: **${queue.repeatMode === 0 ? 'Tắt' : 'Bật'}** :repeat_one: ` : `${message.author}, có lỗi gì đó xảy ra. ❌`);
        };
    },
};