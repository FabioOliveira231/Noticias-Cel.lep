//Modulo de configuração do app
const express = require('express')
const app = express()

const session = require('express-session')

//Define o motor de views como sendo o EJS
app.set('view engine', 'ejs')

//Configurar o caminho da pasta views
app.set('views', './app/views')

// configuração dos arquivos estaticos
app.use(express.static('./app/public'))

//Configura o bodyparse do express
app.use(express.urlencoded({extended: true}))


//Configuração express-session
app.use(session({
    secret: 'Fab1985@', // chave de segurança usada na assinatura dos indentificadores
    resave: false, // otimiza para que a sessao nao seja salva novamente
    saveUninitialized: false // otimiza o uso do armazenamento no servidor
}))


module.exports = app