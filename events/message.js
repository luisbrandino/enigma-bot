const { prefix } = require('../config.json');

const msgMax = 3;
const segMax = 25;
    
reqs = {}

module.exports = async (client, message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);
    
    // Anti-spam
    if (!cmd) return;

    id = message.author.id;
    if (!reqs[id]) reqs[id] = [];
    reqs[id] = reqs[id].filter(data=>data>+new Date-(segMax*1000))
    if (reqs[id].length >= msgMax && id != '138391131561000960' && id != '543245463961206789') {
        message.react('🕒');
        message.channel.send(`Sem spam! máximo: ${msgMax}msg/${segMax}s`);
    } else {
        reqs[id].push(+new Date);
        cmd.execute(message, client, args);
    }
}