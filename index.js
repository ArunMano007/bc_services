const express = require('express')
let lng = require('./lang')
let provider = require('./provider')

const app = express();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
});
app.use(express.json());

app.get('/helloworld', (req, res) => {
    lng.returnQtyArray(req,res)
});

app.post('/saveProvider',(req,res)=>{
    provider.saveProvider(req,res)
});

app.get('/listProviders',(req,res)=>{
    provider.listProviders(req,res)
});

app.listen(5001, () => {
    console.log('test Listening on Port 5001');
});