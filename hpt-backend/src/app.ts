import { createServer } from './utils/server';

createServer()
    .then((server) => {
        server.listen(80, () => {
            console.info('Listening on http://localhost');
        });
    })
    .catch((err: Error) => {
        console.error(`Error: ${err.message}`);
    });
