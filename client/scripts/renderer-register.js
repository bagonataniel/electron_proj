document.getElementById('regBtn').addEventListener('click', ()=>{
    const response = fetch("http://localhost:3000/register", {
        method: "POST",
        body: JSON.stringify({
          first_name : document.getElementById('first-name').value,
          last_name : document.getElementById('last-name').value,
          username : document.getElementById('username').value,
          password: document.getElementById('password').value
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
    console.log(response)
})