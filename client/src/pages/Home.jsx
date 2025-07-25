import RecentWorkouts from '../components/RecentWorkouts';

export default function Home() {
    return (
    <div class = "Home Page">
        <main>
            <h2 className = "text-6xl text-center">Lap-Swim</h2>
            <RecentWorkouts />
        </main>
    </div>
    );
}