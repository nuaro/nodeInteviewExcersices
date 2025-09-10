// Exercise 3: Create and handle custom errors
class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DatabaseError';
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

async function saveUser(user) {
    try {
        if (!user.id) {
            throw new ValidationError('User ID is required');
        }

        // Simulate database error
        if (Math.random() < 0.5) {
            throw new DatabaseError('Database connection failed');
        }

        return { success: true };
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Validation failed:', error.message);
            return { success: false, type: 'validation' };
        }
        if (error instanceof DatabaseError) {
            console.error('Database error:', error.message);
            return { success: false, type: 'database' };
        }
        throw error; // Re-throw unexpected errors
    }
}
