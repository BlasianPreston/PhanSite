import React from 'react';
import Image from 'next/image';
import SLogo from '../images/phantoms.jpg';
import BLogo from '../images/phantoms_big.jpg'

export default function Home() {
    return(
        <div>
            <nav>
                <Image src={SLogo} alt='Phantom Thieves Logo'></Image>
                <h3>Log In</h3>
                <h3>Sign In</h3>    
            </nav>
            <div>
                <h2>One Stop Site for the Phantom Thieves</h2>
                <h4>Need a change of heart?</h4>
                <h5>They've got you covered</h5>
            </div>        
        </div>
    )
}