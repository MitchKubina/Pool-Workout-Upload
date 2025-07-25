import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ViewWorkout = () => {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await fetch(`/api/workouts/${id}`);
        if (!response.ok) throw new Error('Workout not found');
        const data = await response.json();
        setWorkout(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id]);

  if (loading) return <div>Loading workout...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!workout) return <div>Workout not found</div>;

  return (
    <div className="workout-detail">
      <h1 className = "text-6xl">{workout.title}</h1>
      <p className="author">By {workout.author}</p>
      
      {/* <p className="date">Created: {new Date(workout.created_at).toLocaleString()}</p> */}
      

      <div className="mt-7 workout-content">
        <ul className="sets-list">
          {workout.content.map((set, index) => (
            <li key={index} className="text-2xl set-item">
              <h3>{set.title}</h3>
              <p className = "text-xl">Set: {set.details}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewWorkout;