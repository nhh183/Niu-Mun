const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'queue',
    aliases: ['q'],
    utilisation: '{prefix}queue',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

 
        if (!queue || !queue.playing) return message.channel.send(`${message.author}, Không có bài hát nào đang được phát. ❌`);

        if (!queue.tracks[0]) return message.channel.send(`${message.author}, Không có bài trong hàng chờ hiện tại. ❌`);

        const embed = new EmbedBuilder();
        const methods = ['🔁', ':repeat_one:'];

        embed.setColor('Purple');
        embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setTitle(`Danh sách phát - ${message.guild.name} ${methods[queue.repeatMode]}`);

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (Thêm bởi <@${track. requestedBy.id}>)`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 20 ? `Và **${songs - 20}** bài hát khác...` : `Có **${songs}** bài hát trong hàng chờ.`;

        embed.setDescription(`Đang phát: \`${queue.current.title}\`\n\n${tracks.slice(0, 20).join('\n')}\n\n${nextSongs }`);

        embed.setTimestamp();
        message.channel.send({ embeds: [embed] });
    },
};