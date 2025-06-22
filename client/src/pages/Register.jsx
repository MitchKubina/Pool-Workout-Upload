export default function Register() {
    return (
        <div id = "register-root w-max">
            <div className = "justify-center size-auto bg-gray-400">
                <h1 className = "text-center color-red-600">This is the register page</h1>
            </div>

            <div className = "overflow-hidden h-screen flex items-center justify-center" id = "formDiv">
                <form className = "flex justify-center" id = "register">
                    <label className = "block pr-3" for = "username">Username: </label>
                    <input className = "bg-blue-200 border-solid border-blue-400" id = "username" type = "text"/>

                    <label className = "block pr-3" for = "username">Password: </label>
                    <input className = "bg-blue-200 border-solid border-blue-400" id = "password" type = "password"/>
                </form>
            </div>
        </div>
    );
}