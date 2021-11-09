const express = require('express')
let provider = require('./provider')

const app = express();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
});
app.use(express.json());



app.post('/saveProvider',(req,res)=>{
    provider.saveProvider(req,res)
});

app.get('/listProviders',(req,res)=>{
    provider.listProviders(req,res)
});
let cust = require('./customer')

app.post('/saveCustomer',(req,res)=>{
    cust.saveCustomer(req,res)
})
app.get('/getCustomers',(req,res)=>{
    cust.getCustomers(req,res)
})
app.listen(5001, () => {
    console.log('test Listening on Port 5001');
});