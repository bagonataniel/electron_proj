if (localStorage.token) {
  window.location.href = "dashboard.html"
}

document.getElementById('loginBtn').addEventListener('click', async ()=>{
    const data = await window.loginApi.post(document.getElementById('username').value, document.getElementById('password').value); // Use the exposed API
    if (data.token) {
        // Store the token securely
        localStorage.setItem('token', data.token);
        window.location.href = "dashboard.html"
    }
})