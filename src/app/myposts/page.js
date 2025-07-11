import React from 'react';
import Logo from '../../images/phantoms.jpg'
import Header from '../../components/PostsHeader.js'
import PostCard from '../../components/PostCard.js'
import Footer from '../../components/Footer.js'
import '../../styles/posts.css';

export default function Myposts() {
    return (
        <div className='page'>
            <Header />
            <div className='text'>
                <h1 className='title'>My Posts</h1>
                <div className='grid'><PostCard title="Phantom Thieves" image={Logo} description="Sample Description" user="User"/></div>
            </div>
            <Footer />
        </div>
    )
}