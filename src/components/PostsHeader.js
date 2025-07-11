import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SLogo from '../images/phantoms.jpg';
import '../styles/header.css'

export default function Postsheader() {
    return (
            <nav>
                <Link href='/allposts'><Image src={SLogo} alt='Phantom Thieves Logo' className='logo'></Image></Link>
                <div className='account-pages'>
                    <Link href='/allposts'><h3>All Posts</h3></Link>
                    <Link href='/myposts'><h3>My Posts</h3></Link>
                </div>    
            </nav>
    )
}