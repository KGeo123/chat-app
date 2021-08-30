import { Server } from 'socket.io';

class IO {
  static connect(serverInstance) {
    const server = new Server(serverInstance, {
      cors: { origin: 'http://localhost:3000' }
    });
    this.server = server;
  }

  static getIO() {
    if (!this.server) {
      throw new Error('no socket.io server running');
    }
    return this.server;
  }
}

export default IO;
