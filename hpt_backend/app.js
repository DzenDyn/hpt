const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./apiV1.yaml');

const feedRoutes = require('./routes/feed');

const app = express();

app.use(bodyParser.json());

// api docs
app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

app.use((req, res, next) => {
    // There we can chosee to which domains its allowed, or to all(*)
    res.setHeader('Acess-Controll-Allow-Origin', '*');
    // Specify allowed methods
    res.setHeader('Acess-Control-Aloow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);

app.listen(80);
