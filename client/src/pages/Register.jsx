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
            const response = await axios.post('/register', formData);
            console.log('User registered:', response.data);
            setFormData({ name: '', username: '', password: '', password_confirm: '', affiliation: ''});
        } catch (err) {
            console.error('Error registering user:', err.response?.data || err.message);
        }
    };
    
    return (
    
        <div className = "w-full h-screen flex flex-col items-center" id = "register-root">
            <div className = "h-fit">
                <h1 className = "text-7xl text-center">Register your account</h1>
            </div>
            <div id = "some white ass space" className = "min-w-max min-h-20">
            </div>

            <div className = "w-1/2" id = "formDiv">
                <div className = "border border-blue-900">
                <form onSubmit = {handleSubmit} className = "justify-center" id = "register">
                    <div className = "p-1 grid grid-cols-2">    
                        <label className = "block pr-3" for = "username">Username: </label>
                        <input placeholder = "Username" onChange={handleChange} value = {formData.username} className = "border bg-blue-200 border-solid border-blue-400 placeholder-gray-600" id = "username" type = "text" required/>
                    </div>
                    <div className = "p-1 grid grid-cols-2">    
                        <label className = "block pr-3" for = "username">Name: </label>
                        <input placeholder = "Name" onChange={handleChange} value = {formData.name} className = "border bg-blue-200 border-solid border-blue-400 placeholder-gray-600" id = "name" type = "text"/>
                    </div>
                    <div className = "p-1 grid grid-cols-2">
                        <label className = "block pr-3" for = "username">Password: </label>
                        <input placeholder = "Password" value = {formData.password} onChange={handleChange} className = "border bg-blue-200 border-solid border-blue-400 placeholder-gray-600" id = "password" type = "password" required/>
                    </div>
                    <div className = "p-1 grid grid-cols-2">
                        <label className = "block pr-3" for = "username">Confirm Password: </label>
                        <input placeholder = "Confirm Password" onChange={handleChange} value = {formData.password_confirm} className = "border bg-blue-200 border-solid border-blue-400 placeholder-gray-600" id = "password_confirm" type = "password" required/>
                    </div>
                    <div className = "p-1 grid grid-cols-2">
                        <label className = "block pr-3" for = "username">Affiliation: </label>
                        <select placeholder = "Are you a swimmer or coach?" onChange={handleChange} value = {formData.affiliation} id = "affiliation" className = "border bg-blue-200">
                            <option value = "" disabled selected>Swimmer or Coach?</option>
                            <option value = "swimmer">Swimmer</option>
                            <option value = "Coach">Coach</option>
                        </select>
                    </div>
                    <button className = "p-1 justify-center border border-solid border-blue-400 hover:bg-blue-300" type = "submit">Register</button>
                </form>
                </div>
                <div>
                    <p>Already have an account? Login <a className = "text-blue-300" href = "/Login">Here</a></p>
                </div>
            </div>
        </div>
    );
}