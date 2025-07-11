'use client'

import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '../../images/phantoms.jpg'
import Header from '../../components/PostsHeader.js'
import PostCard from '../../components/PostCard.js'
import Footer from '../../components/Footer.js'
import '../../styles/posts.css';

export default function Create() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle authentication logic in the future
        router.push('/allposts');
    };

    return (
        <div className='page'>
            <div className='text'>
                <h1 className='title'>Create Post</h1>
                <form className="App" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input 
                    type="image" 
                    placeholder='Image'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input type="submit" value="Sign In" style={{ backgroundColor: "#a1eafb" }} />
                <Link href='/'><p className="back">Back</p></Link>
            </form>
            </div>
        </div>
    )
}