import {useState} from "react"
import axios from "axios"

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
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
            const response = await axios.post('/login', formData)
            .then(response => {
                    if (response.data.redirect) {
                    window.location.href = response.data.redirect;
                    }
                })
            .catch(err => {
                console.log(err);
            });
            console.log('User logged in:', response.data);
            setFormData({ username: '', password: ''});
        } catch (err) {
            console.error('Error Logging in', err.response?.data || err.message);
        }
    };
    
    return (
    
        <div className = "w-full h-screen flex flex-col items-center" id = "register-root">
            <div className = "h-fit">
                <h1 className = "text-7xl text-center">Login</h1>
            </div>
            <div id = "some white ass space" className = "min-w-max min-h-20">
            </div>

            <div className = "w-1/5" id = "formDiv">
                <div className = "rounded-lg flex justify-center w-full">
                    <form onSubmit = {handleSubmit} className = "text-center w-full" id = "register">
                        <div className = "p-1 w-full">    
                            {/* <label className = "block pr-3" for = "username">Username: </label> */}
                            <input placeholder = "Username" onChange={handleChange} value = {formData.username} className = "w-full border bg-blue-200 border-solid border-blue-400 placeholder-gray-800" id = "username" type = "text" required/>
                        </div>
                        <div className = "p-1">
                            {/* <label className = "block pr-3" for = "username">Password: </label> */}
                            <input placeholder = "Password" value = {formData.password} onChange={handleChange} className = "w-full border bg-blue-200 border-solid border-blue-400 placeholder-gray-800" id = "password" type = "password" required/>
                        </div>
                    </form>
                </div>
                <div className = "p-1 justify-start">
                    <button className = "p-1 justify-start border border-solid bg-blue-200 border-blue-400 hover:bg-blue-300" form = "register" type = "submit">Login</button>
                </div>
                <div className = "p-1 justify-start">
                    <p className = "text-sm">Don't have an account? Register <a className = "text-blue-300" href = "/Register">Here</a></p>
                </div>
            </div>
        </div>
    );
}