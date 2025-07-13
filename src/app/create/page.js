'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/PostsHeader.js'
import Footer from '../../components/Footer.js'
import { v4 as uuidv4 } from 'uuid';
import '../../styles/create.css';

export default function Create() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const router = useRouter();
    
    const handleImageChange = (e) => {
        const value = e.target.value;
        setImage(value);
        setImagePreview(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple form validation
        if (!title.trim() || !description.trim() || !image.trim()) {
            alert('Please fill in all fields');
            return;
        }
        router.push('/allposts');
    };

    async function uploadImage(e) {
        let file = e.target.files[0];
    
    
        const { data, error } = await supabase
          .storage
          .from('uploads')
          .upload(userId + "/" + uuidv4(), file)
    
        if (data) {
          getMedia();
    
        } else {
          console.log(error);
        }
      }

    return (
        <div>
            <Header />
            <div className='page'>
                <div className='text'>
                    <h1 className='title'>Create Your Post</h1>
                    
                    <form className="App" onSubmit={handleSubmit}>
                        <div className="form-section">
                            <label className="form-label">Title</label>
                            <input 
                                type="text" 
                                placeholder='Enter your post title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="form-input"
                            />
                        </div>

                        <div className="form-section">
                            <label className="form-label">Image URL</label>
                            <input 
                                type="url" 
                                placeholder='https://example.com/image.jpg'
                                value={image}
                                onChange={handleImageChange}
                                className="form-input"
                            />
                        </div>

                        {imagePreview && (
                            <div className="image-preview">
                                <label className="form-label">Preview</label>
                                <img 
                                    src={imagePreview} 
                                    alt="Preview" 
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'block';
                                    }}
                                />
                                <div className="image-error" style={{display: 'none'}}>
                                    Invalid image URL
                                </div>
                            </div>
                        )}

                        <div className="form-section">
                            <label className="form-label">Description</label>
                            <textarea
                                placeholder='Write your post description here...'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="form-textarea"
                                rows={8}
                            />
                        </div>

                        <div className='buttons'>
                            <button type="submit" className="submit-btn">
                                Create Post
                            </button>
                            <Link href='/allposts' className="back-btn">
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}