import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SLogo from '../images/phantoms.jpg';
import '../styles/signinheader.css'

export default function Signinheader() {
    return (
            <nav>
                <Link href='/'><Image src={SLogo} alt='Phantom Thieves Logo' className='logo'></Image></Link>
                <div className='account-pages'>
                    <Link href='/signin'><h3>Log In</h3></Link>
                    <Link href='/signup'><h3>Sign In</h3></Link>
                </div>    
            </nav>
    )
}