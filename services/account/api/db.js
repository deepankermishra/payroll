/* NOTE:
*     Will be maintained in a DB in production and would be multi-tenanted.
*     For simplicity we are maintaining it in memory assuming single tenant.
*/
const cryptoUtils = require('./crypto_utils');

const USERS_TABLE = {};

class User {
    constructor({ username, password, isAdmin = false, name }) {
        this.username = username;
        this.password = cryptoUtils.hashPassword(password);
        this.isAdmin = isAdmin;
        this.name = name;
    }

    describe() {
        return `${this.name} (${this.username}), Admin: ${this.isAdmin ? 'Yes' : 'No'}`;
    }
}

function addUser(userData) {
  if (!userData.username) {
    throw new Error("Username is required for creating a new user.");
  }
  const newUser = new User(userData);
  USERS_TABLE[userData.username.toLowerCase()] = newUser;
}


function deleteUser(username) {
    if (USERS_TABLE.hasOwnProperty(username)) {
        delete USERS_TABLE[userId];
        return true;
    }
    return false;
}

function getUserByUsername(username) {
  return Object.values(USERS_TABLE).find(u => u.username.toLowerCase() === username.toLowerCase())
}

// Add admin. We will do this manually for each tenant at tenant setup time.
addUser({ username: 'admin', password: 'password', isAdmin: true, name: 'Admin' })


module.exports = {
    addUser,
    deleteUser,
    getUserByUsername,
    USERS_TABLE // Exporting for unit testing or other modules to access
}
