const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))


// Set up handlebars engine and views location - for dynamic content rendering and reusing html code across pages like header. footer
app.set('view engine', 'hbs')
// Override the default views directory for rendering by view engine
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

// set the route to the dynamic template
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Divyesh Vasani'
    })
})

// set the route for about page
app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About',
        name: 'Divyesh Vasani'
    })
})

app.get('/weather', (req, res) => {
    
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address query paramter.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, place} = {}) => {
        if (error) {
           return res.send({
               error
         })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
           if (error) {
              return res.send({
                  error
                })
            }

        res.send({
            forecast: forecastData, 
            location: place,
            address: req.query.address
            })
        }) 
    })
})

app.get('/products', (req, res) => {
    //console.log(req.query)
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term.'
        })
    }

    res.send({
        products: []
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Divyesh Vasani',
        helpText: 'This is help page.'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'Divyesh Vasani'
    })
    //res.send('Help page not found.')
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Divyesh Vasani'
    })
    //res.send('404 page')
})

app.listen(port, () => {
    console.log('Server up and running on port 3000.')
})

