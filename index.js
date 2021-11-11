const express = require('express')
let admin =require('./admin')
let provider = require('./provider')
let cust = require('./customer')


const app = express();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
});
app.use(express.json());

// Admin API
app.post('/adminLogin',(req,res)=>{
    admin.loginAdmin(req,res)
});


app.get('/adminDashboard',(req,res)=>{
    admin.getAdminDashboard(req,res)
});

//Provider API
app.post('/loginProvider',(req,res)=>{
    provider.loginProvider(req,res)
})

app.post('/getProviderProfile',(req,res)=>{
    provider.getMyProfile(req,res)
})

app.post('/saveProvider',(req,res)=>{
    provider.saveProvider(req,res)
});

app.get('/listProviders',(req,res)=>{
    provider.listProviders(req,res)
});

//Customer API
app.post('/CustomerLogin',(req,res)=>{
    provider.CustomerLogin(req,res)
})
app.post('/saveCustomer',(req,res)=>{
    cust.saveCustomer(req,res)
})
app.get('/getCustomers',(req,res)=>{
    cust.getCustomers(req,res)
});

app.listen(5001, () => {
    console.log('test Listening on Port 5001')});