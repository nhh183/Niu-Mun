const { ActivityType } = require('discord.js')
module.exports = async (client) => 
{
    console.log(`${client.user.tag} đã sẵn sàng!`);

    client.user.setActivity('!help & !play', { type: ActivityType.Listening });
};