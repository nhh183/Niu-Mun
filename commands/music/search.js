const { EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'search',
    aliases: [],
    utilisation: '{prefix}search [song name]',
    voiceChannel: true,

    async execute(client, message, args) {
      
    if (!args[0]) return message.channel.send(`${message.author}, Vui lòng nhập tên bài hát ❌`);

        const res = await client.player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send(`${message.author}, Không có kết quả được tìm thấy ❌`);

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel
        });

        const embed = new EmbedBuilder();

        embed.setColor('Random');
        embed.setTitle(`Bài hát được tìm thấy: ${args.join(' ')}`);

        const maxTracks = res.tracks.slice(0, 10);

        embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\nChọn một bài hát từ **1** tới **${maxTracks.length}** gõ **send** để gửi hoặc gõ **cancel** để hủy lựa chọn.⬇️`);

        embed.setTimestamp();
        embed.setFooter({text : '💜'});

        message.channel.send({ embeds: [embed] });

        const collector = message.channel.createMessageCollector({
            time: 15000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

       collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel') return message.channel.send(`Đã hủy. ✅`) && collector.stop();

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) return message.channel.send(`Lỗi: Chọn một bài hát từ **1** tới **${maxTracks.length}** gõ **send** để gửi hoặc gõ **cancel** để hủy lựa chọn. ❌`);

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await client.player.deleteQueue(message.guild.id);
                return message.channel.send(`${message.author}, Không thể tham gia kênh thoại ❌`);
            }

            const load = await message.channel.send(`Đang load... 🎧`);
            setTimeout(() => load.delete(),5000);

            queue.addTrack(res.tracks[Number(query.content)-1]);
            if (!queue.playing) await queue.play();
           
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return message.channel.send(`${message.author}, Đã hết thời gian tìm kiếm ❌`);
        });
    },
};