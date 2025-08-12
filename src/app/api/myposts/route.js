import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request) {
    try {
        // Get username from cookie
        const username = request.cookies.get("user_username")?.value;
        
        if (!username) {
            return NextResponse.json(
                { error: "Not logged in" },
                { status: 401 }
            );
        }

        // Query posts for this specific user
        const { data: posts, error } = await supabase
            .from("posts")
            .select("*")
            .eq("user", username)
            .order("created_at", { ascending: false }); // Most recent first

        if (error) {
            console.error("Supabase query error:", error);
            return NextResponse.json(
                { error: "Failed to fetch posts" },
                { status: 500 }
            );
        }

        return NextResponse.json({ posts: posts || [] });

    } catch (error) {
        console.error("MyPosts error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
} 