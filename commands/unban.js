const fs = require('fs');
const allowedIds = ['543245463961206789', '138391131561000960', '261137941177303042'] // hardcoded por enquanto

const execute = async (message, client, args) => {
    const author = message.author;

    if (!allowedIds.includes(author.id)) return message.channel.send('Você não tem permissão');

    const bannedUser = message.mentions.users.first();
    
    let bannedUserId = args[0];
    
    if (bannedUser) bannedUserId = bannedUser.id;
    
    if (!bannedUserId) return message.channel.send('Utilize: !unban <usuário/id>');

    const config = JSON.parse(fs.readFileSync(process.cwd() + '/config.json'));
    const bans = config.bans;

    if (!bans.includes(bannedUserId)) return message.channel.send('Esse usuário não está banido');

    bans.splice(bans.indexOf(bannedUserId), 1);

    config.bans = bans;

    const data = JSON.stringify(config);

    fs.writeFileSync(process.cwd() + '/config.json', data);

    return message.channel.send('Usuário desbanido com sucesso');
}

module.exports = {
    name: 'unban',
    execute
}