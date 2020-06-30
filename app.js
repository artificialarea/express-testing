const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

//////////////////////////////////////////////////////
// HANDLER FUNCTION ENDPOINTS BELOW
// GET /
// GET /quotient
// GET /generate (notable shuffle array)
// GET /midpoint
// GET /frequency
//////////////////////////////////////////////////////


// GET / ////////////////////////////
app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello Express!');
});

// GET /quotient ////////////////////////////
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
});


// GET /generate ////////////////////////////
app.get('/generate', (req, res) => {

  const { n } = req.query

  // coerce n to a numeric value

  const num = parseInt(n)

  if (isNaN(num)) {
    return res 
      .status(400)
      .send('Invalid request');
  }


  // Generate inital array within scope [1, .., n]
  // Then shuffle that array (randomly)

  // MAKE ARRAY v1 ///////////////////////
  // my old skoool version
  // const arr = [];
  // for(let i = 1; i <= num; i++) {
  //   arr.push(i);
  // }

  // MAKE ARRAY v2 ///////////////////////
  // thinkful version 
  const arr = new Array(num) // an Array constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array
    .fill(1)
    .map((_, i) => i + 1);
  // console.log(arr);


  // SHUFFLE ARRAY v1 ///////////////////////
  // Fischer-Yates Shuffle, aka in-place O(n) shuffle
  // src: https://bost.ocks.org/mike/shuffle/
  // 
  // function shuffle(array) {
  //   var m = array.length, t, i;
  //   // While there are remaining elements to shuffle...
  //   while (m) {
  //     // Pick a remaining element...
  //     i = Math.floor(Math.random() * m--);
  //     // and swap it with the current element
  //     t = array[m];
  //     array[m] = array[i];
  //     array[i] = t;
  //   }
  //   return array;
  // }
  // shuffle(arr);

  // SHUFFLE ARRAY v2 ///////////////////////
  // thinkful version, same same but different
  arr.forEach((e, i) => {
    let ran = Math.floor(Math.random() * num);
    let temp = arr[i];
    arr[i] = arr[ran];
    arr[ran] = temp;
  })

  // console.log(arr);

  res
    .status(200)
    .json(arr);
})


// GET /midpoint ////////////////////////////
// cut.n.paste b/c no fucking idea how to do this

function toRadians(deg) {
  return deg * (Math.PI / 180);
}
function toDegrees(rad) {
  return rad * (180 / Math.PI);
}

app.get('/midpoint', (req, res) => {
  const { lat1, lon1, lat2, lon2 } = req.query;

  // for brevity the validation is skipped

  // convert to radians
  const rlat1 = toRadians(lat1);
  const rlon1 = toRadians(lon1);
  const rlat2 = toRadians(lat2);
  const rlon2 = toRadians(lon2);

  const bx = Math.cos(rlat2) * Math.cos(rlon2 - rlon1);
  const by = Math.cos(rlat2) * Math.sin(rlon2 - rlon1);

  const midLat = Math.atan2(
    Math.sin(rlat1) + Math.sin(rlat2),
    Math.sqrt(
      (Math.cos(rlat1) + bx)
      * (Math.cos(rlat1) + bx)
      + by * by
    )
  );
  const midLon = rlon1 + Math.atan2(by, Math.cos(rlat1) + bx);
  
  res.json({
    lat: toDegrees(midLat),
    lon: toDegrees(midLon)
  })

})


// GET /frequency /////////////////////////////
app.get('/frequency', (req, res) => {
  const { s } = req.query;

  // return object is this format:
  /*  {                 // within the string...
        count: 2,       // the total number of distinct characters
        average: 5,     // the average frequency
        highest: 'a',   // the character with the highest frequency. if tie, letter closest to the beginning of the alphabet
        'a': 6,         // frequency of occurrence of each character
        'b': 4
      }   */

  if (!s) {
    return res
      .status(400)
      .send('Invalid request')
  }
  
  const counts = s
    .toLowerCase()
    .split('')
    .reduce((acc, curr) => {
      if (acc[curr]) {
        acc[curr]++;
      } else {
        acc[curr] = 1;
      }
      return acc;
    }, {});

  const count = Object.keys(counts).length;
  const average = s.length / count;
  let highest = '';
  let highestVal = 0;

  Object.keys(counts).forEach(k => {
    if (counts[k] > highestVal) {
      highestVal = counts[k];
      highest = k;
    }
  });

  counts.count = count;
  counts.average = average;
  counts.highest = highest;
  res.json(counts);
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