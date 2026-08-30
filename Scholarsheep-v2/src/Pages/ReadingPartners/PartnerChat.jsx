import { useState, useCallback } from 'react';
import { usePolling } from '../hooks/usePolling';

function PartnerChat({ partnershipId, token }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/reading-partners/${partnershipId}/chat`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  }, [partnershipId, token]);

  // Poll every 3 seconds while this component is mounted (i.e. chat is open)
  usePolling(fetchMessages, 3000, true);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/reading-partners/${partnershipId}/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: newMessage }),
        }
      );
      setNewMessage('');
      fetchMessages(); // refresh immediately after sending, don't wait for next poll
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  return (
    <div>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.username}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default PartnerChat;