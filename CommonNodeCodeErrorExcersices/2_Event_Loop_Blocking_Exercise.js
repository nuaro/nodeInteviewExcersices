// Exercise 2: Event Loop Blocking
const express = require('express');
const app = express();

// BAD PRACTICE - Blocks event loop
app.get('/blocking', (req, res) => {
    const result = fibonacci(40); // Expensive calculation
    res.json({ result });
});

// Blocking function
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// FIXED VERSION - Using Worker Threads
const { Worker, isMainThread, parentPort } = require('worker_threads');

app.get('/non-blocking', (req, res) => {
    const worker = new Worker(`
        const { parentPort } = require('worker_threads');
        
        parentPort.on('message', (n) => {
            function fibonacci(n) {
                if (n <= 1) return n;
                return fibonacci(n - 1) + fibonacci(n - 2);
            }
            
            const result = fibonacci(n);
            parentPort.postMessage(result);
        });
    `, { eval: true });

    worker.on('message', (result) => {
        res.json({ result });
    });

    worker.postMessage(40);
});