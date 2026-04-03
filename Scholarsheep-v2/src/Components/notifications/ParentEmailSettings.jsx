import React, { useState, useEffect } from 'react';
import { getParentEmailSettings, saveParentEmailSettings, getSentEmails } from '../../services/notificationService';
import { toast } from 'react-toastify';

const ParentEmailSettings = () => {
  const [settings, setSettings] = useState({ enabled: true, parentEmail: '', childName: '' });
  const [sentEmails, setSentEmails] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    setSettings(getParentEmailSettings());
    setSentEmails(getSentEmails().slice(0, 10));
  }, []);

  const handleSave = () => {
    saveParentEmailSettings(settings);
    toast.success('Email notification settings saved!');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="font-semibold text-gray-800 mb-1">Parent Email Notifications</h3>
      <p className="text-xs text-gray-400 mb-4">
        Get an email every time your child logs a reading session
      </p>

      <div className="space-y-4">
        {/* Enable toggle */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="enabled"
            checked={settings.enabled}
            onChange={handleChange}
            className="w-4 h-4 text-teal-500 rounded focus:ring-teal-400"
          />
          <span className="text-sm text-gray-700">Enable email notifications</span>
        </label>

        {/* Parent email */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Parent Email</label>
          <input
            type="email"
            name="parentEmail"
            value={settings.parentEmail}
            onChange={handleChange}
            placeholder="parent@example.com"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 outline-none"
          />
        </div>

        {/* Child name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Child's Name</label>
          <input
            type="text"
            name="childName"
            value={settings.childName}
            onChange={handleChange}
            placeholder="Alice"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 outline-none"
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-teal-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-teal-600 transition"
        >
          Save Settings
        </button>
      </div>

      {/* Email History */}
      {sentEmails.length > 0 && (
        <div className="mt-6 border-t border-gray-100 pt-4">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-sm text-teal-600 hover:text-teal-700 font-medium"
          >
            {showHistory ? 'Hide' : 'Show'} email history ({sentEmails.length})
          </button>

          {showHistory && (
            <div className="mt-3 space-y-2">
              {sentEmails.map((email) => (
                <div key={email.id} className="bg-gray-50 rounded-lg p-3 text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-700">
                        {email.childName} read {email.pagesRead} pages of "{email.bookTitle}"
                      </p>
                      <p className="text-gray-400 mt-0.5">To: {email.to}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-gray-400">
                        {new Date(email.sentAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                      {email.preview && (
                        <span className="text-orange-500 text-xs">(preview)</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ParentEmailSettings;
