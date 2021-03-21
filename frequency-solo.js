function frequency(s) {

  console.log('string:', s);
  console.log('split into array:', s.toLowerCase().split(''));

  // return object is this format:
  /*  {                 // within the string...
        count: 2,       // the total number of distinct characters
        average: 5,     // the average frequency
        highest: 'a',   // the character with the highest frequency. if tie, letter closest to the beginning of the alphabet
        'a': 6,         // frequency of occurrence of each character
        'b': 4
      }   */

  if (!s) {
    console.log('string undefined');
  }
  
  const counts = s
    .toLowerCase()
    .split('')
    // I'm still confused by the particulars of this `.reduce` method
    // even after I console.log the sequence
    .reduce((acc, curr) => {
      console.log('acc:', acc, 'acc[curr]:', acc[curr]);
      if (acc[curr]) {
        acc[curr]++;
      } else {
        acc[curr] = 1;
      }
      return acc;
    }, {});
  
  console.log('counts (init):', counts);
  
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
  console.log(counts);
}

console.log(frequency('aaBBAAbbaa'));