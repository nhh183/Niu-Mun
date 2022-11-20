const { EmbedBuilder} = require('discord.js');
module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    utilisation: '{prefix}nowplaying',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`${message.author}, Không có bài hát nào đang được phát ❌`);

        const track = queue.current;

        const embed = new EmbedBuilder();

        embed.setColor('Purple');
        embed.setThumbnail(track.thumbnail);
        embed.setTitle(track.title)

        const methods = ['disabled', 'track', 'queue'];

        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = timestamp.progress == 'Forever' ? 'Endless (Live)' : track.duration;

        embed.setDescription(`Âm lượng : **%${queue.volume}**\nThời lượng : **${trackDuration}**\nChế độ lặp : **${methods[queue.repeatMode]}**\nThêm bởi : ${track. requestedBy}`);

        embed.setTimestamp();
        embed.setFooter({text : '💜' , iconURL : message.author.avatarURL({ dynamic: true })});
        message.channel.send({ embeds: [embed] });
    },
};