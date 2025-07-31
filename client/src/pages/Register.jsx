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

    const [error, setError] = useState(false)

    const handleChange = (e) => {
        setFormData({ 
            ...formData, 
            [e.target.id]: e.target.value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            const response = await axios.post('/register', formData)
                .then(response => {
                    if (response.data.redirect) {
                    window.location.href = response.data.redirect;
                    }
                })
                .catch(error => {
                    console.error('Registration error:', error);
                });
            console.log('User registered:', response.data);
            setFormData({ name: '', username: '', password: '', password_confirm: '', affiliation: ''});
        } catch (err) {
            setError(true);
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

            <div className = "w-1/4" id = "formDiv">
                <div className = "rounded-lg flex justify-center w-full">
                    <form onSubmit = {handleSubmit} className = "text-center w-full" id = "register">
                        <div className = "p-1 w-full">    
                            {/* <label className = "block pr-3" for = "username">Username: </label> */}
                            <input placeholder = "Username" onChange={handleChange} value = {formData.username} className = "w-full border bg-blue-200 border-solid border-blue-400 placeholder-gray-800" id = "username" type = "text" required/>
                        </div>
                        <div className = "p-1">    
                            {/* <label className = "block pr-3" for = "username">Name: </label> */}
                            <input placeholder = "Name" onChange={handleChange} value = {formData.name} className = "w-full border bg-blue-200 border-solid border-blue-400 placeholder-gray-800" id = "name" type = "text"/>
                        </div>
                        <div className = "p-1">
                            {/* <label className = "block pr-3" for = "username">Password: </label> */}
                            <input placeholder = "Password" value = {formData.password} onChange={handleChange} className = "w-full border bg-blue-200 border-solid border-blue-400 placeholder-gray-800" id = "password" type = "password" required/>
                        </div>
                        <div className = "p-1">
                            {/* <label className = "block pr-3" for = "username">Confirm Password: </label> */}
                            <input placeholder = "Confirm Password" onChange={handleChange} value = {formData.password_confirm} className = "w-full border bg-blue-200 border-solid border-blue-400 placeholder-gray-800" id = "password_confirm" type = "password" required/>
                        </div>
                        <div className = "p-1">
                            {/* <label className = "block pr-3" for = "username">Affiliation: </label> */}
                            <select placeholder = "Are you a swimmer or coach?" onChange={handleChange} value = {formData.affiliation} id = "affiliation" className = " border-solid border-blue-400 w-full border bg-blue-200">
                                <option value = "" disabled selected>Swimmer or Coach?</option>
                                <option value = "swimmer">Swimmer</option>
                                <option value = "Coach">Coach</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div className = "p-1 justify-start">
                    <button className = "p-1 justify-start border border-solid bg-blue-200 border-blue-400 hover:bg-blue-300" form = "register" type = "submit">Register</button>
                </div>
                <div className = "p-1 justify-start">
                    <p className = "text-sm">Already have an account? Login <a className = "text-blue-300" href = "/Login">Here</a></p>
                </div>
                {error === true ? (<div className = "text-md text-red-500">Username already exists</div>) : (<div></div>)}
            </div>
        </div>
    );
}