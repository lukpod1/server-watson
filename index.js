const express = require('express')
const bodyParser = require('body-parser')
const AssistantV1 = require('ibm-watson/assistant/v1');

const app = express()

app.use(bodyParser.json())
// app.use(express.static(''))

const port = process.env.PORT || 3000

const assistant = new AssistantV1({
  version: '2019-02-28',
  iam_apikey: 'KjcI6wFW-v2MtmHAxuLY5sRdS0_OqMwNG3849n5Ws77y',
  url: 'https://gateway.watsonplatform.net/assistant/api'
});

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
