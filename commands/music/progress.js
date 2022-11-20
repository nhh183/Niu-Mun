module.exports = {
    name: 'progress',
    aliases: ["time"],
    utilisation: '{prefix}progress',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`${message.author}, Không có bài hát nào đang được phát. ❌`);

        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();

        if (timestamp.progress == 'Infinity') return message.channel.send(`Bài hát này được phát trực tiếp, không có dữ liệu thời lượng để hiển thị. 🎧`);

        message.channel.send(`${progress} (**${timestamp.progress}**%)`);
    },
};