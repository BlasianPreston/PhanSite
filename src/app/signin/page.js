'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../../styles/signin.css';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle authentication logic in the future
        router.push('/posts');
    };

    return(
        <div className='page'>
            <p className="title">Sign In</p>
            <form className="App" onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Add required attributes
                />
                <input 
                    type="password" 
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input type="submit" value="Sign In" style={{ backgroundColor: "#a1eafb" }} />
                <Link href='/'><p className="back">Back</p></Link>
            </form>
        </div>
    )
} 