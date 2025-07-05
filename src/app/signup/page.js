import React from 'react';
import '../../styles/signin.css';

export default function Signup() {
    return(
        <div className='page'>
            <p className="title">Sign Up</p>
            <form className="App">
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Confirm Password" />
                <input type="submit" value="Register" style={{ backgroundColor: "#a1eafb" }} />
            </form>
        </div>
    )
} 