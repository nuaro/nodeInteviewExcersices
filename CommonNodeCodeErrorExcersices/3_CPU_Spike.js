// Exercise 3: CPU Spike Detection
const express = require('express');
const app = express();
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    // CPU usage monitoring
    let lastUsage = process.cpuUsage();

    setInterval(() => {
        const usage = process.cpuUsage(lastUsage);
        const percentageCPU = (usage.user + usage.system) / 1000000; // Convert to percentage

        console.log(`CPU Usage: ${Math.round(percentageCPU)}%`);

        if (percentageCPU > 80) {
            console.warn('High CPU usage detected!');
        }

        lastUsage = process.cpuUsage();
    }, 1000);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        // Restart worker
        cluster.fork();
    });
} else {
    // Worker process
    const app = express();

    // BAD PRACTICE - CPU intensive operation
    app.get('/cpu-intensive', (req, res) => {
        let result = 0;
        for (let i = 0; i < 1000000000; i++) {
            result += Math.random();
        }
        res.json({ result });
    });

    // FIXED VERSION - Batched processing
    app.get('/cpu-optimized', (req, res) => {
        const BATCH_SIZE = 1000000;
        let result = 0;

        function processBatch(iteration = 0) {
            for (let i = 0; i < BATCH_SIZE; i++) {
                result += Math.random();
            }

            if (iteration < 100) {
                // Schedule next batch in next tick
                setImmediate(() => processBatch(iteration + 1));
            } else {
                res.json({ result });
            }
        }

        processBatch();
    });

    app.listen(3000);
}

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});