import React from 'react';
import Image from 'next/image';
import SLogo from '../images/phantoms.jpg';
import BLogo from '../images/phantoms_big.jpg'
import '../styles/home.css'

export default function Home() {
    return(
        <div>
            <nav>
                <Image src={SLogo} alt='Phantom Thieves Logo' className='logo'></Image>
                <div className='account-pages'>
                    <h3>Log In</h3>
                    <h3>Sign In</h3>
                </div>    
            </nav>
            <div className='text'>
                <h2>One Stop Site for the Phantom Thieves</h2>
                <Image src={BLogo} alt='Phantom Thieves Logo Big'></Image>
                <h4>Need a change of heart?</h4>
                <h5>They've got you covered!</h5>
            </div>        
        </div>
    )
}