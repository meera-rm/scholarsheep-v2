/**
 * Socket Service — real-time communication with the backend.
 * Uses socket.io-client when available, falls back gracefully.
 */

let socket = null;
let listeners = {};

export function connectSocket(token) {
  try {
    const io = require('socket.io-client');
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3010';
    socket = io(API_URL, {
      auth: { token },
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    // Re-attach listeners
    Object.entries(listeners).forEach(([event, callbacks]) => {
      callbacks.forEach((cb) => socket.on(event, cb));
    });
  } catch {
    console.log('Socket.io not available — using polling fallback');
  }
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function onSocketEvent(event, callback) {
  if (!listeners[event]) listeners[event] = [];
  listeners[event].push(callback);
  if (socket) socket.on(event, callback);
}

export function offSocketEvent(event, callback) {
  if (listeners[event]) {
    listeners[event] = listeners[event].filter((cb) => cb !== callback);
  }
  if (socket) socket.off(event, callback);
}

export function isConnected() {
  return socket?.connected || false;
}
