const {BaseInteraction} = require('discord.js');

module.exports = (client,int) => {
    
    //if(!int.isStringSelectMenu()) return;
    const queue = client.player.getQueue(int.guildId);
    if (int.customId === 'remove') {
        const numb = int.values.map(inter => 
                parseInt(inter));
        console.log(numb)
        for(var vl of numb){
            console.log(vl)
            queue.remove(vl);
        };
		return int.update({ content: `${numb}`, components: [] });
	}



}