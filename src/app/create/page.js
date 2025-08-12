'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import Header from '../../components/PostsHeader.js'
import Footer from '../../components/Footer.js'
import '../../styles/create.css';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

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

            const res = await fetch("/api/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postData),
                credentials: "include"
            });
            
            const data = await res.json();
            
            if (res.ok) {
                alert("Post successfully uploaded!");
                setTitle("");
                setImage("");
                setDescription("");
                router.push("/allposts");
            } else {
                alert(`Error: ${data.error || "Failed to create post"}`);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            alert("Error uploading post");
            setLoading(false);
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