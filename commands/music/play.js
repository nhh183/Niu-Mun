const { QueryType } = require('discord-player');

module.exports = {
    name: 'play',
    aliases: ['p'],
    utilisation: '{prefix}play [song name/URL]',
    voiceChannel: true,

    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(`${message.author}, Viết tên bài hát bạn muốn tìm kiếm. ❌`);
        const res = await client.player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });
        if (!res || !res.tracks.length) return message.channel.send(`${message.author}, Không có kết quả được tìm thấy! ❌`);

        const queue = await client.player.createQueue(message.guild,{
            leaveOnEmty : true,
            leaveOnEnd: false,
            leaveOnStop: false,
            metadata: message.channel
        });
        
        try 
        {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } 
        catch
        {
            await client.player.deleteQueue(message.guild.id);
            return message.channel.send(`${message.author}, Không thể tham gia kênh thoại ❌`);
        }

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};