const axios = require('axios');
const fs = require('fs');

const execute = async (message, client, args) => {
    const proxy = args[0].trim().replace(/[\h\t]+/, ':');

    if (!proxy) return message.channel.send("Utilize: !adicionar <ip>:<porta>");

    const ip = proxy.split(':')[0];
    const port = proxy.split(':')[1];

    if (!ip || !port) return message.channel.send("Utilize: !adicionar <ip>:<porta>");

    if (port < 1 || proxy > 65535) return message.channel.send("Porta inválida");

    const json = fs.readFileSync(process.cwd() + '/proxies.json', 'utf8');
    const proxies = JSON.parse(json);

    if (proxies.filter(x=>x['i']==ip&&x['p']==port).length!==0) {
        message.react('⚠️');
        return;
    }
    
    const axiosConfig = {
        proxy: {
            host: ip,
            port
        },
        timeout: 13000,
        baseURL: 'http://colherelerda.com',
        headers: { 
            'Host': 'www.colherelerda.com',
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36 OPR/69.0.3686.36',
            'Connection': 'keep-alive'
        }, 
    }
    axios.get(`/`, axiosConfig)
        .then(res => { // proxy viva 
            message.react('📥');

            proxies.push({ i: ip, p: port });

            const data = JSON.stringify(proxies);

            fs.writeFileSync(process.cwd() + '/proxies.json', data);
        })
        .catch(err => { // proxy morta
            message.react('📤');
        });
}
module.exports = {
    name: 'adicionar',
    execute
}