const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello Express!');
});

module.exports = app;

// to prepare the app for testing, need to
// seperate the server controller code 
// from the application code (everything else)
// by placing the app.listen controller code in a seperate file (server.js)
//
// app.listen(8000, () => {
//   console.log('Server listening on PORT 8000...')
// })