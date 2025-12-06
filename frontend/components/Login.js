// frontend/src/components/Login.js
import { useState } from 'react'; //
import { useAuth } from '../context/AuthContext'; //

function Login() { //
    const [email, setEmail] = useState(''); // Corrected syntax
    const [password, setPassword] = useState(''); //
    const { login } = useAuth(); // Corrected syntax

    const handleSubmit = async (e) => { // Corrected syntax
        e.preventDefault(); //
        await login(email, password); //
    }; //

    return ( //
        <form onSubmit={handleSubmit}> //
            <h2>Login</h2>
            <input //
                type="email" //
                value={email} //
                onChange={(e) => setEmail(e.target.value)} // Corrected arrow function syntax
                placeholder="Email"
                required //
            />
            <input //
                type="password" //
                value={password} //
                onChange={(e) => setPassword(e.target.value)} // Corrected arrow function syntax
                placeholder="Password"
                required //
            />
            <button type="submit">Login</button> //
        </form> //
    ); //
}

export default Login;