import React, { useState } from 'react';

export default function Dashboard() {
    const [emailData, updateEmailData] = useState({from: "", to: "", subject: "", text: ""})
    const [response, setResponse] = useState();
    async function sendMail(e) {
        e.preventDefault();
        console.log(emailData);
        const res = await fetch("http://localhost:8080/mailer", {method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(emailData)})
        const resp = await res.json();
        console.log(resp);
        setResponse(resp.PreviewURL);
    }

    return (
        <>
        <p>Hi! From here you can send your email!</p>
        <form onSubmit={e => sendMail(e)} style={{display: "flex", flexDirection: "column", width: "40vw", marginLeft: "30vw"}}>
            <input onChange={(e) => updateEmailData({...emailData, from: e.target.value})} type="email" required placeholder="From"></input>
            <input onChange={(e) => updateEmailData({...emailData, to: e.target.value})} type="email" required placeholder="To"></input>
            <input onChange={(e) => updateEmailData({...emailData, subject: e.target.value})} type="text" required placeholder="Subject"></input>
            <textarea onChange={(e) => updateEmailData({...emailData, text: e.target.value})} type="text" required placeholder="Text"></textarea>
            <button type="submit">Send!</button>
        </form>
        {response != null ? <><p>Message sent!</p><a target="_blank" href={response}>Here is your message preview</a></> : null}
        </>
    )
}