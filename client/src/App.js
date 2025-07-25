import {Routes, Route} from 'react-router-dom';
import Header from './components/Header'
import Home from './pages/Home'
import Search from './pages/Search'
import CreateWorkout from './pages/CreateWorkout'
import Register from './pages/Register'
import Login from './pages/Login'
import ViewWorkout from './pages/ViewWorkout'


export default function App() {
  return (
    <div>
      <Header />
      <div className = "p-4">
        <Routes>
          <Route path = "/" element = {<Home />}/>
          <Route path = "/Search" element = {<Search />}/>  
          <Route path = "/CreateWorkout" element = {<CreateWorkout />}/>
          <Route path = "/Register" element = {<Register />}/>
          <Route path = "/Login" element = {<Login />}/>
          <Route path="/view-workout/:id" element={<ViewWorkout />} />
        </Routes>
      </div>
    </div>
  );
}
