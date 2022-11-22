const { EmbedBuilder } = require('discord.js')
module.exports = {
    name: 'ping',
    aliases: [],
    utilisation: '{prefix}ping',

    execute(client, message) {
	   	let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;
	    
        const embed = new EmbedBuilder()

        embed.setColor('Purple');
        embed.setTitle('🏓 Pong ')
        embed.addFields(
            { name:'Thời gian hoạt động :', value: `${days}ngày ${hours}giờ ${minutes}phút ${seconds}giây`},
            { name: `🌐 Độ trễ Discord API :`, value: `${Math.round(client.ws.ping)}ms`},
            { name: `🛰️ Độ trễ :`, value: `${Date.now() - message.createdTimestamp}ms`}
        )
        embed.setTimestamp();
        message.channel.send({ embeds: [embed]});
        
    	}
    }