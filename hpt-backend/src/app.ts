import { createServer } from './utils/server';
import * as db from './db/db';

db.connect()
    .then(() => {
        createServer()
            .then((server) => {
                server.listen(80, () => {
                    console.info(
                        'Listening on http://localhost\nOpen http://localhost/v1/api-docs for documentation'
                    );
                });
            })
            .catch((err: Error) => {
                console.error(`Error: ${err.message}`);
                db.disconnect();
            });
    })
    .catch((err: Error) => {
        console.error(err.message);
        db.disconnect();
    });
