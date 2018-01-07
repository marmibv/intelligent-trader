const express = require('express')
var Client = require('node-rest-client').Client;
var client = new Client();
const app = express()
var args = {
  headers: {
    "Content-Type": "application/json",
    "Host": "signal3.exacoin.co",
    "Connection": "keep-alive",
    "Accept": "*/*",
    "Origin": "https://exacoin.co",
    "Referer": "https://exacoin.co/dashboard/ai-signal",
    "Accept-Language": "en-US,en;q=0.9,vi;q=0.8"
  }
};

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index.html');
})

app.get('/:currency', (req, res) => {
  var currency = req.params.currency;
  client.get(`https://signal3.exacoin.co/get_signal?currency=${currency}&t=1515211609371`, args, (data) => {
    res.type('json')
    res.send(data);
  });

})

app.listen(3000, () => console.log('Listening on http://localhost:3000...'))