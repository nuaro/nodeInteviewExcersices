function logMemoryUsage() {
    const memoryUsage = process.memoryUsage();
    console.log(memoryUsage);
}

setInterval(logMemoryUsage, 5000);