const EventEmitter = require('events');

class TaskProcessor extends EventEmitter {
    constructor() {
        super();
        this.on('error', this.handleError);
    }

    processTask(task) {
        try {
            if (!task.id) {
                throw new Error('Task ID is required');
            }

            if (task.status === 'failed') {
                this.emit('error', new Error('Task failed'));
                return;
            }

            this.emit('success', 'Task processed successfully');
        } catch (error) {
            this.emit('error', error);
        }
    }

    handleError(error) {
        console.error('Error occurred:', error.message);
        // Log to monitoring system, send alerts, etc.
    }
}

// Usage
const processor = new TaskProcessor();
processor.on('success', (msg) => console.log(msg));

// Test cases
processor.processTask({ id: 1, status: 'ok' });
processor.processTask({ status: 'failed' });
processor.processTask({}); // Missing ID
