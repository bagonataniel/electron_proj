// document.getElementById('regBtn').addEventListener('click', ()=>{
//     const response = fetch("http://localhost:3000/auth/register", {
//         method: "POST",
//         body: JSON.stringify({
//           first_name : document.getElementById('first-name').value,
//           last_name : document.getElementById('last-name').value,
//           username : document.getElementById('username').value,
//           password: document.getElementById('password').value
//         }),
//         headers: {
//           "Content-type": "application/json; charset=UTF-8"
//         }
//       });
//     console.log(response)
// })

document.getElementById('regBtn').addEventListener('click', ()=>{
  const data = window.registerApi.post(document.getElementById('first-name').value, document.getElementById('last-name').value, document.getElementById('username').value, document.getElementById('password').value); // Use the exposed API
  console.log(data)
})