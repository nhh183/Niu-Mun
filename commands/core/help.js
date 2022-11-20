const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h'],
    showHelp: false,
    utilisation: '{prefix}help',

    execute(client, message, args) {
        const embed = new EmbedBuilder();

        embed.setColor('Purple');
        embed.setTitle(client.user.username);
        embed.setThumbnail(client.user.displayAvatarURL())
        const commands = client.commands.filter(x => x.showHelp !== false);

        embed.setDescription('Để tìm hiểu bot vui lòng liên hệ Luz :>') ;
        embed.addFields({name : `Có sẵn - ${commands.size} Lệnh có sẵn`, value: commands.map(x => `\`${x.name}${x.aliases[0] ? ` (${x.aliases.map(y => y).join(', ')})\`` : '\`'}`).join(' | ')});
      
        embed.setTimestamp();
      	embed.setFooter({text : '💜'});
        message.channel.send({ embeds: [embed] });
    },
};
