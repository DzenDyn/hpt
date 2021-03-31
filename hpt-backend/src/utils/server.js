import express from 'express';
import swaggerUi from 'swagger-ui-express';
// import { Express } from 'express-serve-static-core';
import { connector, summarise } from 'swagger-routes-express';
import YAML from 'yamljs';
import * as OpenApiValidator from 'express-openapi-validator';
import morgan from 'morgan';
import cors from 'cors';
import * as api from '../api/controllers';
import * as db from '../db/db';

db.connect()
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error));

const yamlSpecFile = './bin/api/apiv1.yaml';
const apiDefinition = YAML.load(yamlSpecFile);

const apiSummary = summarise(apiDefinition);
console.info(apiSummary);

const server = express();

server.use(morgan('dev'));

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

const validatorOptions = {
    coerceTypes: false,
    apiSpec: yamlSpecFile,
    validateRequests: true,
    validateResponses: false
};

server.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(apiDefinition, { explorer: false }));

server.use(OpenApiValidator.middleware(validatorOptions));
server.use((err, req, res, next) => {
    res.status(err.status).json({
        error: {
            type: 'request_validation',
            message: err.message,
            errors: err.errors
        }
    });
});

// error customization, if request is invalid
server.use((err, req, res, next) => {
    res.status(err.status).json({
        error: {
            type: 'request_validation',
            message: err.message,
            errors: err.errors
        }
    });
});

const connect = connector(api, apiDefinition, {
    onCreateRoute: (method, descriptor) => {
        console.log(
            `Method ${method} of endpoint ${descriptor[0]} linked to ${descriptor[1].name}`
        );
    }
});

connect(server);

module.exports = server;
