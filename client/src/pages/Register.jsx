import {useState} from "react"
import axios from "axios"

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        password_confirm: '',
        affiliation: ''
    });

    const handleChange = (e) => {
        setFormData({ 
            ...formData, 
            [e.target.id]: e.target.value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/register', formData); // 👈 goes to backend
            console.log('User registered:', response.data);
        } catch (err) {
            console.error('Error registering user:', err.response?.data || err.message);
        }
    };
    
    return (
    
        <div id = "register-root">
            <div className = "h-1/2 justify-center">
                <h1 className = "text-7xl text-center">Register your account</h1>
            </div>
            <div id = "some white ass space" className = "min-w-max min-h-20">
            </div>

            <div className = "overflow-hidden h-auto flex items-center justify-center" id = "formDiv">
                <form onSubmit = {handleSubmit} className = "" id = "register">
                    <div className = "p-1 grid grid-cols-2">    
                        <label className = "block pr-3" for = "username">Username: </label>
                        <input onChange={handleChange} value = {formData.username} className = "border bg-blue-200 border-solid border-blue-400" id = "username" type = "text" required/>
                    </div>
                    <div className = "p-1 grid grid-cols-2">    
                        <label className = "block pr-3" for = "username">Name: </label>
                        <input onChange={handleChange} value = {formData.name} className = "border bg-blue-200 border-solid border-blue-400" id = "name" type = "text"/>
                    </div>
                    <div className = "p-1 grid grid-cols-2">
                        <label className = "block pr-3" for = "username">Password: </label>
                        <input value = {formData.password} onChange={handleChange} className = "border bg-blue-200 border-solid border-blue-400" id = "password" type = "password" required/>
                    </div>
                    <div className = "p-1 grid grid-cols-2">
                        <label className = "block pr-3" for = "username">Confirm Password: </label>
                        <input onChange={handleChange} value = {formData.password_confirm} className = "border bg-blue-200 border-solid border-blue-400" id = "password_confirm" type = "password" required/>
                    </div>
                    <div className = "p-1 grid grid-cols-2">
                        <label className = "block pr-3" for = "username">Affiliation: </label>
                        <select onChange={handleChange} value = {formData.affiliation} id = "affiliation" className = "border bg-blue-200">
                            <option value = "swimmer">Swimmer</option>
                            <option value = "Coach">Coach</option>
                        </select>
                    </div>
                    <button className = "p-1 justify-center border border-solid border-blue-400 hover:bg-blue-300" type = "submit">Register</button>
                </form>
            </div>
        </div>
    );
}