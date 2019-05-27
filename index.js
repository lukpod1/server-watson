// O express será utilizado para montar o servidor HTTP para manipular as requisições do usuário.
const express = require('express')
// O body-parser serve para fazer o parse do corpo das requisições.
const bodyParser = require('body-parser')
// O ibm-watson é a biblioteca responsável por acessar os serviços do IBM Watson utilizando Node.js.
const AssistantV1 = require('ibm-watson/assistant/v1');
// variavel app recebendo o valor do express
const app = express()

// const app usando o cors e o body-parser 
app.use(bodyParser.json())

// variavel port recebendo um valor para a porta que o node irá ser executado
const port = process.env.PORT || 3000

// nesse parte configuramos o servidor e uma rota que será responsável 
// por capturar a mensagem do usuário.

// precisamos pegar as credenciais de serviço no IBM Cloud, 
// que serão responsáveis por fazer a autenticação do nossa aplicação com o serviço da IBM.
const assistant = new AssistantV1({
  version: '2019-02-28',
  iam_apikey: 'KjcI6wFW-v2MtmHAxuLY5sRdS0_OqMwNG3849n5Ws77y',
  url: 'https://gateway.watsonplatform.net/assistant/api'
});

// O Watson trabalha com contexto para localizar qual o estado de cada conversa, então é necessário que passemos pra 
// ele o contexto específico de cada conversa durante as requisições.
// Então, precisamos alterar o tipo de requisição para post para conseguir passar todas as informações no corpo da requisição.
app.post('/conversation/', (req, res) => {
  const { text, context = {} } = req.body

  const params = {
    input: { text },
    workspace_id: '86b6bb2d-fb87-4bcc-8a3c-7f5acce7e2ea',
    context
  }

  assistant.message(params, (error, response) => {
    if (error) {
      console.error(error);
      res.status(500).json(error);
    } else {
      res.json(response);
    }
  });
})

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})

// Agora basta iniciar o servidor abrindo no diretorio do da aplicação colocando o comando (node index.js) e enviar uma requisição 
// via post para http://localhost:3000/conversation/ com um JSON neste formato:

// {
//   "message": "Olá",
//   "context" : {

//   }
// }
