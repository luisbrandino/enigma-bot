const FormData = require("form-data")
const axios = require('axios');
const qs = require('qs')
const fs = require('fs');
const proxies = require('../proxies.json');

const enigmaUrl = 'http://colherelerda.com/';
const enigmaPath = '/chr/f/g.php';

const execute = async (message, client, args) =>  {
    const splittedMessage = message.content.split(' ');
    splittedMessage.shift(); // remove o comando
    const pass = splittedMessage.join(' ')

    if (!pass) return message.channel.send('Utilize: !responder <palavra>');
    if (pass.length > 25) return message.channel.send('A senha deve ter no máximo 25 caracteres');

    const usados = JSON.parse(fs.readFileSync(process.cwd() + '/usados.json'));

    if (usados.includes(pass)) {
        message.react('⚠️');
        return message.channel.send('Palavra já utilizada');
    }

    var t=0;
    async function r() { // Repete req até encontrar proxy funcional
        try {
            console.log(t++);
            //const proxy = proxies[Math.floor(Math.random() * proxies.length)];

            const response = await axios({
                method: 'post',
                url: enigmaPath,
                baseURL: enigmaUrl,
                data: qs.stringify({
                    r: pass
                }),
                headers: { 
                    'Host': 'www.colherelerda.com',
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36 OPR/69.0.3686.36',
                    'Connection': 'keep-alive'
                },
                
                proxy: {
                    host: '70.110.31.20',
                    port: 8080
                },
                 
                timeout: 10000
            });

            if (!response.response) { // IP Bloqueado
                throw new Error();
            }
            return response;
        } catch (err) {
            // return r();
            return err;
        } 
    } 

    const response = await r();
    if (!response.response) {
        return message.channel.send('ip bloqueado');
    }

    const h1 = /<h1>(.*?)<\/h1>/g.exec(response.response.data)[1];
    if (h1.includes('Pense mais.')) {
        message.react('❌');
        return;
    }

    message.react('✅');
    message.channel.send(`R: ${h1}`);

    usados.push(pass);
    const data = JSON.stringify(usados);
    fs.writeFileSync(process.cwd() + '/usados.json', data);
}

module.exports = {
    name: 'responder',
    execute
}