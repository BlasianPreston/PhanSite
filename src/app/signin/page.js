import React from 'react';
import Link from 'next/link';
import '../../styles/signin.css';

export default function SignIn() {
    return(
        <div className='page'>
            <p className="title">Registration Form</p>
            <form className="App">
                <input type="email" placeholder='Email'/>
                <input type="password" placeholder='Password'/>
                <input type={"submit"} style={{ backgroundColor: "#a1eafb" }} />
                <Link href='/'><p className="back">Back</p></Link>
            </form>
        </div>
    )
} 