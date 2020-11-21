import { createServer } from './utils/server';
import * as db from './db/db';

createServer()
    .then((server) => {
        server.listen(80, () => {
            console.info('Listening on http://localhost');
        });
        db.connect();
    })
    .catch((err: Error) => {
        console.error(`Error: ${err.message}`);
    });
