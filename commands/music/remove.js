const { ActionRowBuilder,SelectMenuBuilder } = require('discord.js');

module.exports = {
    name: 'remove',
    aliases: ['rm'],
    utilisation: '{prefix}remove',
    voiceChannel: true,

    execute(client, message,interaction) {
        const queue = client.player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.channel.send(`${message.author}, Không có bài hát nào đang được phát. ❌`);
        const row = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                .setCustomId('remove')
                .setPlaceholder('Choose a song to remove')
                .setMinValues(1)
				.setMaxValues(3)
                .addOptions(queue.tracks.map((track,i) => {
                        return {
                            label : `${i+1}`,
                            description: track.title,
                            value: `${i+1}`,
                        }}).slice(0,10)));
        message.channel.send({content:'Choose a song to remove! ', components: [row] });
    },
};