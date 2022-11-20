module.exports = (client, message) => {
    if (message.author.bot) return;

    const prefix = client.config.px;

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
    
    if(!cmd) return;

    if (cmd && cmd.voiceChannel) {
        if (!message.member.voice.channelId) return message.channel.send(`${message.author}, Bạn phải kết nối tới kênh thoại. ❌`);
        if (message.guild.members.me.voice.channelId && message.member.voice.channelId !== message.guild.members.me.voice.channelId) return message.channel.send(`${message.author}, Bạn phải ở cùng kênh thoại để sử dụng lệnh. ❌`);
    }

    if (cmd) cmd.execute(client, message, args);
};