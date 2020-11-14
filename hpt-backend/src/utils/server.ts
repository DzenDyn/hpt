import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express-serve-static-core';
import { connector, summarise } from 'swagger-routes-express';
import YAML from 'yamljs';

import * as api from '../api/controllers';

/* eslint-disable  @typescript-eslint/no-unsafe-assignment */
/* eslint-disable  @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
export async function createServer(): Promise<Express> {
    const yamlSpecFile = './config/apiv1.yaml';
    const apiDefinition = YAML.load(yamlSpecFile);
    const apiSummary = summarise(apiDefinition);
    console.info(apiSummary);

    const server = express();
    // here we can intialize body/cookies parsers, connect logger, for example morgan
    server.use(bodyParser.json());

    // CORS settings
    server.use((req, res, next) => {
        // There we can chosee to which domains its allowed, or to all(*)
        res.setHeader('Acess-Controll-Allow-Origin', '*');
        // Specify allowed methods
        res.setHeader('Acess-Control-Aloow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });

    server.use(
        '/v1/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(apiDefinition, { explorer: false })
    );

    // error customization, if request is invalid
    server.use(
        (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(err.status).json({
                error: {
                    type: 'request_validation',
                    message: err.message,
                    errors: err.errors
                }
            });
        }
    );

    const connect = connector(api, apiDefinition, {
        onCreateRoute: (method: string, descriptor: any[]) => {
            console.log(`${method}: ${descriptor[0]} : ${descriptor[1].name}`);
        }
    });

    connect(server);

    return server;
}
