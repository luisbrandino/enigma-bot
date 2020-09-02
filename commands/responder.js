const FormData = require("form-data")
const axios = require('axios');
const qs = require('qs')
const fs = require('fs');

const enigmaUrl = 'http://colherelerda.com/';
const enigmaPath = '/chr/f/g.php';

const execute = async (message, client, args) =>  {
    const splittedMessage = message.content.split(' ');
    splittedMessage.shift(); // remove o comando
    const pass = splittedMessage.join(' ')

    if (!pass) return message.channel.send('Utilize: !responder <palavra>');
    if (pass.length > 25) return message.channel.send('A senha deve ter no máximo 25 caracteres');

    message.react('⌛');//.then(x=>x.remove()); 

    const usados = JSON.parse(fs.readFileSync(process.cwd() + '/usados.json'));

    if (usados.includes(pass)) {
        await message.reactions.removeAll();
        return await message.react('⚠️');
    }

    const proxies = JSON.parse(fs.readFileSync(process.cwd() + '/proxies.json'));

    var t=0;
    var proxyId;
    async function r() { // Repete req até encontrar proxy funcional
        try {
            console.log(t++);
            proxyId = Math.floor(Math.random() * proxies.length);
            const proxy = proxies.splice(proxyId, 1)[0];
            if (!proxy) return 'Proxies banidas';
            
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
                    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36 OPR/69.0.3686.36'
                }, 
                proxy: {
                    host: proxy.i,
                    port: proxy.p
                }, 
                timeout: 25000
            });  
            if (!response.response) { // IP Bloqueado
                throw new Error('IP bloqueado'); 
            } 
            return response;
        } catch (err) {   
            if (err.message.includes('code 303')) return err;
            if (err.message!=='IP bloqueado') { // = proxy morta
                const json = fs.readFileSync(process.cwd() + '/proxies.json', 'utf8');
                var newProxies = JSON.parse(json);
                const proxyRemovida = newProxies.splice(proxyId, 1)[0];
                const data = JSON.stringify(newProxies);
                fs.writeFileSync(process.cwd() + '/proxies.json', data);
                message.channel.send(`⚠️ Aviso: Proxy (${proxyRemovida.i}:${proxyRemovida.p}) foi removida.\nTente adiciona-la novamente mais tarde...`);
            }
            return await r(); 
        }     
    } 

    const response = await r()

    if (response==='Proxies banidas') {
        return message.channel.send('🕒 Todas as proxies tomaram timeout.\n'
                            + 'Adicione novas ou aguarde alguns minutos');
    }

    await message.reactions.removeAll();

    const h1 = /<h1>(.*?)<\/h1>/g.exec(response.response.data)[1];
    if (h1.includes('Pense mais.')) {
        await message.react('❌');
    } else {
        message.channel.send(`R: ${h1}`);
        await message.react('✅');
    }

    // apaga a ampulheta aq
    //message.reactions.cache.get('⌛').remove();

    usados.push(pass);
    const data = JSON.stringify(usados);
    fs.writeFileSync(process.cwd() + '/usados.json', data);
}

module.exports = {
    name: 'responder',
    execute
}