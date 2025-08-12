import React from 'react';
import Image from 'next/image';
import '../styles/post_card.css';

export default function PostCard(props) {
    return (
        <div className='card'>
            <h1>{props.title}</h1>
            <div className='image'>
                <Image 
                    src={props.image} 
                    alt='Phantom Thieves Logo'
                    width={400}
                    height={300}
                    style={{ objectFit: 'contain' }}
                />
            </div>
            <h3>{props.description}</h3>
            <h4>Made by: {props.user}</h4>
        </div>
    )
}