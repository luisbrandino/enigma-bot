const axios = require('axios');
const fs = require('fs');

const execute = async (message, client, args) => {
    const json = fs.readFileSync(process.cwd() + '/proxies.json', 'utf8');
    const proxies = JSON.parse(json);
    proxyList = `\`\`\`Proxies: (${proxies.length} total)`;
    proxies.forEach(proxy => {
        proxyList+= `\n${proxy.i}:${proxy.p}`
    });
    message.channel.send(proxyList+'```');
}
module.exports = {
    name: 'proxies',
    execute
}