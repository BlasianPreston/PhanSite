'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../../styles/signin.css';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle registration logic
        // For now, we'll just redirect to posts page
        router.push('/posts');
    };

    return(
        <div className='page'>
            <p className="title">Sign Up</p>
            <form className="App" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input 
                    type="email" 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input 
                    type="password" 
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <input type="submit" value="Register" style={{ backgroundColor: "#a1eafb" }} />
                <Link href='/'><p className="back">Back</p></Link>
            </form>
        </div>
    )
} 