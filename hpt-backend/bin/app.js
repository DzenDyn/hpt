"use strict";

var _server = _interopRequireDefault(require("./utils/server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// app.then((server) => {
//     server.listen(80, () => {
//         console.info(
//             'Listening on http://localhost\nOpen http://localhost/v1/api-docs for documentation'
//         );
//     });
// }).catch((err) => {
//     console.error(`Error: ${err.message}`);
// });
_server["default"].listen(80, function () {
  console.info('Listening on http://localhost\nOpen http://localhost/v1/api-docs for documentation');
}); // console.log(`App: ${server}`);