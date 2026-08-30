import { useState, useEffect } from 'react';
import PartnerChat from './PartnerChat/PartnerChat';

function ReadingPartners({ token }) {
  const [partnerships, setPartnerships] = useState([]);
  const [selectedPartnership, setSelectedPartnership] = useState(null);
  const [inviteCode, setInviteCode] = useState('');

  const fetchPartnerships = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/reading-partners`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setPartnerships(data.partnerships || []);
    } catch (err) {
      console.error('Failed to fetch partnerships:', err);
    }
  };

  useEffect(() => {
    fetchPartnerships();
  }, []);

  const acceptInvite = async () => {
    if (!inviteCode.trim()) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/reading-partners/accept`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ invite_code: inviteCode }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setInviteCode('');
        fetchPartnerships();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('Failed to accept invite:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-teal-600 mb-6">Reading Partners</h2>

      <div className="mb-8 flex gap-2">
        <input
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          placeholder="Enter invite code"
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={acceptInvite}
          className="bg-teal-500 text-white px-4 py-2 rounded"
        >
          Join
        </button>
      </div>

      <div className="space-y-3">
        {partnerships.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelectedPartnership(p)}
            className="border p-3 rounded cursor-pointer hover:bg-gray-50"
          >
            <p className="font-semibold">
              {p.student1_name} & {p.student2_name || 'Waiting for partner...'}
            </p>
            <p className="text-sm text-gray-500">{p.book_title || 'No book selected'}</p>
          </div>
        ))}
      </div>

      {selectedPartnership && (
        <div className="mt-8">
          <button
            onClick={() => setSelectedPartnership(null)}
            className="text-sm text-teal-600 mb-2"
          >
            ← Back to list
          </button>
          <PartnerChat partnershipId={selectedPartnership.id} token={token} />
        </div>
      )}
    </div>
  );
}

export default ReadingPartners;