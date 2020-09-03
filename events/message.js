const config = require('../config.json');

reqs = {}

module.exports = async (client, message) => {
    const { prefix, antispam } = require('../config.json');
    const msgMax = parseInt(antispam.split('/')[0]);
    const segMax = parseInt(antispam.split('/')[1]);

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);
    
    // Anti-spam
    if (!cmd) return;

    const author = message.author;

    if (config.bans.includes(author.id)) return message.react('🚫');

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