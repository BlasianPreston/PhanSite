import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../images/phantoms.jpg'
import '../../styles/posts.css';

export default function Posts() {
    return (
        <div className='page'>
            <h1 className='title'>Posts</h1>
            <div className='card'>
                    <h1>Phantom Thieves</h1>
                    <Image src={Logo} alt ='Phantom Thieves Logo'/>
                    <h3>This is a post about the Phantom Thieves</h3>
                    <h4>Made by: User</h4>
            </div>
        </div>
    )
}