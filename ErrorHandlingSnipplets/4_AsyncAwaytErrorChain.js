// Exercise 4: Handle errors in promise chains
async function fetchUserData(userId) {
    try {
        const user = await getUser(userId);
        const permissions = await getUserPermissions(user);
        const settings = await getUserSettings(permissions);
        return settings;
    } catch (error) {
        console.error('Error in data fetching chain:', error);
        throw new Error(`Failed to fetch user data: ${error.message}`);
    }
}

async function getUser(id) {
    if (!id) throw new Error('Invalid user ID');
    return { id, name: 'John' };
}

async function getUserPermissions(user) {
    if (!user.name) throw new Error('User name required');
    return ['read', 'write'];
}

async function getUserSettings(permissions) {
    if (!permissions.includes('read')) {
        throw new Error('Insufficient permissions');
    }
    return { theme: 'dark' };
}

