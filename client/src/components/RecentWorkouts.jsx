// src/components/RecentWorkouts.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const RecentWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/workouts/recent`);
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
            <Link to={`/view-workout/${workout.id}`} key={workout.id} className="workout-link">
              <div className="workout-card border mt-3 p-2">
                <h3>{workout.title}</h3>
                <p className="meta">By {workout.author} • {workout.created_at}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No workouts found</p>
      )}
    </div>
  );
};

export default RecentWorkouts;