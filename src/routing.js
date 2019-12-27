const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const configureRoutes = (app, express) => {
    const viewsDir = path.join(__dirname, '../views');
    app.set('view engine', 'hbs'); // est nécessaire pour faire fonctionner le hbs (pour le rendu dynamic)
    app.set('views', viewsDir); // this line is not required => default path equal to views. If I put my views in other folder, We must precise this line
    
    const partialsDirectory = path.join(__dirname, '../partials')
    hbs.registerPartials(partialsDirectory);
    
    const publicDir = path.join(__dirname, '../public')
    app.use(express.static(publicDir))
    
    
    app.get('', (req,res) => {
        res.render('index', {
            title: 'Weather app', 
            name: 'jérôme'
        })
    })
    app.get('/help', (req,res) => {
        res.render('help', {
            title: 'Help', 
            name: 'jérôme'
        })
    })
    app.get('/about', (req,res) => {
        res.render('about', {
            title: 'About', 
            name: 'jérôme'
        })
    })
    // app.use('/help', express.static(publicDir + "/help.html"))
    // app.use('/about', express.static(publicDir + "/about.html"))


    // app.get('', (req, res, next) => {
    //     res.send('<h1>Weather</h1>');
    // })
    // app.get('/help', (req, res, next) => {
    //     res.send([
    //         { name: 'jérôme' }, 
    //         { name: 'sara' }
    //     ]);
    // })
    // app.get('/about', (req, res, next) => {
    //     res.send('<h1>About page</h1>');
    // })
    app.get('/weather', (req, res, next) => {
        if (!req.query.address)
            return res.send({error: 'address is required'})
        
        geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
            if (error){
                return res.send({error})
            }
            weather(longitude,latitude, (err, result) => {
                if (err) {
                    return res.send({error: err})
                } 
                res.send({
                    location,
                    forecast: result,
                    address: req.query.address,
                });
            });
        });

       
    })

    app.get('/products', (req, res) => {
        if (!req.query.search){
            return res.status(400).send({error: 'you must provide a search term'})
        }
        res.send({
            products: [],
        })
    })

    app.get('/help/*', (req, res) => {
        res.render('notFound', {
            errorMessage: 'this article cannot be found',
            name: 'jérôme',
            title: 'article not found'
        })
    })
    app.get('*', (req, res) => {
        res.render('notFound', {
            errorMessage: '404 page not found',
            name: 'jérôme',
            title: 'page not found'
        })
    })
    
    
}

module.exports = configureRoutes;