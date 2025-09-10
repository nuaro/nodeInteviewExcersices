// Exercise 5: Stream Memory Usage
const fs = require('fs');
const express = require('express');
const app = express();

// BAD PRACTICE - Reading entire file into memory
app.get('/file-memory', (req, res) => {
    fs.readFile('large-file.txt', (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.send(data);
    });
});

// FIXED VERSION - Using streams
app.get('/file-stream', (req, res) => {
    const fileStream = fs.createReadStream('large-file.txt', {
        highWaterMark: 64 * 1024 // 64KB chunks
    });

    fileStream.pipe(res);

    fileStream.on('error', (error) => {
        res.status(500).json({ error: error.message });
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Create test file
function createLargeFile() {
    const writeStream = fs.createWriteStream('large-file.txt');
    for (let i = 0; i < 1000000; i++) {
        writeStream.write('This is a line of text\n');
    }
    writeStream.end();
}

createLargeFile();