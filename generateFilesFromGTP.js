// use the query: complete code, in single file, separated by comment # --file: filename

const fs = require('fs');
const path = require('path');

const contentFilePath = 'content.txt';
const outputDirectory = './output';

// Ensure the output directory exists
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}

// Read the content.txt file
fs.readFile(contentFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Split the content based on the file markers
  const fileSections = data.split('# --file:').slice(1); // Skip the first element as it will be empty

  fileSections.forEach(section => {
    const sectionLines = section.split(/\r?\n/); // Split section into lines
    const filename = sectionLines.shift().trim(); // The first line is the filename
    const content = sectionLines.join('\n').trim(); // Rejoin the remaining lines to form the content

    const filePath = path.join(outputDirectory, filename);

    // Write each file with the corresponding content
    fs.writeFile(filePath, content, err => {
      if (err) {
        console.error(`Error writing the file: ${filename}`, err);
      } else {
        console.log(`File written: ${filename}`);
      }
    });
  });
});
