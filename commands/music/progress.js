module.exports = {
    name: 'progress',
    aliases: ["time"],
    utilisation: '{prefix}progress',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`${message.author}, Không có bài hát nào đang được phát. ❌`);

        const progress = queue.createProgressBar({
            timecodes :true,
            length: 8 
        });
        const timestamp = queue.getPlayerTimestamp();

        if (timestamp.progress == 'Infinity') return message.channel.send(`Bài hát này được phát trực tiếp, không có dữ liệu thời lượng để hiển thị. 🎧`);

        await message.channel.send(progress)
                    .then((msg) => {
                        var inl = setInterval(() => {
                            if(queue.streamTime == (queue.current.durationMS - 2000)){clearInterval(inl)};
                            let progress1 = queue.createProgressBar({
                                timecodes :true,
                                length: 8 
                            });
                            msg.edit(progress1)
                    }, 1000).then((mse) => {mse.delete()})
                });
    },
};