import { useState, useEffect } from 'react';
import Loading from './Loading';
import Profile from './Profile';

const REPO_NAMES = [
  'CapstoneGroup5',
  'CapstoneGroup5Backend',
  'CapstoneGroup5-v2',
  'CapstoneGroup5-v2-backend',
];

function AllReposInfo() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useState('meera-ramesh19');

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${user}/repos?per_page=30&sort=updated`
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          const matched = data.filter((r) => REPO_NAMES.includes(r.name));
          setItems(matched.length > 0 ? matched : data.slice(0, 6));
        }
      } catch (err) {
        console.error('Failed to fetch repos:', err);
      }
      setLoading(false);
    };
    fetchRepos();
  }, [user]);

  return (
    <div className='pt-10'>
      <h1 className='mb-6 font-bold text-2xl text-teal-700'>
        {user}'s Repositories
      </h1>

      {loading ? (
        <Loading />
      ) : items.length === 0 ? (
        <p className='text-gray-400 text-center py-8'>No repositories found. GitHub API may be rate-limited.</p>
      ) : (
        <div className='w-4/5 md:w-3/4 m-auto space-y-4'>
          {items.map((item) => (
            <Profile key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllReposInfo;
