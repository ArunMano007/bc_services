const express = require('express')
let admin =require('./admin')
let provider = require('./provider')
let cust = require('./customer')
let ord = require('./order')


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

app.post('/updateProviderProfile',(req,res)=>{
    provider.updateProviderProfile(req,res)
});

app.get('/listProviders',(req,res)=>{
    provider.listProviders(req,res)
});

//Customer API
app.post('/CustomerLogin',(req,res)=>{
    cust.loginCustomer(req,res)
})
app.post('/registerCustomer',(req,res)=>{
    cust.registerCustomer(req,res)
})
app.get('/getCustomers',(req,res)=>{
    cust.getCustomers(req,res)
})

app.get('/getCustomersByid',(req,res)=>{
    cust.getCustomersByid(req,res)
});

app.post('/UpdateCustomerProfile',(req,res)=>{
    cust.UpdateCustomerProfile(req,res)
});

//Order API

app.get('/getOrders',(req,res)=>{
    ord.getOrders(req,res)
})

app.get('/orderList',(req,res)=>{
    ord.orderList(req,res)
})

app.post('/bookorder',(req,res)=>{
    ord.bookOrder(req,res)
});

app.listen(5001, () => {
    console.log('test Listening on Port 5001')});