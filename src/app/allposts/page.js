'use client'

import { React, useState, useEffect } from "react";
import Header from '../../components/PostsHeader.js'
import PostCard from '../../components/PostCard.js'
import Footer from '../../components/Footer.js'
import '../../styles/posts.css';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);


export default function Allposts() {
    const [postsList, setPostsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // Fetch TA data when component mounts
    useEffect(() => {
      fetchPostData();
    }, []);
  
    // Function to fetch and transform leadership data from Supabase database
    async function fetchPostData() {
      try {
        // Query Supabase for members with role "ta"
        const { data, error } = await supabase
          .from("posts")
          .select(
            `
              user, title, picture_url, description, created_at
            `
          ).order("created_at", {ascending: false})
  
        if (error) throw error;
  
        setPostsList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Update loading state regardless of success/failure
      }
    }
  
    // Show loading/error states while data is being fetched
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='page'>
            <Header />
            <div className='text'>
                <h1 className='title'>All Posts</h1>
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