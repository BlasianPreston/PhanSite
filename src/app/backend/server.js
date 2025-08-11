import express from "express";
import cookieParser from "cookie-parser";
import { supabase } from '../backend/supabase.js'

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(401).send("Password confirmation failed");
    }

    if (password.length <= 8) {
        return res.status(401).send("Password too short");
    }

    const userData = { username, email, password };

    const { error } = await supabase.from("users").insert([userData]);

    if (error) {
        return res.status(401).send("Account creation failed");
    }
    res.send({ success: true });
})

app.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    const { data: users, error } = await supabase.from("users").select("*").eq("username", username).limit(1);

    if (error || users.length === 0) {
        return res.status(401).send("Invalid username or password");
    }

    const user = users[0];
    const valid = password === user.password;

    if (!valid) {
        return res.status(401).send("Invalid username or password");
    }

    res.cookie("user_username", user.username, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7
    });

    res.send({ success: true });
})


app.post("/create", async (req, res) => {
    const username = req.cookies["user_username"];
    if (!username) return res.status(401).send("Not logged in");

    const { title, description, imageUrl } = req.body;

    const { error } = await supabase.from("posts").insert([{ user: username, title, description, picture_url: imageUrl }]);

    if (error) return res.status(400).send(error.message);
    res.send({ success: true });
})

app.listen(8000, () => console.log("Server running on port 8000"));