# Node.js Performance Testing Examples

Examples of common performance issues in Node.js applications and how to detect them. Includes tests for memory leaks, CPU spikes, event loop blocking, and more.
this readme only cover for the errorcode excersices, the other excersices , could be runned directly without any extra step

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Artillery (`npm install -g artillery`) for load testing
- npm install express worker_threads

## Test Categories & How to Run
move to the node test
````
cd CommonNodeCodeErorExcersices

````

### 1. Memory Leak Test
Tests unbounded array growth vs. fixed-size cache implementation.
```
bash
# Run the test
node 1_Memory_Leak_Exercise.js
# Load test with Artillery
artillery quick --count 1000 -n 50 http://localhost:3000/memory-leak
artillery quick --count 1000 -n 50 http://localhost:3000/fixed-memory
``` 

### 2. Event Loop Blocking Test
Demonstrates blocking vs. non-blocking operations using Worker Threads.
```
node 2_Event_Loop_Blocking_Exercise.js
# Test endpoints
curl http://localhost:3000/blocking 
curl http://localhost:3000/non-blocking
curl http://localhost:3000/nonblocking2
``` 

### 3. CPU Spike Test
Shows CPU-intensive operations and their optimization using clustering.
```
node 3_CPU_Spike.js
# Run tests
artillery quick --count 100 -n 20 http://localhost:3000/cpu-intensive
artillery quick --count 100 -n 20 http://localhost:3000/cpu-optimized
``` 

### 4. Event Emitter Leak Test
Demonstrates proper event listener management.
```
node 4_Event_Emitter_Leak.js 
# Test endpoints
curl http://localhost:3000/event-leak 
curl http://localhost:3000/event-fixed
``` 

### 5. Stream Memory Usage Test
Shows efficient file handling using streams.
```
node 5_Stream_Memory_Usage.js
# Test endpoints
curl http://localhost:3000/file-memory 
curl http://localhost:3000/file-stream
``` 

## What to Look For

### Memory Leaks
- Monitor increasing memory usage over time
- Check heap usage through Chrome DevTools

### CPU Spikes
- Watch for high CPU usage in Task Manager/Activity Monitor
- Monitor response time degradation

### Event Loop Blocking
- Check for delayed response times
- Monitor request queue length

### Event Emitter Leaks
- Watch for MaxListenersExceededWarning
- Monitor event listener count

### Stream Performance
- Compare memory usage between stream and non-stream versions
- Monitor throughput and response times

## Monitoring Commands

Check memory usage:
```
bash node -e 'console.log(process.memoryUsage())'
``` 

Monitor CPU usage:
```
bash top -pid $(pgrep -l node)
``` 

## Common Issues

- If tests don't run, check port conflicts (default: 3000)
- Ensure proper Node.js version is installed
- Check system resources before running CPU-intensive tests

## Best Practices

1. Always clean up resources
2. Use worker threads for CPU-intensive tasks
3. Implement proper error handling
4. Use streams for large data operations
5. Monitor memory and CPU usage
6. Set appropriate resource limits
7. Use clustering for high-load applications

