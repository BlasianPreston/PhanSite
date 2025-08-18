'use client'

import { React, useState, useEffect } from "react";
import Header from '../../components/PostsHeader.js'
import PostCard from '../../components/PostCard.js'
import Footer from '../../components/Footer.js'
import '../../styles/posts.css';


export default function Allposts() {
    const [postsList, setPostsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // Fetch TA data when component mounts
    useEffect(() => {
      fetchMyPosts();
    }, []);

    const fetchMyPosts = async () => {
        try {
            const res = await fetch("/api/myposts", {
                credentials: "include"  // Important: sends cookies
            });
            
            if (res.ok) {
                const data = await res.json();
                setPostsList(data.posts);
            } else {
                // Handle error
            }
        } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false); // Update loading state regardless of success/failure
          }
    };
  
    // Show loading/error states while data is being fetched
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='page'>
            <Header />
            <div className='text'>
                <h1 className='title'>My Posts</h1>
                <div className='posts-grid'>
                    {postsList.map((post, index) => (
                        <div key={`${post.user}-${post.created_at}-${index}`}>
                            <PostCard 
                                title={post.title} 
                                image={post.picture_url} 
                                description={post.description} 
                                user={post.user}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}