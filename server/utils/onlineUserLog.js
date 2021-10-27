class onlineUser {
  constructor(userId, socketId) {
    this.userId = userId;
    this.socketId = socketId;
  }
}

class onlineUserLog {
  constructor() {
    this.log = new Array();
  }

  getAll() {
    return this.log;
  }

  checkInLog(userId) {
    for (let i = 0; i < this.log.length; i++) {
      if (this.log[i].userId === userId) {
        return true;
      }
    }
    return false;
  }

  getUserIndex(userId) {
    for (let i = 0; i < this.log.length; i++) {
      if (this.log[i].userId === userId) {
        return i;
      }
    }
    return -1;
  }

  addUser(userId, socketId) {
    let user = new onlineUser(userId, socketId);
    this.log.push(user);
    return user;
  }

  removeUser(userId) {
    let index = this.getUserIndex(userId);
    if (index !== -1) this.log.splice(index, 1);
  }
}

module.exports = new onlineUserLog();
