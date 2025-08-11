'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../backend/supabase.js'
import Link from 'next/link';
import Header from '../../components/PostsHeader.js'
import Footer from '../../components/Footer.js'
import '../../styles/create.css';

export default function Create() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Simple form validation
        if (!title.trim() || !description.trim() || !image) {
            alert('Please fill in all fields');
            return;
        }
        setLoading(true);

        try {
            const fileName = `${Date.now()}-${image.name}`;
            const { data: storageData, error: storageError } = await supabase.storage.from("images").upload(fileName, image);

            if (storageError) throw storageError;

            const { data: publicUrlData } = supabase.storage.from("images").getPublicUrl(fileName);

            const imageUrl = publicUrlData.publicUrl;

            const postData = {
                title, description, image_url: imageUrl
            }

            const res = await fetch("/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postData),
                credentials: "include"
            });
            if (res.ok) {
                alert("Post successfully uploaded!");
                router.push("/allposts");
            }
            else {
                const errMsg = await res.text();
                alert(`Error: ${errMsg}`);
            }

            alert("Upload successful");
            setTitle("");
            setImage("");
            setDescription("");
        } catch (err) {
            console.log(error)
            alert("Error uploading post");
        } finally {
            setLoading(false);
            router.push('/allposts');
        }
    };

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
                            <label className="form-label">Image</label>
                            <input
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>

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
                            <button type="submit" disabled={loading} className="submit-btn">
                                {loading ? "Uploading..." : "Submit"}
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