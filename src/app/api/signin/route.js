import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request) {
    try {
        const { username, password } = await request.json();

        // Query user from database
        const { data: users, error } = await supabase
            .from("users")
            .select("*")
            .eq("username", username)
            .limit(1);

        if (error) {
            console.error("Supabase query error:", error);
            return NextResponse.json(
                { error: "Database error" },
                { status: 500 }
            );
        }

        if (users.length === 0) {
            return NextResponse.json(
                { error: "Invalid username or password 1" },
                { status: 401 }
            );
        }

        const user = users[0];
        const valid = password === user.password;

        if (!valid) {
            return NextResponse.json(
                { error: "Invalid username or password 2" },
                { status: 401 }
            );
        }

        // Set cookie with username
        const response = NextResponse.json({ success: true });
        response.cookies.set("user_username", user.username, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        return response;

    } catch (error) {
        console.error("Signin error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
} 