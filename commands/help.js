// exemplo comando

const execute = async (message, client, args) => {
    return message.channel.send(
`Lista de comandos:
!help - Esta lista
!ping - Teste
!responder <senha> - Verificar se a resposta está correta
    - ✅ Senha nova!
    - ❌ Senha incorreta
    - ⚠️ Senha já testada
!proxies
!adicionar <ip>:<porta> - Adicionar proxy à lista
    - 📥 Proxy OK!
    - 📤 Proxy não funcionou
    - ⚠️ Proxy já usada`
    );
}

module.exports = {
    name: 'help',
    execute
}