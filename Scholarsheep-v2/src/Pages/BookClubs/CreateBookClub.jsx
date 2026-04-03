import React, { useActionState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createClub } from '../../services/bookClubService';
import { toast } from 'react-toastify';

const CreateBookClub = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // React 19: useActionState handles form state, submission, and pending state
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const name = formData.get('name');
      if (!name?.trim()) return { error: 'Club name required' };

      try {
        const club = await createClub({
          name: name.trim(),
          description: formData.get('description') || '',
          bookTitle: formData.get('bookTitle') || '',
          bookCoverUrl: formData.get('bookCoverUrl') || '',
          createdBy: user?.username || 'teacher',
        });
        toast.success(`"${club.name}" created! Invite code: ${club.inviteCode || club.invite_code}`);
        navigate(`/book-clubs/${club.id}`);
        return { error: null };
      } catch {
        return { error: 'Failed to create club' };
      }
    },
    { error: null }
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-lg mx-auto">
        <Link to="/book-clubs" className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">
          ← Back to Book Clubs
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Create a Book Club</h1>

        {state.error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {state.error}
          </div>
        )}

        {/* React 19: form action instead of onSubmit */}
        <form action={formAction} className="bg-white rounded-2xl shadow-md p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Club Name *</label>
            <input name="name" required placeholder="e.g., Ms. Ramesh's Reading Warriors"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" rows={3} placeholder="What is this club about?"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 outline-none resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Book We're Reading</label>
            <input name="bookTitle" placeholder="e.g., Charlotte's Web"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Book Cover URL (optional)</label>
            <input name="bookCoverUrl" placeholder="https://covers.openlibrary.org/..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 outline-none" />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition disabled:opacity-50"
          >
            {isPending ? 'Creating...' : 'Create Club'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBookClub;
