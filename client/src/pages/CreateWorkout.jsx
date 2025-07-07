import { useState } from 'react';

export default function AddWorkout() {
  // State to track all sets (each set has title and details)
  const [sets, setSets] = useState([{ title: '', details: '' }]);

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
    console.log('Final sets:', sets); // Replace with your API call
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Swim Workout</h1>
      
      <form onSubmit={handleSubmit}>
        {/* Dynamically generated set inputs */}
        {sets.map((set, index) => (
          <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
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
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + Add Another Set
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save Workout
          </button>
        </div>
      </form>
    </div>
  );
}