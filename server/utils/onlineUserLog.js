class onlineUserLog {
  constructor() {
    this.log = new Object();
  }

  getAll() {
    return this.log;
  }

  checkInLog(userId) {
    if (userId in this.log) return true;

    return false;
  }

  addUser(userId, socketId) {
    if (userId in this.log) return null;
    this.log[userId] = socketId;

    return userId;
  }

  removeUser(userId) {
    if (!(userId in this.log)) return null;
    delete this.log[userId];

    return userId;
  }
}

module.exports = new onlineUserLog();
