// Implement rate limiting with error handling
const rateLimit = {
    maxRequests: 100,
    timeWindow: 3600000, // 1 hour
    requests: new Map()
};

function checkRateLimit(userId) {
    const now = Date.now();
    const userRequests = rateLimit.requests.get(userId) || [];

    // Clean old requests
    const validRequests = userRequests.filter(
        time => now - time < rateLimit.timeWindow
    );

    if (validRequests.length >= rateLimit.maxRequests) {
        throw new Error('Rate limit exceeded');
    }

    validRequests.push(now);
    rateLimit.requests.set(userId, validRequests);
}
