import React from 'react';
import Logo from '../../images/phantoms.jpg'
import PostCard from '../../components/PostCard.js'
import '../../styles/posts.css';

export default function Posts() {
    return (
        <div className='page'>
            <h1 className='title'>Posts</h1>
            <div className='grid'><PostCard title="Phantom Thieves" image={Logo} description="Sample Description" user="User"/></div>
        </div>
    )
}