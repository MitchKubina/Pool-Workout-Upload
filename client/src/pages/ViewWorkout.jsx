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
  <div className="workout-detail flex flex-col items-center min-h-screen">
    <h1 className="text-center text-6xl">{workout.title}</h1>
    <p className="text-center author">By {workout.author}</p>
    
    <div className="show-workout flex justify-center w-1/2 border-x-2 border-blue-200 flex-grow">
      <div className="pl-6 w-full workout-content">
        <ul className="sets-list">
          {workout.content.map((set, index) => (
            <li key={index} className="mt-4 text-2xl set-item">
              <h3>{set.title}</h3>
              <p className="text-xl">Set: {set.details}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  );
};

export default ViewWorkout;