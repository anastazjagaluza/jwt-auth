import { React, useState } from 'react';

export default function Auth({ onAuth }) {
    const [loginData, setLoginData] = useState({email: "", password: ""});
    const [signUpData, setSignUpData] = useState({ username: "", email: "", password: ""});

    async function login(e) {
        e.preventDefault()
        console.log(loginData)
        const resp = await fetch("http://localhost:8080/login", { method: "POST", mode: "cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify(loginData) });
        switch (resp.status) {
            case 401:
                console.log("no such user")
                break;
            case 404:
                console.log("wrong password");
                break;
            case 200:
                console.log("yay");
                const res = await resp.json();
                localStorage.setItem("accessToken", res.accessToken);
                localStorage.setItem("refreshToken", res.refreshToken);
                onAuth();
        }
    }

    function assignLoginData(e) {
        const name = e.target?.name;
        switch(name) {
            case "email":
                setLoginData({ ...loginData, "email": e.target.value.trim() });
                break;
            case "password":
                setLoginData({ ...loginData, "password": e.target.value.trim()});
                break;
        }
    }
    
    function assignSignUpData(e) {
        const name = e.target?.name;
        switch(name) {
            case "email":
                setSignUpData({ ...signUpData, "email": e.target.value.trim() });
                break;
            case "password":
                setSignUpData({ ...signUpData, "password": e.target.value.trim()});
                break;
            case "username":
                setSignUpData({ ...signUpData, "username": e.target.value.trim() });
        }
    }

    const formDisplayStyle = { display: "flex", flexDirection: "column", flexGrow: "1", padding: "6vw", alignItems: "center"};
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            width: "100%"
        }}>
            <form style={formDisplayStyle} onSubmit={(e) => login(e)}>
            <h1>Log in or...</h1>
                <input onInput={(e) => assignLoginData(e)} type="email" name="email" required placeholder="Email"></input>
                <input autoComplete="off" onInput={(e) => assignLoginData(e)} type="password" name="password" required placeholder="Password"></input>
                <button type="submit">Log in</button>
            </form>
            
            <form style={formDisplayStyle}>
            <h1>...if you don't have an account...</h1>
                <input type="text" name="username" onInput={(e) => assignSignUpData(e)} required placeholder="User Name"></input>
                <input type="email" name="email" onInput={(e) => assignSignUpData(e)} required placeholder="Email"></input>
                <input type="password" name="password" onInput={(e) => assignSignUpData(e)} required placeholder="Password"></input>
                <button type="submit">Sign up</button>
            </form>

        </div>
    )
}