export default function Register() {
    return (
        <div id = "register-root w-max">
            <div className = "justify-center bg-yellow-100">
                <h1 className = "text-center text-green-600">This is the register page</h1>
            </div>

            <div className = "overflow-hidden h-screen flex items-center justify-center" id = "formDiv">
                <form className = "justify-center" id = "register">
                    <div className = "grid grid-cols-2">
                        <label className = "block pr-3" for = "username">Username: </label>
                        <input className = "border bg-blue-200 border-solid border-blue-400" id = "username" type = "text"/>
                    </div>
                    <div className = "grid grid-cols-2">
                        <label className = "block pr-3" for = "username">Password: </label>
                        <input className = "border bg-blue-200 border-solid border-blue-400" id = "password" type = "password"/>
                    </div>
                    <button className = "border border-solid border-blue-400 hover:bg-blue-300" type = "submit">Register</button>
                </form>
            </div>
        </div>
    );
}