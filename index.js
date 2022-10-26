// Importando o express
const express = require('express')
// Importando o bodyParser
const bodyParser = require('body-parser')
// Importando o path (que nos permite gerenciar os caminhos no projeto mais facilmente)
const path = require('path')
// Instanciando o express na variável app
const app = express()
// Importando o dotenv
require('dotenv').config()
// Definindo a porta (caso não haja a variável configurada no .env, usará o segundo valor)
const port = process.env.PORT || 5000
// Permitindo o uso de JSON no body das requests com o bodyParser
app.use(bodyParser.json())
// Permitindo o parse das informações (com Content-Type correspondente ao type) vindas no body das requests com o bodyParser. O true permite informações encadeadas (usa a lib qs, com false usaria a lib querystring)
app.use(bodyParser.urlencoded({
  extended: true
}))
// Indica que a arquivos estáticos serão acessados a partir de public
app.use(express.static(path.join(__dirname, 'public')))
// Indica qual o caminho para as views
app.set('views', path.join(__dirname, 'views'));
// Indica que o template engine (ou view engine) a ser usado é o EJS
app.set('view engine', 'ejs')
// Importando o arquivo routes.js
const router = require('./routes')
// Definindo o uso do arquivo para a rota principal
app.use('/', router)
// Por fim, precisamos instruir o servidor a observar (listen) a porta definida - isso nos permite acessar localhost:PORTA_DEFINIDA para visualizarmos nosso projeto. Perceba que, além da porta, podemos passar um segundo parâmetro - uma função callback que, nesse caso, retorna um console.log para avisar que o servidor está 'rodando' na porta definida.
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))