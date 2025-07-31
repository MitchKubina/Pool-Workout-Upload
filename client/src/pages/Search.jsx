import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Search() {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!search.trim()) {
            setError('Workout title is required');
            return;
        }

        setIsSubmitting(true);
        
        try {
            const response = await axios.get(`/api/workouts/search?title=${encodeURIComponent(search)}`);
            setSearchResults(response.data);
        } catch (err) {
            console.error('Search error:', err);
            setError(err.response?.data?.error || 'Failed to search workouts');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div id="search-div" className="flex flex-col items-center min-w-full p-4">
            <form className="mt-5 w-full md:w-1/2" onSubmit={handleSubmit}>
                <input 
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="text-lg p-3 border-2 border-blue-300 rounded-sm w-full"
                    type="text" 
                    placeholder="Search Workout Names Here"
                    disabled={isSubmitting}
                />
                <button 
                    className="mt-2 p-2 px-4 border-2 rounded-sm border-solid bg-blue-200 border-blue-400 hover:bg-blue-300 disabled:opacity-50"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Searching...' : 'Search'}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>

            {/* Search Results Section */}
            <div className="mt-8 w-full md:w-1/2">
                {searchResults.length > 0 ? (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Search Results</h2>
                        {searchResults.map(workout => (
                            <Link 
                                to={`/view-workout/${workout.id}`}
                                key={workout.id}
                                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <h3 className="text-lg font-medium">{workout.title}</h3>
                                <p className="text-gray-600">By {workout.author}</p>
                                <p className="text-sm text-gray-500">
                                    Created: {new Date(workout.created_at).toLocaleDateString()}
                                </p>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-center py-4">No workouts found matching "{search}"</p>
                )}
            </div>
        </div>
    );
}