// Exercise 4: Event Emitter Memory Leak
const EventEmitter = require('events');
const express = require('express');
const app = express();

// BAD PRACTICE - Event listener leak
const myEmitter = new EventEmitter();

app.get('/event-leak', (req, res) => {
    // Problem: Adding listeners without removal
    myEmitter.on('data', (data) => {
        console.log('Received data:', data);
    });

    res.json({ status: 'listener added' });
});

// FIXED VERSION
const MAX_LISTENERS = 10;
myEmitter.setMaxListeners(MAX_LISTENERS);

app.get('/event-fixed', (req, res) => {
    const listener = (data) => {
        console.log('Received data:', data);
    };

    // Remove existing listener before adding new one
    myEmitter.removeListener('data', listener);
    myEmitter.once('data', listener); // Use once instead of on

    res.json({ status: 'listener added safely' });
});

// Monitor event listeners
setInterval(() => {
    console.log('Current listeners:', myEmitter.listenerCount('data'));
}, 5000);