// Exercise 1: Memory Leak Detection
const express = require('express');
const app = express();
const port = 3000;

// BAD PRACTICE - Potential memory leak
let requestHistory = [];

app.get('/memory-leak', (req, res) => {
    // Problem: Unbounded array growth
    requestHistory.push({
        timestamp: Date.now(),
        url: req.url,
        headers: req.headers
    });

    res.json({ status: 'request logged' });
});

// FIXED VERSION
const MAX_HISTORY = 1000;
let fixedRequestHistory = [];

app.get('/fixed-memory', (req, res) => {
    // Solution: Bounded array with sliding window
    if (fixedRequestHistory.length >= MAX_HISTORY) {
        fixedRequestHistory.shift(); // Remove oldest entry
    }

    fixedRequestHistory.push({
        timestamp: Date.now(),
        url: req.url
    });

    res.json({ status: 'request logged safely' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Memory usage monitoring
setInterval(() => {
    const used = process.memoryUsage();
    console.log(`Memory usage: ${Math.round(used.heapUsed / 1024 / 1024 * 100) / 100} MB`);
}, 5000);