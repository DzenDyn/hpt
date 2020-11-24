import { createServer } from './utils/server';
import * as db from './db/db';

db.connect()
    .then(() => {
        createServer()
            .then((server) => {
                server.listen(80, () => {
                    console.info('Listening on http://localhost');
                });
            })
            .catch((err: Error) => {
                console.error(`Error: ${err.message}`);
            });
    })
    .catch((err: Error) => {
        console.error(err.message);
    });
