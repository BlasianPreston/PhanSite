import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request) {
    try {
        const { username, email, password, confirmPassword } = await request.json();

        // Validation
        if (password !== confirmPassword) {
            return NextResponse.json(
                { error: "Password confirmation failed" },
                { status: 401 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: "Password too short" },
                { status: 401 }
            );
        }

        // Check if username already exists
        const { data: existingUsers, error: checkError } = await supabase
            .from("users")
            .select("username")
            .eq("username", username)
            .limit(1);

        if (checkError) {
            return NextResponse.json(
                { error: "Database error" },
                { status: 500 }
            );
        }

        if (existingUsers && existingUsers.length > 0) {
            return NextResponse.json(
                { error: "Username already exists" },
                { status: 409 }
            );
        }

        // Insert new user
        const { error: insertError } = await supabase
            .from("users")
            .insert([{ username, email, password }]);

        if (insertError) {
            console.error("Supabase insert error:", insertError);
            return NextResponse.json(
                { error: "Account creation failed" },
                { status: 500 }
            );
        }

        // Set cookie with username
        const response = NextResponse.json({ success: true });
        response.cookies.set("user_username", username, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        return response;

    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
} 