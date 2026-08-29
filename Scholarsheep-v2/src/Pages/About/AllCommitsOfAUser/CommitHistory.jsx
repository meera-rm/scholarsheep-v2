import { useState, useEffect } from 'react';
import './CommitHistory.scss';

function CommitHistory() {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        // Try v2 repo first, fall back to original
        const repos = ['Scholarsheep-v2', 'Shcolarsheep-v2-backend'];
        let allCommits = [];

        for (const repo of repos) {
          try {
            const res = await fetch(
              `https://api.github.com/repos/meera-rm/${repo}/commits?per_page=5`
            );
            if (res.ok) {
              const data = await res.json();
              allCommits = [...allCommits, ...data.map((c) => ({ ...c, repo }))];
            }
          } catch { /* skip */ }
        }

        // Sort by date, newest first
        allCommits.sort((a, b) => new Date(b.commit.committer.date) - new Date(a.commit.committer.date));
        setCommits(allCommits.slice(0, 10));
      } catch (err) {
        console.error('Failed to fetch commits:', err);
      }
      setLoading(false);
    };
    fetchCommits();
  }, []);

  function generateDays(dateStr) {
    const committed = new Date(dateStr);
    const today = new Date();
    const diff = Math.abs(today - committed);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'today';
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  }

  return (
    <div className="latestChanges">
      <div className="latestChanges__title">Latest Project Commits</div>
      {loading ? (
        <p className="text-gray-400 text-center py-4">Loading commits...</p>
      ) : commits.length === 0 ? (
        <p className="text-gray-400 text-center py-4">No commits found. GitHub API may be rate-limited.</p>
      ) : (
        commits.map((commit, i) => (
          <div className="latestChanges__item" key={commit.sha || i}>
            <div className="latestChanges__progress">
              <div className="latestChanges__progressBall"></div>
            </div>
            <div className="lastestChanges__itemContent">
              <div className="latestChanges__timeAgo">
                {generateDays(commit.commit.committer.date)}
                {commit.repo && <span className="text-xs text-teal-500 ml-2">({commit.repo})</span>}
              </div>
              <div className="latestChanges__message">{commit.commit.message.trim()}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CommitHistory;
