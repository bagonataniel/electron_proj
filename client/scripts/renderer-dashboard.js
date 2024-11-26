const token = localStorage.getItem('token');

fetch('http://localhost:3000/protected', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
    },
})
    .then((response) => response.json())
    .then((data) => {
        if (data.error) {
            console.log(data);
            window.location.href = "login.html" 
        }
        console.log(data);
        document.getElementById("greet").innerText = "Hello " + data.user.username
    });

document.getElementById("logout-btn").addEventListener('click', ()=>{
    localStorage.removeItem('token')
    window.location.href = "login.html"
})