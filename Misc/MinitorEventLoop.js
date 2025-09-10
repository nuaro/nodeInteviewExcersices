function MonitorEventLoop() {
    let start = process.hrtime();

    setImmediate(()=>
    {
        const lag = process.hrtime(start);
        const lagInMs = lag[0] * 1000 + lag[1] / 1e6;
        console.log(`Event loop lag : ${lagInMs.toFixed(2)} ms`);

        setTimeout(MonitorEventLoop,1000);

    });
}

MonitorEventLoop();