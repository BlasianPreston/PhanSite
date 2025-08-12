import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request) {
    try {
        const username = request.cookies.get("user_username")?.value;
        console.log("Username from cookie:", username);
        
        if (!username) {
            return NextResponse.json(
                { error: "Not logged in" },
                { status: 401 }
            );
        }

        const { title, description, image_url } = await request.json();
        console.log("Received data:", { title, description, image_url });

        if (!title || !description) {
            return NextResponse.json(
                { error: "Title and description are required" },
                { status: 400 }
            );
        }

        console.log("Attempting to insert into posts table...");
        const { error } = await supabase
            .from("posts")
            .insert([{ 
                user: username, 
                title, 
                description, 
                picture_url: image_url 
            }]);

        if (error) {
            console.error("Supabase insert error:", error);
            return NextResponse.json(
                { error: `Failed to create post: ${error.message}` },
                { status: 500 }
            );
        }

        console.log("Post created successfully!");
        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Create post error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
} 