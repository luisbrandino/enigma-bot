// exemplo comando

const execute = async (message, client, args) => {
    return message.channel.send(
`Lista de comandos:
!ajuda - Esta lista
!ping - Teste
!responder <senha> - Verificar se a resposta está correta
    - ✅ Senha nova!
    - ❌ Senha incorreta
    - ⚠️ Senha já testada
!proxies
!adicionar <ip>:<porta> - Adicionar proxy à lista
    - 📥 Proxy OK!
    - 📤 Proxy não funcionou
    - ⚠️ Proxy já usada

Bot criado por Mafios#1972 e brandino#1300
`
    );
}

module.exports = {
    name: 'ajuda',
    execute
}