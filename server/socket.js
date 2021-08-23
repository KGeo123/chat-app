import { Server } from 'socket.io';

class Socket {
  io;
  static connect(server) {
    this.io = new Server(server);
  }

  static getIo() {
    if (!io) {
      throw new Error('could not find connection');
    }
    return io;
  }
}

export default Socket;
