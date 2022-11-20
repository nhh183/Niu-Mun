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
        message.channel.send(success ? `Chế độ tự động phát: **${queue.repeatMode === 0 ? 'Tắt' : 'Bật'}** 🔀 ` : `${message.author}, có lỗi gì đó xảy ra. ❌`);
        
        const player = client.player;
        player.on('trackStart',async (queue, track) => {
            if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
            const embed = new EmbedBuilder();
            embed.setColor('Random');
            embed.setThumbnail(track.thumbnail);
            embed.setTitle(track.title);
            embed.setURL(track.url);
            embed.setDescription(`\`[00:00 / ${track.duration}]\` \n\n Yêu cầu bởi: ${track.requestedBy}`);
            const msg = await queue.metadata.send({ embeds: [embed]});
            setTimeout(() => msg.delete(), track.durationMS );
          });
    }
    }
}
