import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

export default async function PrivatePath({ component: Component }) {

const [auth, setAuth] = useState(false);

  const token = localStorage.getItem("refreshToken");
  if (token != null) {
    let resp = await fetch("http://localhost:8080/token", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ refreshToken: token }) 
    });
    if (resp.status === 200) {
      resp = await resp.json(); 
      console.log("is")
      localStorage.setItem("accessToken", resp.accessToken)
      setAuth(true);
  }}

    return (
      <Route 
      render={(props) => auth == true 
        ? <Component {...props} />
        : <Redirect to={{pathname: "/auth", state: {from: props.location }}} />}
        />
    )
  }