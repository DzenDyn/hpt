import server from './utils/server';

// app.then((server) => {
//     server.listen(80, () => {
//         console.info(
//             'Listening on http://localhost\nOpen http://localhost/v1/api-docs for documentation'
//         );
//     });
// }).catch((err) => {
//     console.error(`Error: ${err.message}`);
// });

server.listen(80, () => {
    console.info(
        'Listening on http://localhost\nOpen http://localhost/v1/api-docs for documentation'
    );
});
// console.log(`App: ${server}`);
