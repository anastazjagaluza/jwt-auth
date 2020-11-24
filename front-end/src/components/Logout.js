export default async function logout() {
    const refreshToken = localStorage.getItem("refreshToken");
    const res = await fetch("http://localhost:8080/logout", 
                            { method: "DELETE", 
                              headers: { "Content-Type": "application/json" }, 
                              body: JSON.stringify({ refreshToken: refreshToken }) });
    if (res.status === 200) {
        ["refreshToken", "accessToken"].map(item => {
            localStorage.removeItem(item);
        });
        return true;
    }
    else {
        console.log("something went wrong");
        return false;
    }
} 