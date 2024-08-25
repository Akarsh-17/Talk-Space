import io from 'socket.io-client';
const sockets = io('https://talk-space-dfqb.onrender.com', { autoConnect: true, forceNew: true });
// const sockets = io('/');
export default sockets;
