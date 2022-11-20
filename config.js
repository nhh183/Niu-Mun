module.exports = {
    px: '!',
    botToken : '',
    opt: {
        maxVol: 250,
        loopMessage: false, 
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio', 
                highWaterMark: 1 << 25 
            }
        }
    }
};
