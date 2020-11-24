export default async function authorized() {
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
      localStorage.setItem("accessToken", resp.accessToken)
      return true;
      }
    else {
      return false;
    }
  }
  else {
    return false;
  }
};
