import { Server } from 'socket.io';

class Socket {
  io;
  static connect(server) {
    this.io = new Server(server);
  }

  static getIo() {
    if (!this.io) {
      throw new Error('could not find connection');
    }
    return this.io;
  }
}

export default Socket;
