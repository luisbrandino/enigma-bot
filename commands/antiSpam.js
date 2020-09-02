reqs = {}
execute = async (message, client, args) => {
        id = message.author.id;
        const msgMax = 3;
        const segMax = 30;
        if (!reqs[id]) reqs[id] = [];
        reqs[id] = reqs[id].filter(data=>data>+new Date-(segMax*1000))
        if (reqs[id].length >= msgMax) {
            message.react('🕒');
            message.channel.send(`Sem spam! máximo: ${msgMax}msg/${segMax}s`);
        } else {
            reqs[id].push(+new Date);
        }
}

module.exports = {
    name: 'antispam',
    execute
} 