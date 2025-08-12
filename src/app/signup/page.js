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


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password, confirmPassword }),
                credentials: "include"
            });
            
            const data = await res.json();
            
            if (res.ok) {
                alert("Account created!");
                router.push("/allposts");
            } else {
                alert(data.error || "Account creation failed!");
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("An error occurred during signup");
        }
    };

    return (
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