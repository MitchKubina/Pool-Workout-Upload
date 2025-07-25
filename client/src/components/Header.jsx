export default function Header() {
    // Example frontend logout handler
    function logout() {
    // Call the logout endpoint
        fetch('/Logout', {
            method: 'POST',
            credentials: 'include' // Needed if using HTTP-only cookies
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
            // Remove token from client storage
            localStorage.removeItem('token');
            // Redirect to login page
            window.location.href = '/';
            }
        });
    }
  
    return (
    <nav class="border-blue-300 bg-blue-200">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-blue-200 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                    <li>
                    <a href="/" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</a>
                    </li>
                    <li>
                    <a href="/Search" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Search</a>
                    </li>
                    <li>
                    <a href="/CreateWorkout" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Create a Workout</a>
                    </li>
                </ul>
            </div>
            <a href="/Register" className = "right-full w-10 aspect-square">
                <img src="/swimmer.png" className = "size-fit" alt = "swimmer"/>
            </a>
            <button onClick = {logout}>logout</button>
        </div>
    </nav>
  );
}

// <a href="https://www.flaticon.com/free-icons/swimming-pool" title="swimming pool icons">Swimming pool icons created by Freepik - Flaticon</a>
