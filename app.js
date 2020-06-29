const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello Express!');
});

app.get('/quotient', (req, res) => {
  const { a, b } = req.query

  if(!a) {
    return res
      .status(400)
      .send('Value for a is needed');
  }
  if(!b) {
    return res
      .status(400)
      .send('Value for b is needed');
  }

  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if (isNaN(numA)) {
    return res
      .status(400)
      .send('Value for a must be numeric')
  }

  if (isNaN(numB)) {
    return res
      .status(400)
      .send('Value for b must be numeric')
  }

  // if valid

  const ans = numA / numB;

  res
    .send(`${a} divided by ${b} is ${ans}`);

})

module.exports = app;

// to prepare the app for testing, need to
// seperate the server controller code 
// from the application code (everything else)
// by placing the app.listen controller code in a seperate file (server.js)
//
// app.listen(8000, () => {
//   console.log('Server listening on PORT 8000...')
// })