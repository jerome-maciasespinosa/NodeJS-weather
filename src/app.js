const express = require('express');
const configureRoutes = require('./routing')

const app = express();
const port = 3000;

configureRoutes(app, express);

app.listen(port, () => {
    console.log('server is listenning on port ' + port)
});