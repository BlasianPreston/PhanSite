import React from 'react';
import '../../styles/signin.css';

export default function SignIn() {
    return(
        <div className='page'>
            <p className="title">Registration Form</p>
            <form className="App">
                <input type="text" />
                <input type="email" />
                <input type="password" />
                <input type={"submit"}
                    style={{ backgroundColor: "#a1eafb" }} />
            </form>
        </div>
    )
} 