const express = require('express')
const path = require('path')
const hbs =require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

// path for express config
const viewsPath =path.join(__dirname,'/templates')
app.use(express.static(path.join(__dirname,'../public')))
const partialsPath = path.join(__dirname, '/partials')

// path for handlebars
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('/product', (req,res)=>{
    if(!req.query.search){

        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'Hans'

    })
})



app.get('/about',(req,res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Hans'

    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helptext: 'helpful text',
        title: 'Help',
        name: 'Hans'

    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name:'Hans',
        errorMessage: 'Help article not found'
            })
})


app.get('/weather',(req, res)=>{
    if(!req.query.address){

        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address,(e,{latitude,longitude,location}={})=>{

            if(e){
                return res.send({e})
            }
            forecast(latitude,longitude,  (e,forecastData)=>{
                if (e){
                    return res.send({e})
                }
                res.send({
                    forecast:forecastData,
                    location,
                    address:req.query.address
                })
            })
    })
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'philadelphia',
    //     address: req.query.address
    // }
    //     )
            })
    
app.get('*',(req, res)=>{
    res.render('404',{
title: '404',
name:'Hans',
errorMessage: 'page not found'
    })
                })
        
app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})