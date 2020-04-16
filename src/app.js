const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast= require('./utils/forecast')
const geocode= require('./utils/geocode')
const filePath= path.join(__dirname,'../public')
const viewPath= path.join(__dirname,'../templates/views')
const hbsPath= path.join(__dirname,'../templates/partials')
const app = express()
app.use(express.static(filePath))
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(hbsPath)

const port = process.env.PORT || 3000
app.get('', (req,res)=>{
    res.render('index', {
        title:'Weather',
        name:'anu',
        description:'main page'
    })
})


app.get('/about',(req,res)=>{
res.render('about', {
    title:'Weather',
    name:'anu',
    description:'about page'
})
})

app.get('/help',(req,res)=>{
    res.render('help', {
        title:'Weather',
        name:'anu',
        description:'help page'
    })
    })
    
// app.get('/help', (req,res)=>{
//     res.send({name:'anu', age:24})
// })
app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send('error')
    }
    geocode(req.query.address, (error,message)=>{
        if (error){
          return  res.send({error:'cannot process the address'})
        } 
        forecast(message.latitude,message.longitude,(error, message)=>{
            if(error){
                return res.send({error:'cannot process the address'})
            }
            res.send({weather: message})
        })
    })
    
    })

app.get('/help/*',(req,res)=>{
    res.render('error', {
        title:'404 error present',
        value: 'help page not found',
        name: 'anu'
    })
})
    
app.get('*',(req,res)=>{
    res.render('error',{
        title:'404 error',
        value: 'page not found',
        name: 'anu'
    })
})
 

app.listen(port, ()=>{
    console.log('port started')
})