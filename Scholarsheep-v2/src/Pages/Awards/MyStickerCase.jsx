import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StickerCase from '../../Components/awards/StickerCase';
import { getAllAwards } from '../../services/readingLogService';

const MyStickerCase = () => {
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getAllAwards();
      setAwards(data || []);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back links */}
        <div className="flex gap-3 mb-6">
          <Link
            to="/my-books"
            className="text-sm text-gray-500 hover:text-gray-700 transition"
          >
            ← My Books
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            to="/my-stats"
            className="text-sm text-gray-500 hover:text-gray-700 transition"
          >
            My Stats
          </Link>
        </div>

        <StickerCase awards={awards} />
      </div>
    </div>
  );
};

export default MyStickerCase;
