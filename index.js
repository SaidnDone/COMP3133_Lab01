const fs = require('fs');
const csv = require('csv-parser');

function filterAndWriteData(inputFile, outputFile, filterCountry) {
  const writeStream = fs.createWriteStream(outputFile);

  fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (row) => {
      if (row.country.toLowerCase() === filterCountry.toLowerCase()) {
        writeStream.write(`${row.country},${row.year},${row.population}\n`);
      }
    })
    .on('end', () => {
      writeStream.end();
      console.log(`Data for ${filterCountry} written to ${outputFile}`);
    });
}

try {
  fs.unlinkSync('canada.txt');
  fs.unlinkSync('usa.txt');
} catch (err) {
}

filterAndWriteData('input_countries.csv', 'canada.txt', 'canada');
filterAndWriteData('input_countries.csv', 'usa.txt', 'united states');
