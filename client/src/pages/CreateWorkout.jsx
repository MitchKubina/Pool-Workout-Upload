import { useState } from 'react';
import axios from "../api/axios"

export default function AddWorkout() {
  // State to track all sets (each set has title and details)
  const [workoutTitle, setWorkoutTitle] = useState('');
  const [sets, setSets] = useState([{ title: '', details: '' }]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state


  // Add a new empty set
  const addSet = () => {
    setSets([...sets, { title: '', details: '' }]);
  };

  // Update a specific set's field
  const handleSetChange = (index, field, value) => {
    const updatedSets = [...sets];
    updatedSets[index][field] = value;
    setSets(updatedSets);
  };

  // Remove a set
  const removeSet = (index) => {
    if (sets.length > 1) {
      const updatedSets = sets.filter((_, i) => i !== index);
      setSets(updatedSets);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Workout:', workoutTitle);
    console.log('Final sets:', sets); // Replace with your API call
    setIsSubmitting(true);
    setError(null);

    try {
      if (!workoutTitle.trim()) {
        throw new Error('Workout title is required');
      }
      const token = localStorage.getItem('token');

      const response = axios.post("/createWorkout", {
        title: workoutTitle, 
        sets: sets.filter(set => set.title.trim() && set.details.trim()),
      });
      setWorkoutTitle('');
      setSets([{ title: '', details: '' }]); // Reset to one empty set
      
      // Optional: Redirect or show success message
      alert('Workout saved successfully!');
    } catch (err) {
      console.log("Failed to save workout:", err);
    } finally {
      setIsSubmitting(false)
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Swim Workout</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className = "mb-6 p-4 bg-blue-200 rounded-sm"> 
          <input type = "text" value = {workoutTitle} onChange = {e => setWorkoutTitle(e.target.value)} placeholder = "Workout Title" className = "p-2 w-full border rounded"></input>
        </div>
        {/* Dynamically generated set inputs */}
        {sets.map((set, index) => (
          <div key={index} className="mb-6 p-4 bg-blue-200 rounded-sm">
            <div className="flex justify-between items-center mb-2">
              <label className="block font-medium">Set {index + 1}</label>
              {sets.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSet(index)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={set.title}
                onChange={(e) => handleSetChange(index, 'title', e.target.value)}
                placeholder="Set Title (e.g., Warmup, Main Set)"
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                value={set.details}
                onChange={(e) => handleSetChange(index, 'details', e.target.value)}
                placeholder="Set Details (e.g., 4x100 Freestyle @ 1:30)"
                className="w-full p-2 border rounded"
                rows={3}
                required
              />
            </div>
          </div>
        ))}

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={addSet}
            className="bg-blue-400 text-white px-4 py-2 rounded"
          >
            + Add Another Set
          </button>
           <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-blue-500 text-white px-4 py-2 rounded ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
            >
              {isSubmitting ? 'Saving...' : 'Save Workout'}
            </button>
        </div>
      </form>
    </div>
  );
}