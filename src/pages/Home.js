import React from 'react';
import Image from 'next/image';
import BLogo from '../images/phantoms_big.jpg'
import Footer from '../components/Footer.js'
import Signinheader from '../components/SigninHeader';
import '../styles/home.css'

export default function Home() {
    return(
        <div className='page'>
            <Signinheader />
            <div className='text'>
                <h2>One Stop Site for the Phantom Thieves</h2>
                <Image src={BLogo} alt='Phantom Thieves Logo Big'></Image>
                <h4>Need a change of heart?</h4>
                <h5>They've got you covered!</h5>
            </div>
            <Footer />        
        </div>
    )
}