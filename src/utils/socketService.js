import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = 'https://jvs-project-backend.vercel.app';  // Update with your actual server URL

// Create a single socket connection
const socket = io(SOCKET_SERVER_URL, {
  path: '/socket.io',  // Ensure it matches with the backend
  transports: ['websocket'],  // Optional: add transports for connection stability
  reconnectionAttempts: 3  // Optional: configure reconnection attempts
});

export default socket;
