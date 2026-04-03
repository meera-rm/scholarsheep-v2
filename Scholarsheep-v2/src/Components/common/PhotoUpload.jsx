import React, { useState, useRef } from 'react';

/**
 * PhotoUpload — lets user either upload a photo or use a generated avatar.
 *
 * Props:
 *   name       - the name used for the DiceBear seed
 *   value      - current avatar URL
 *   onChange   - callback with the new URL string
 */
const PhotoUpload = ({ name, value, onChange }) => {
  const [mode, setMode] = useState(value ? 'current' : 'generate');
  const fileInputRef = useRef(null);

  const generatedUrl = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(name || 'student')}`;
  const displayUrl = value || generatedUrl;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Convert to base64 data URL for local storage / preview
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result);
      setMode('uploaded');
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (e) => {
    onChange(e.target.value);
  };

  const handleGenerate = () => {
    const seeds = ['Zoey', 'Lucy', 'Zoe', 'Leo', 'Loki', 'Luna', 'Bella', 'Milo', 'Felix', 'Charlie', 'Cali', 'Bear'];
    const randomSeed = seeds[Math.floor(Math.random() * seeds.length)] + Math.floor(Math.random() * 100);
    const url = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${randomSeed}`;
    onChange(url);
    setMode('generated');
  };

  return (
    <div className="mb-4">
      <label className="mb-2 uppercase font-bold text-lg text-grey-darkest block">
        Photo
      </label>

      {/* Preview */}
      <div className="flex items-center gap-4 mb-3">
        <img
          src={displayUrl}
          alt="avatar preview"
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
          onError={(e) => { e.target.src = generatedUrl; }}
        />
        <div className="text-sm text-gray-500">
          {mode === 'uploaded' && 'Photo uploaded'}
          {mode === 'generated' && 'Avatar generated'}
          {mode === 'current' && 'Current photo'}
          {mode === 'generate' && 'Auto-generated avatar'}
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-wrap gap-2 mb-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="bg-teal-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-teal-600 transition"
        >
          Upload Photo
        </button>
        <button
          type="button"
          onClick={handleGenerate}
          className="bg-indigo-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
        >
          Generate Avatar
        </button>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Or paste a URL */}
      <input
        type="text"
        value={value || ''}
        onChange={handleUrlChange}
        placeholder="Or paste an image URL..."
        className="border py-2 px-3 text-grey-darkest w-full text-sm rounded"
      />
    </div>
  );
};

export default PhotoUpload;
