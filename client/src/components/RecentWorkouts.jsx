// src/components/RecentWorkouts.js
import { useState, useEffect } from 'react';

const RecentWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('/api/workouts/recent');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWorkouts(data.workouts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <div className="loading">Loading workouts...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="recent-workouts">
      <h2 className = "text-3xl">Recent Workouts</h2>
      {workouts.length > 0 ? (
        <div className="workouts-list">
          {workouts.map((workout) => (
            <a className = "" href = "/view_workout">
            <div key={workout.id} className="workout-card border mt-3 p-2">
              <h3>{workout.title}</h3>
              <p className="meta">By {workout.author} • {workout.created_at}</p>
            </div>
            </a>
          ))}
        </div>
      ) : (
        <p>No workouts found</p>
      )}
    </div>
  );
};

export default RecentWorkouts;