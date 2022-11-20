const { EmbedBuilder } = require('discord.js')
const { version } = require('../../package.json')
module.exports = {
    name: 'update',
    aliases: [],
    utilisation: '{prefix}update',

    execute(client, message) {
		const embed = new EmbedBuilder()

        embed.setColor('PURPLE');
        embed.setThumbnail(client.user.displayAvatarURL());
        embed.setTitle('Thông tin phiên bản update mới nhất :')
			
        embed.setDescription('💬Cải thiện thêm trải nghiệm người dùng.'),
        embed.addFields(
            {
                name:'Update Version :',
                value: version,
            },
        )
        
        
        embed.setFooter({text : '💜' , iconURL : message.author.avatarURL({ dynamic: true })});
        
        embed.setTimestamp();

        
        message.channel.send({ embeds: [embed]});
				
    },
    }