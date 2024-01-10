

const express = require('express');
const conv = require('./convert.js')

const bodyParser = require('body-parser');
const app = express();
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream('./log' + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;
const port = 3000;

app.use(bodyParser.json());
let ts = Date.now();

let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();

app.post('/model', (req, res) => {
    let waktu = year + "-" + month + "-" + date;

    conv(req.body['language'], req.body['typeName'], JSON.stringify(req.body['jsonString'])).then((re)=> res.send(resp = {"model":re}));
    log_file.write( req.body['language']+' '+req.body['typeName']+' '+JSON.stringify(req.body['jsonString'])+ ' '+  waktu+ '\n');
    log_stdout.write(req.body['language']+' '+req.body['typeName']+' '+JSON.stringify(req.body['jsonString'])+' '+  waktu+ '\n');
    
});

app.listen(port, () => {
  console.log(`cli-nodejs-api listening at http://localhost:${port}`)
});

  