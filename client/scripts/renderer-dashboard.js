const token = localStorage.getItem('token');

window.addEventListener('DOMContentLoaded', async () =>{
    const data = await window.protected.post(token);
    if (data.error) {
        console.log(data);
        window.location.href = "login.html" 
    }
    console.log(data);
    document.getElementById("greet").innerText = "Hello " + data.user.username
})

document.getElementById("logout-btn").addEventListener('click', ()=>{
    localStorage.removeItem('token')
    window.location.href = "login.html"
})